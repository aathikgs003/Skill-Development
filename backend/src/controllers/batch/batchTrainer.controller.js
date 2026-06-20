import BatchTrainer from '../../models/batch/BatchTrainer.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createBatchTrainer = asyncHandler(async (req, res) => {
  const item = await BatchTrainer.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'BatchTrainer created successfully'));
});

export const getAllBatchTrainers = asyncHandler(async (req, res) => {
  const items = await BatchTrainer.find();
  res.status(200).json(new ApiResponse(200, items, 'BatchTrainers fetched successfully'));
});

export const getBatchTrainerById = asyncHandler(async (req, res) => {
  const item = await BatchTrainer.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'BatchTrainer not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'BatchTrainer fetched successfully'));
});

export const updateBatchTrainer = asyncHandler(async (req, res) => {
  const item = await BatchTrainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'BatchTrainer not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'BatchTrainer updated successfully'));
});

export const deleteBatchTrainer = asyncHandler(async (req, res) => {
  const item = await BatchTrainer.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'BatchTrainer not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'BatchTrainer deleted successfully'));
});
