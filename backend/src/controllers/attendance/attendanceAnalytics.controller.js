import AttendanceAnalytics from '../../models/attendance/AttendanceAnalytics.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAttendanceAnalytics = asyncHandler(async (req, res) => {
  const item = await AttendanceAnalytics.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'AttendanceAnalytics created successfully'));
});

export const getAllAttendanceAnalyticss = asyncHandler(async (req, res) => {
  const items = await AttendanceAnalytics.find();
  res.status(200).json(new ApiResponse(200, items, 'AttendanceAnalyticss fetched successfully'));
});

export const getAttendanceAnalyticsById = asyncHandler(async (req, res) => {
  const item = await AttendanceAnalytics.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AttendanceAnalytics not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AttendanceAnalytics fetched successfully'));
});

export const updateAttendanceAnalytics = asyncHandler(async (req, res) => {
  const item = await AttendanceAnalytics.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'AttendanceAnalytics not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AttendanceAnalytics updated successfully'));
});

export const deleteAttendanceAnalytics = asyncHandler(async (req, res) => {
  const item = await AttendanceAnalytics.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AttendanceAnalytics not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'AttendanceAnalytics deleted successfully'));
});
