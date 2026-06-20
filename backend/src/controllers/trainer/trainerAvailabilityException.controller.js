import TrainerAvailabilityException from '../../models/trainer/TrainerAvailabilityException.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerAvailabilityException = asyncHandler(async (req, res) => {
  const item = await TrainerAvailabilityException.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerAvailabilityException created successfully'));
});

export const getAllTrainerAvailabilityExceptions = asyncHandler(async (req, res) => {
  const items = await TrainerAvailabilityException.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerAvailabilityExceptions fetched successfully'));
});

export const getTrainerAvailabilityExceptionById = asyncHandler(async (req, res) => {
  const item = await TrainerAvailabilityException.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerAvailabilityException not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerAvailabilityException fetched successfully'));
});

export const updateTrainerAvailabilityException = asyncHandler(async (req, res) => {
  const item = await TrainerAvailabilityException.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerAvailabilityException not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerAvailabilityException updated successfully'));
});

export const deleteTrainerAvailabilityException = asyncHandler(async (req, res) => {
  const item = await TrainerAvailabilityException.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerAvailabilityException not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerAvailabilityException deleted successfully'));
});
