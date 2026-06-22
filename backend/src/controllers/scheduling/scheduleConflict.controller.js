import ScheduleConflict from '../../models/scheduling/ScheduleConflict.model.js';
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

export const createScheduleConflict = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const data = {
    ...req.body,
    ...tenant,
  };
  const item = await ScheduleConflict.create(data);
  res.status(201).json(new ApiResponse(201, item, 'Schedule conflict logged successfully'));
});

export const getAllScheduleConflicts = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const filter = { ...tenant };

  if (req.query.entityType) filter.entityType = req.query.entityType;
  if (req.query.conflictType) filter.conflictType = req.query.conflictType;
  if (req.query.resolutionStatus) filter.resolutionStatus = req.query.resolutionStatus;

  const items = await ScheduleConflict.find(filter)
    .populate('resolvedBy', 'firstName lastName')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, items, 'Schedule conflicts fetched successfully'));
});

export const getScheduleConflictById = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const item = await ScheduleConflict.findOne({ _id: req.params.id, ...tenant }).populate('resolvedBy', 'firstName lastName');
  if (!item) {
    throw new ApiError(404, 'Schedule conflict not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Schedule conflict fetched successfully'));
});

// Resolve conflict log
export const resolveScheduleConflict = asyncHandler(async (req, res) => {
  const { resolutionStatus, resolutionAction } = req.body;
  const tenant = await getTenantQuery(req.user);

  if (!['Resolved', 'Ignored'].includes(resolutionStatus)) {
    throw new ApiError(400, 'Invalid resolution status. Must be "Resolved" or "Ignored".');
  }

  const conflict = await ScheduleConflict.findOne({ _id: req.params.id, ...tenant });
  if (!conflict) {
    throw new ApiError(404, 'Schedule conflict not found or unauthorized');
  }

  conflict.resolutionStatus = resolutionStatus;
  conflict.resolutionAction = resolutionAction;
  conflict.resolvedBy = req.user._id;
  conflict.resolvedAt = new Date();

  await conflict.save();

  res.status(200).json(new ApiResponse(200, conflict, 'Schedule conflict resolved successfully'));
});

export const deleteScheduleConflict = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const item = await ScheduleConflict.findOneAndDelete({ _id: req.params.id, ...tenant });
  if (!item) {
    throw new ApiError(404, 'Schedule conflict not found or unauthorized');
  }
  res.status(200).json(new ApiResponse(200, null, 'Schedule conflict deleted successfully'));
});
