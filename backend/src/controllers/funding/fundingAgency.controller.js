import FundingAgency from '../../models/funding/FundingAgency.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFundingAgency = asyncHandler(async (req, res) => {
  const item = await FundingAgency.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FundingAgency created successfully'));
});

export const getAllFundingAgencys = asyncHandler(async (req, res) => {
  const items = await FundingAgency.find();
  res.status(200).json(new ApiResponse(200, items, 'FundingAgencys fetched successfully'));
});

export const getFundingAgencyById = asyncHandler(async (req, res) => {
  const item = await FundingAgency.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundingAgency not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundingAgency fetched successfully'));
});

export const updateFundingAgency = asyncHandler(async (req, res) => {
  const item = await FundingAgency.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FundingAgency not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundingAgency updated successfully'));
});

export const deleteFundingAgency = asyncHandler(async (req, res) => {
  const item = await FundingAgency.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundingAgency not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FundingAgency deleted successfully'));
});
