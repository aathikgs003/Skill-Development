import CoordinatorSkill from '../../models/coordinator/CoordinatorSkill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCoordinatorSkill = asyncHandler(async (req, res) => {
  const item = await CoordinatorSkill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CoordinatorSkill created successfully'));
});

export const getAllCoordinatorSkills = asyncHandler(async (req, res) => {
  const items = await CoordinatorSkill.find();
  res.status(200).json(new ApiResponse(200, items, 'CoordinatorSkills fetched successfully'));
});

export const getCoordinatorSkillById = asyncHandler(async (req, res) => {
  const item = await CoordinatorSkill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorSkill fetched successfully'));
});

export const updateCoordinatorSkill = asyncHandler(async (req, res) => {
  const item = await CoordinatorSkill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CoordinatorSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorSkill updated successfully'));
});

export const deleteCoordinatorSkill = asyncHandler(async (req, res) => {
  const item = await CoordinatorSkill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorSkill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CoordinatorSkill deleted successfully'));
});
