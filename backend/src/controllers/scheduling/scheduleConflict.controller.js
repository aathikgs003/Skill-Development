import ScheduleConflict from '../../models/scheduling/ScheduleConflict.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createScheduleConflict = asyncHandler(async (req, res) => {
  const item = await ScheduleConflict.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'ScheduleConflict created successfully'));
});

export const getAllScheduleConflicts = asyncHandler(async (req, res) => {
  const items = await ScheduleConflict.find();
  res.status(200).json(new ApiResponse(200, items, 'ScheduleConflicts fetched successfully'));
});

export const getScheduleConflictById = asyncHandler(async (req, res) => {
  const item = await ScheduleConflict.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'ScheduleConflict not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'ScheduleConflict fetched successfully'));
});

export const updateScheduleConflict = asyncHandler(async (req, res) => {
  const item = await ScheduleConflict.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'ScheduleConflict not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'ScheduleConflict updated successfully'));
});

export const deleteScheduleConflict = asyncHandler(async (req, res) => {
  const item = await ScheduleConflict.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'ScheduleConflict not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'ScheduleConflict deleted successfully'));
});
