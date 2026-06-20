import TrainerPool from '../../models/pool/TrainerPool.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerPool = asyncHandler(async (req, res) => {
  const item = await TrainerPool.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerPool created successfully'));
});

export const getAllTrainerPools = asyncHandler(async (req, res) => {
  const items = await TrainerPool.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerPools fetched successfully'));
});

export const getTrainerPoolById = asyncHandler(async (req, res) => {
  const item = await TrainerPool.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerPool not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerPool fetched successfully'));
});

export const updateTrainerPool = asyncHandler(async (req, res) => {
  const item = await TrainerPool.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerPool not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerPool updated successfully'));
});

export const deleteTrainerPool = asyncHandler(async (req, res) => {
  const item = await TrainerPool.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerPool not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerPool deleted successfully'));
});
