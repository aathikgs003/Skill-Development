import TrainerRanking from '../../models/analytics/TrainerRanking.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerRanking = asyncHandler(async (req, res) => {
  const item = await TrainerRanking.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerRanking created successfully'));
});

export const getAllTrainerRankings = asyncHandler(async (req, res) => {
  const items = await TrainerRanking.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerRankings fetched successfully'));
});

export const getTrainerRankingById = asyncHandler(async (req, res) => {
  const item = await TrainerRanking.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerRanking not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerRanking fetched successfully'));
});

export const updateTrainerRanking = asyncHandler(async (req, res) => {
  const item = await TrainerRanking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerRanking not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerRanking updated successfully'));
});

export const deleteTrainerRanking = asyncHandler(async (req, res) => {
  const item = await TrainerRanking.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerRanking not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerRanking deleted successfully'));
});
