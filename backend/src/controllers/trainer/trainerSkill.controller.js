import TrainerSkill from '../../models/trainer/TrainerSkill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerSkill = asyncHandler(async (req, res) => {
  const item = await TrainerSkill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerSkill created successfully'));
});

export const getAllTrainerSkills = asyncHandler(async (req, res) => {
  const items = await TrainerSkill.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerSkills fetched successfully'));
});

export const getTrainerSkillById = asyncHandler(async (req, res) => {
  const item = await TrainerSkill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerSkill fetched successfully'));
});

export const updateTrainerSkill = asyncHandler(async (req, res) => {
  const item = await TrainerSkill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerSkill updated successfully'));
});

export const deleteTrainerSkill = asyncHandler(async (req, res) => {
  const item = await TrainerSkill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerSkill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerSkill deleted successfully'));
});
