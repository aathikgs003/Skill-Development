import ModuleSchedule from '../../models/scheduling/ModuleSchedule.model.js';
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

export const createModuleSchedule = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const data = {
    ...req.body,
    ...tenant,
    createdBy: req.user._id,
  };
  const item = await ModuleSchedule.create(data);
  res.status(201).json(new ApiResponse(201, item, 'Module schedule created successfully'));
});

export const getAllModuleSchedules = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const filter = { ...tenant };

  if (req.query.batchId) filter.batchId = req.query.batchId;
  if (req.query.courseId) filter.courseId = req.query.courseId;
  if (req.query.assignedTrainerId) filter.assignedTrainerId = req.query.assignedTrainerId;
  if (req.query.scheduleStatus) filter.scheduleStatus = req.query.scheduleStatus;

  const items = await ModuleSchedule.find(filter)
    .populate('courseId', 'title')
    .populate('batchId', 'name')
    .populate({
      path: 'assignedTrainerId',
      populate: { path: 'user', select: 'firstName lastName' },
    })
    .sort({ moduleOrder: 1 });

  res.status(200).json(new ApiResponse(200, items, 'Module schedules fetched successfully'));
});

export const getModuleScheduleById = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const item = await ModuleSchedule.findOne({ _id: req.params.id, ...tenant })
    .populate('courseId')
    .populate('batchId')
    .populate({
      path: 'assignedTrainerId',
      populate: { path: 'user', select: 'firstName lastName email' },
    });

  if (!item) {
    throw new ApiError(404, 'Module schedule not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Module schedule fetched successfully'));
});

export const updateModuleSchedule = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  
  const item = await ModuleSchedule.findOne({ _id: req.params.id, ...tenant });
  if (!item) {
    throw new ApiError(404, 'Module schedule not found or unauthorized');
  }

  const updatedItem = await ModuleSchedule.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: req.user._id },
    { new: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, updatedItem, 'Module schedule updated successfully'));
});

export const deleteModuleSchedule = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const item = await ModuleSchedule.findOneAndDelete({ _id: req.params.id, ...tenant });
  if (!item) {
    throw new ApiError(404, 'Module schedule not found or unauthorized');
  }
  res.status(200).json(new ApiResponse(200, null, 'Module schedule deleted successfully'));
});
