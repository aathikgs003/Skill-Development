import TrainerAttendance from '../../models/attendance/TrainerAttendance.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerAttendance = asyncHandler(async (req, res) => {
  const item = await TrainerAttendance.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerAttendance created successfully'));
});

export const getAllTrainerAttendances = asyncHandler(async (req, res) => {
  const items = await TrainerAttendance.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerAttendances fetched successfully'));
});

export const getTrainerAttendanceById = asyncHandler(async (req, res) => {
  const item = await TrainerAttendance.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerAttendance not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerAttendance fetched successfully'));
});

export const updateTrainerAttendance = asyncHandler(async (req, res) => {
  const item = await TrainerAttendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerAttendance not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerAttendance updated successfully'));
});

export const deleteTrainerAttendance = asyncHandler(async (req, res) => {
  const item = await TrainerAttendance.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerAttendance not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerAttendance deleted successfully'));
});
