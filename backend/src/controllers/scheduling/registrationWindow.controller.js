import RegistrationWindow from '../../models/scheduling/RegistrationWindow.model.js';
import Enrollment from '../../models/enrollment/Enrollment.model.js';
import Student from '../../models/student/Student.js';
import Organization from '../../models/organization/Organization.model.js';
import ImplementationPartner from '../../models/partner/ImplementationPartner.model.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';

// Resolve tenant scopes for multi-tenancy
const getTenantQuery = async (user) => {
  if (!user) return {};
  const query = {};
  if (user.role === 'Organization') {
    const org = await Organization.findOne({ user: user._id });
    if (org) query.organizationId = org._id;
  } else if (user.role === 'Partner') {
    const partner = await ImplementationPartner.findOne({ user: user._id });
    if (partner) query.partnerId = partner._id;
  }
  return query;
};

// CREATE registration window
export const createRegistrationWindow = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const data = { 
    ...req.body, 
    ...tenant,
    createdBy: req.user._id 
  };
  const window = await RegistrationWindow.create(data);
  res.status(201).json(new ApiResponse(201, window, 'Registration window created successfully'));
});

// GET all registration windows (scoped to tenant)
export const getAllRegistrationWindows = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const filter = { ...tenant };

  if (req.query.status) filter.status = req.query.status;
  if (req.query.courseId) filter.courseId = req.query.courseId;
  if (req.query.batchId) filter.batchId = req.query.batchId;

  const windows = await RegistrationWindow.find(filter)
    .populate('courseId', 'title category level durationHours')
    .populate('batchId', 'name startDate endDate')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, windows, 'Registration windows fetched successfully'));
});

// GET registration window by ID
export const getRegistrationWindowById = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const window = await RegistrationWindow.findOne({ _id: req.params.id, ...tenant })
    .populate('courseId')
    .populate('batchId');

  if (!window) {
    throw new ApiError(404, 'Registration window not found');
  }
  res.status(200).json(new ApiResponse(200, window, 'Registration window fetched successfully'));
});

// UPDATE registration window
export const updateRegistrationWindow = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  
  let window = await RegistrationWindow.findOne({ _id: req.params.id, ...tenant });
  if (!window) {
    throw new ApiError(404, 'Registration window not found or unauthorized');
  }

  const updatedData = { ...req.body, updatedBy: req.user._id };
  const updatedWindow = await RegistrationWindow.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, updatedWindow, 'Registration window updated successfully'));
});

// DELETE registration window
export const deleteRegistrationWindow = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const window = await RegistrationWindow.findOneAndDelete({ _id: req.params.id, ...tenant });
  if (!window) {
    throw new ApiError(404, 'Registration window not found or unauthorized');
  }
  res.status(200).json(new ApiResponse(200, null, 'Registration window deleted successfully'));
});

// GET all open windows (available for student registration)
export const getOpenWindows = asyncHandler(async (req, res) => {
  const now = new Date();
  const windows = await RegistrationWindow.find({
    status: 'Open',
    registrationStartAt: { $lte: now },
    registrationEndAt: { $gte: now },
  })
    .populate('courseId', 'title description category level')
    .populate('batchId', 'name startDate endDate')
    .sort({ registrationEndAt: 1 });

  res.status(200).json(new ApiResponse(200, windows, 'Open windows fetched successfully'));
});

// REGISTER student in window
export const registerForWindow = asyncHandler(async (req, res) => {
  const { windowId } = req.params;

  // Resolve student model associated with the user
  const student = await Student.findOne({ user: req.user._id });
  if (!student) {
    throw new ApiError(404, 'Student profile not found for this user');
  }

  const window = await RegistrationWindow.findById(windowId);
  if (!window) throw new ApiError(404, 'Registration window not found');

  // Check window status
  const now = new Date();
  if (window.status !== 'Open') {
    throw new ApiError(400, `Registration is currently ${window.status}`);
  }
  if (now < window.registrationStartAt) {
    throw new ApiError(400, 'Registration has not started yet');
  }
  if (now > window.registrationEndAt) {
    throw new ApiError(400, 'Registration has already closed');
  }

  // Check duplicate enrollment
  const existing = await Enrollment.findOne({
    student: student._id,
    course: window.courseId,
    batch: window.batchId,
  });
  if (existing) throw new ApiError(400, 'You are already registered/enrolled for this course/batch');

  // Determine status: Applied or Waitlisted
  let enrollmentStatus = 'Applied';
  if (window.currentApplicants >= window.maxApplicants) {
    if (!window.waitlistEnabled || window.currentWaitlist >= window.waitlistCapacity) {
      throw new ApiError(400, 'Registration limits reached, and waitlist is full or disabled');
    }
    enrollmentStatus = 'Waitlisted';
    window.currentWaitlist += 1;
  } else {
    enrollmentStatus = window.autoApproval ? 'Enrolled' : 'Applied';
    window.currentApplicants += 1;
  }
  await window.save();

  // Create enrollment
  const enrollment = await Enrollment.create({
    student: student._id,
    course: window.courseId,
    batch: window.batchId,
    organization: window.organizationId,
    partner: window.partnerId,
    enrollmentStatus,
    appliedAt: now,
  });

  res.status(201).json(
    new ApiResponse(201, { enrollment, status: enrollmentStatus }, 'Registration completed successfully')
  );
});

// CLOSE window manually
export const closeWindow = asyncHandler(async (req, res) => {
  const { windowId } = req.params;
  const tenant = await getTenantQuery(req.user);

  const window = await RegistrationWindow.findOneAndUpdate(
    { _id: windowId, ...tenant },
    { status: 'Closed', updatedBy: req.user._id },
    { new: true }
  );

  if (!window) {
    throw new ApiError(404, 'Registration window not found or unauthorized');
  }

  res.status(200).json(new ApiResponse(200, window, 'Registration window closed successfully'));
});
