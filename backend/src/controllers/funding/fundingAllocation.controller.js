import FundingAllocation from '../../models/funding/FundingAllocation.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFundingAllocation = asyncHandler(async (req, res) => {
  const item = await FundingAllocation.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FundingAllocation created successfully'));
});

export const getAllFundingAllocations = asyncHandler(async (req, res) => {
  const items = await FundingAllocation.find();
  res.status(200).json(new ApiResponse(200, items, 'FundingAllocations fetched successfully'));
});

export const getFundingAllocationById = asyncHandler(async (req, res) => {
  const item = await FundingAllocation.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundingAllocation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundingAllocation fetched successfully'));
});

export const updateFundingAllocation = asyncHandler(async (req, res) => {
  const item = await FundingAllocation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FundingAllocation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundingAllocation updated successfully'));
});

export const deleteFundingAllocation = asyncHandler(async (req, res) => {
  const item = await FundingAllocation.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundingAllocation not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FundingAllocation deleted successfully'));
});
