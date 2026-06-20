import TrainerAvailability from '../../models/trainer/TrainerAvailability.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerAvailability = asyncHandler(async (req, res) => {
  const item = await TrainerAvailability.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerAvailability created successfully'));
});

export const getAllTrainerAvailabilitys = asyncHandler(async (req, res) => {
  const items = await TrainerAvailability.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerAvailabilitys fetched successfully'));
});

export const getTrainerAvailabilityById = asyncHandler(async (req, res) => {
  const item = await TrainerAvailability.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerAvailability not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerAvailability fetched successfully'));
});

export const updateTrainerAvailability = asyncHandler(async (req, res) => {
  const item = await TrainerAvailability.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerAvailability not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerAvailability updated successfully'));
});

export const deleteTrainerAvailability = asyncHandler(async (req, res) => {
  const item = await TrainerAvailability.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerAvailability not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerAvailability deleted successfully'));
});
