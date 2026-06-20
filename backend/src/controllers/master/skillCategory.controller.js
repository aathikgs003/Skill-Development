import SkillCategory from '../../models/master/SkillCategory.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createSkillCategory = asyncHandler(async (req, res) => {
  const item = await SkillCategory.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'SkillCategory created successfully'));
});

export const getAllSkillCategorys = asyncHandler(async (req, res) => {
  const items = await SkillCategory.find();
  res.status(200).json(new ApiResponse(200, items, 'SkillCategorys fetched successfully'));
});

export const getSkillCategoryById = asyncHandler(async (req, res) => {
  const item = await SkillCategory.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'SkillCategory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'SkillCategory fetched successfully'));
});

export const updateSkillCategory = asyncHandler(async (req, res) => {
  const item = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'SkillCategory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'SkillCategory updated successfully'));
});

export const deleteSkillCategory = asyncHandler(async (req, res) => {
  const item = await SkillCategory.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'SkillCategory not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'SkillCategory deleted successfully'));
});
