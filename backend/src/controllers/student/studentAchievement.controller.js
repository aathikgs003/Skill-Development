import StudentAchievement from '../../models/student/StudentAchievement.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentAchievement = asyncHandler(async (req, res) => {
  const item = await StudentAchievement.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentAchievement created successfully'));
});

export const getAllStudentAchievements = asyncHandler(async (req, res) => {
  const items = await StudentAchievement.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentAchievements fetched successfully'));
});

export const getStudentAchievementById = asyncHandler(async (req, res) => {
  const item = await StudentAchievement.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentAchievement not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentAchievement fetched successfully'));
});

export const updateStudentAchievement = asyncHandler(async (req, res) => {
  const item = await StudentAchievement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentAchievement not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentAchievement updated successfully'));
});

export const deleteStudentAchievement = asyncHandler(async (req, res) => {
  const item = await StudentAchievement.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentAchievement not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentAchievement deleted successfully'));
});
