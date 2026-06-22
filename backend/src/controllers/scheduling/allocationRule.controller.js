import AllocationRule from '../../models/scheduling/AllocationRule.model.js';
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

export const createAllocationRule = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const data = {
    ...req.body,
    ...tenant,
  };
  const item = await AllocationRule.create(data);
  res.status(201).json(new ApiResponse(201, item, 'Allocation rule created successfully'));
});

export const getAllAllocationRules = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const filter = { ...tenant };

  if (req.query.entityType) filter.entityType = req.query.entityType;
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';

  const items = await AllocationRule.find(filter).sort({ priority: 1 });
  res.status(200).json(new ApiResponse(200, items, 'Allocation rules fetched successfully'));
});

export const getAllocationRuleById = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const item = await AllocationRule.findOne({ _id: req.params.id, ...tenant });
  if (!item) {
    throw new ApiError(404, 'Allocation rule not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Allocation rule fetched successfully'));
});

export const updateAllocationRule = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  
  const item = await AllocationRule.findOne({ _id: req.params.id, ...tenant });
  if (!item) {
    throw new ApiError(404, 'Allocation rule not found or unauthorized');
  }

  const updatedItem = await AllocationRule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, updatedItem, 'Allocation rule updated successfully'));
});

export const deleteAllocationRule = asyncHandler(async (req, res) => {
  const tenant = await getTenantQuery(req.user);
  const item = await AllocationRule.findOneAndDelete({ _id: req.params.id, ...tenant });
  if (!item) {
    throw new ApiError(404, 'Allocation rule not found or unauthorized');
  }
  res.status(200).json(new ApiResponse(200, null, 'Allocation rule deleted successfully'));
});
