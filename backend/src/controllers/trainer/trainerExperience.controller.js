import TrainerExperience from '../../models/trainer/TrainerExperience.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerExperience = asyncHandler(async (req, res) => {
  const item = await TrainerExperience.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerExperience created successfully'));
});

export const getAllTrainerExperiences = asyncHandler(async (req, res) => {
  const items = await TrainerExperience.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerExperiences fetched successfully'));
});

export const getTrainerExperienceById = asyncHandler(async (req, res) => {
  const item = await TrainerExperience.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerExperience not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerExperience fetched successfully'));
});

export const updateTrainerExperience = asyncHandler(async (req, res) => {
  const item = await TrainerExperience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerExperience not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerExperience updated successfully'));
});

export const deleteTrainerExperience = asyncHandler(async (req, res) => {
  const item = await TrainerExperience.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerExperience not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerExperience deleted successfully'));
});
