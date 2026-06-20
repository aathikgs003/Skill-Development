import LoginHistory from '../../models/auth/LoginHistory.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createLoginHistory = asyncHandler(async (req, res) => {
  const item = await LoginHistory.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'LoginHistory created successfully'));
});

export const getAllLoginHistorys = asyncHandler(async (req, res) => {
  const items = await LoginHistory.find();
  res.status(200).json(new ApiResponse(200, items, 'LoginHistorys fetched successfully'));
});

export const getLoginHistoryById = asyncHandler(async (req, res) => {
  const item = await LoginHistory.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'LoginHistory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'LoginHistory fetched successfully'));
});

export const updateLoginHistory = asyncHandler(async (req, res) => {
  const item = await LoginHistory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'LoginHistory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'LoginHistory updated successfully'));
});

export const deleteLoginHistory = asyncHandler(async (req, res) => {
  const item = await LoginHistory.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'LoginHistory not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'LoginHistory deleted successfully'));
});
