import Skill from '../../models/master/Skill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createSkill = asyncHandler(async (req, res) => {
  const item = await Skill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Skill created successfully'));
});

export const getAllSkills = asyncHandler(async (req, res) => {
  const items = await Skill.find();
  res.status(200).json(new ApiResponse(200, items, 'Skills fetched successfully'));
});

export const getSkillById = asyncHandler(async (req, res) => {
  const item = await Skill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Skill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Skill fetched successfully'));
});

export const updateSkill = asyncHandler(async (req, res) => {
  const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Skill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Skill updated successfully'));
});

export const deleteSkill = asyncHandler(async (req, res) => {
  const item = await Skill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Skill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Skill deleted successfully'));
});
