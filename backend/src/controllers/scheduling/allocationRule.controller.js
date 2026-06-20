import AllocationRule from '../../models/scheduling/AllocationRule.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAllocationRule = asyncHandler(async (req, res) => {
  const item = await AllocationRule.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'AllocationRule created successfully'));
});

export const getAllAllocationRules = asyncHandler(async (req, res) => {
  const items = await AllocationRule.find();
  res.status(200).json(new ApiResponse(200, items, 'AllocationRules fetched successfully'));
});

export const getAllocationRuleById = asyncHandler(async (req, res) => {
  const item = await AllocationRule.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AllocationRule not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AllocationRule fetched successfully'));
});

export const updateAllocationRule = asyncHandler(async (req, res) => {
  const item = await AllocationRule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'AllocationRule not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AllocationRule updated successfully'));
});

export const deleteAllocationRule = asyncHandler(async (req, res) => {
  const item = await AllocationRule.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AllocationRule not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'AllocationRule deleted successfully'));
});
