import TrainerTimeSlot from '../../models/scheduling/TrainerTimeSlot.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerTimeSlot = asyncHandler(async (req, res) => {
  const item = await TrainerTimeSlot.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerTimeSlot created successfully'));
});

export const getAllTrainerTimeSlots = asyncHandler(async (req, res) => {
  const items = await TrainerTimeSlot.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerTimeSlots fetched successfully'));
});

export const getTrainerTimeSlotById = asyncHandler(async (req, res) => {
  const item = await TrainerTimeSlot.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerTimeSlot not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerTimeSlot fetched successfully'));
});

export const updateTrainerTimeSlot = asyncHandler(async (req, res) => {
  const item = await TrainerTimeSlot.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerTimeSlot not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerTimeSlot updated successfully'));
});

export const deleteTrainerTimeSlot = asyncHandler(async (req, res) => {
  const item = await TrainerTimeSlot.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerTimeSlot not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerTimeSlot deleted successfully'));
});
