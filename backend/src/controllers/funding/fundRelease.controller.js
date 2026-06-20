import FundRelease from '../../models/funding/FundRelease.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFundRelease = asyncHandler(async (req, res) => {
  const item = await FundRelease.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FundRelease created successfully'));
});

export const getAllFundReleases = asyncHandler(async (req, res) => {
  const items = await FundRelease.find();
  res.status(200).json(new ApiResponse(200, items, 'FundReleases fetched successfully'));
});

export const getFundReleaseById = asyncHandler(async (req, res) => {
  const item = await FundRelease.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundRelease not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundRelease fetched successfully'));
});

export const updateFundRelease = asyncHandler(async (req, res) => {
  const item = await FundRelease.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FundRelease not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundRelease updated successfully'));
});

export const deleteFundRelease = asyncHandler(async (req, res) => {
  const item = await FundRelease.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundRelease not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FundRelease deleted successfully'));
});
