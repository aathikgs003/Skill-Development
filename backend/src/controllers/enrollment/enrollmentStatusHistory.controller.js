import EnrollmentStatusHistory from '../../models/enrollment/EnrollmentStatusHistory.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createEnrollmentStatusHistory = asyncHandler(async (req, res) => {
  const item = await EnrollmentStatusHistory.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'EnrollmentStatusHistory created successfully'));
});

export const getAllEnrollmentStatusHistorys = asyncHandler(async (req, res) => {
  const items = await EnrollmentStatusHistory.find();
  res.status(200).json(new ApiResponse(200, items, 'EnrollmentStatusHistorys fetched successfully'));
});

export const getEnrollmentStatusHistoryById = asyncHandler(async (req, res) => {
  const item = await EnrollmentStatusHistory.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'EnrollmentStatusHistory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'EnrollmentStatusHistory fetched successfully'));
});

export const updateEnrollmentStatusHistory = asyncHandler(async (req, res) => {
  const item = await EnrollmentStatusHistory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'EnrollmentStatusHistory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'EnrollmentStatusHistory updated successfully'));
});

export const deleteEnrollmentStatusHistory = asyncHandler(async (req, res) => {
  const item = await EnrollmentStatusHistory.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'EnrollmentStatusHistory not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'EnrollmentStatusHistory deleted successfully'));
});
