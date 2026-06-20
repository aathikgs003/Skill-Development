import Coordinator from '../../models/coordinator/Coordinator.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCoordinator = asyncHandler(async (req, res) => {
  const item = await Coordinator.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Coordinator created successfully'));
});

export const getAllCoordinators = asyncHandler(async (req, res) => {
  const items = await Coordinator.find();
  res.status(200).json(new ApiResponse(200, items, 'Coordinators fetched successfully'));
});

export const getCoordinatorById = asyncHandler(async (req, res) => {
  const item = await Coordinator.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Coordinator not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Coordinator fetched successfully'));
});

export const updateCoordinator = asyncHandler(async (req, res) => {
  const item = await Coordinator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Coordinator not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Coordinator updated successfully'));
});

export const deleteCoordinator = asyncHandler(async (req, res) => {
  const item = await Coordinator.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Coordinator not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Coordinator deleted successfully'));
});
