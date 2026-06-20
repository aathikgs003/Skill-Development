import TrainerPoolSkill from '../../models/pool/TrainerPoolSkill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerPoolSkill = asyncHandler(async (req, res) => {
  const item = await TrainerPoolSkill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerPoolSkill created successfully'));
});

export const getAllTrainerPoolSkills = asyncHandler(async (req, res) => {
  const items = await TrainerPoolSkill.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerPoolSkills fetched successfully'));
});

export const getTrainerPoolSkillById = asyncHandler(async (req, res) => {
  const item = await TrainerPoolSkill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerPoolSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerPoolSkill fetched successfully'));
});

export const updateTrainerPoolSkill = asyncHandler(async (req, res) => {
  const item = await TrainerPoolSkill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerPoolSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerPoolSkill updated successfully'));
});

export const deleteTrainerPoolSkill = asyncHandler(async (req, res) => {
  const item = await TrainerPoolSkill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerPoolSkill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerPoolSkill deleted successfully'));
});
