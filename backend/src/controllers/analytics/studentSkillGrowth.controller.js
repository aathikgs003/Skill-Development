import StudentSkillGrowth from '../../models/analytics/StudentSkillGrowth.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentSkillGrowth = asyncHandler(async (req, res) => {
  const item = await StudentSkillGrowth.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentSkillGrowth created successfully'));
});

export const getAllStudentSkillGrowths = asyncHandler(async (req, res) => {
  const items = await StudentSkillGrowth.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentSkillGrowths fetched successfully'));
});

export const getStudentSkillGrowthById = asyncHandler(async (req, res) => {
  const item = await StudentSkillGrowth.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentSkillGrowth not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentSkillGrowth fetched successfully'));
});

export const updateStudentSkillGrowth = asyncHandler(async (req, res) => {
  const item = await StudentSkillGrowth.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentSkillGrowth not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentSkillGrowth updated successfully'));
});

export const deleteStudentSkillGrowth = asyncHandler(async (req, res) => {
  const item = await StudentSkillGrowth.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentSkillGrowth not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentSkillGrowth deleted successfully'));
});
