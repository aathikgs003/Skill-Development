import StudentAttendance from '../../models/attendance/StudentAttendance.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentAttendance = asyncHandler(async (req, res) => {
  const item = await StudentAttendance.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentAttendance created successfully'));
});

export const getAllStudentAttendances = asyncHandler(async (req, res) => {
  const items = await StudentAttendance.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentAttendances fetched successfully'));
});

export const getStudentAttendanceById = asyncHandler(async (req, res) => {
  const item = await StudentAttendance.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentAttendance not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentAttendance fetched successfully'));
});

export const updateStudentAttendance = asyncHandler(async (req, res) => {
  const item = await StudentAttendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentAttendance not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentAttendance updated successfully'));
});

export const deleteStudentAttendance = asyncHandler(async (req, res) => {
  const item = await StudentAttendance.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentAttendance not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentAttendance deleted successfully'));
});
