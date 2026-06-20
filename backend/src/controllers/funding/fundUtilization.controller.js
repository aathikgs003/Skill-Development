import FundUtilization from '../../models/funding/FundUtilization.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFundUtilization = asyncHandler(async (req, res) => {
  const item = await FundUtilization.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FundUtilization created successfully'));
});

export const getAllFundUtilizations = asyncHandler(async (req, res) => {
  const items = await FundUtilization.find();
  res.status(200).json(new ApiResponse(200, items, 'FundUtilizations fetched successfully'));
});

export const getFundUtilizationById = asyncHandler(async (req, res) => {
  const item = await FundUtilization.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundUtilization not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundUtilization fetched successfully'));
});

export const updateFundUtilization = asyncHandler(async (req, res) => {
  const item = await FundUtilization.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FundUtilization not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundUtilization updated successfully'));
});

export const deleteFundUtilization = asyncHandler(async (req, res) => {
  const item = await FundUtilization.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundUtilization not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FundUtilization deleted successfully'));
});
