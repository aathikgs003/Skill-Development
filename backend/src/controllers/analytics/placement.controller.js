import Placement from '../../models/analytics/Placement.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createPlacement = asyncHandler(async (req, res) => {
  const item = await Placement.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Placement created successfully'));
});

export const getAllPlacements = asyncHandler(async (req, res) => {
  const items = await Placement.find();
  res.status(200).json(new ApiResponse(200, items, 'Placements fetched successfully'));
});

export const getPlacementById = asyncHandler(async (req, res) => {
  const item = await Placement.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Placement not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Placement fetched successfully'));
});

export const updatePlacement = asyncHandler(async (req, res) => {
  const item = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Placement not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Placement updated successfully'));
});

export const deletePlacement = asyncHandler(async (req, res) => {
  const item = await Placement.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Placement not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Placement deleted successfully'));
});
