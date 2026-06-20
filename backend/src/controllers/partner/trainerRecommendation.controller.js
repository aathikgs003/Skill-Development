import TrainerRecommendation from '../../models/partner/TrainerRecommendation.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerRecommendation = asyncHandler(async (req, res) => {
  const item = await TrainerRecommendation.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerRecommendation created successfully'));
});

export const getAllTrainerRecommendations = asyncHandler(async (req, res) => {
  const items = await TrainerRecommendation.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerRecommendations fetched successfully'));
});

export const getTrainerRecommendationById = asyncHandler(async (req, res) => {
  const item = await TrainerRecommendation.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerRecommendation fetched successfully'));
});

export const updateTrainerRecommendation = asyncHandler(async (req, res) => {
  const item = await TrainerRecommendation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerRecommendation updated successfully'));
});

export const deleteTrainerRecommendation = asyncHandler(async (req, res) => {
  const item = await TrainerRecommendation.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerRecommendation deleted successfully'));
});
