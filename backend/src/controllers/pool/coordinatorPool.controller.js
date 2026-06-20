import CoordinatorPool from '../../models/pool/CoordinatorPool.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCoordinatorPool = asyncHandler(async (req, res) => {
  const item = await CoordinatorPool.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CoordinatorPool created successfully'));
});

export const getAllCoordinatorPools = asyncHandler(async (req, res) => {
  const items = await CoordinatorPool.find();
  res.status(200).json(new ApiResponse(200, items, 'CoordinatorPools fetched successfully'));
});

export const getCoordinatorPoolById = asyncHandler(async (req, res) => {
  const item = await CoordinatorPool.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorPool not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorPool fetched successfully'));
});

export const updateCoordinatorPool = asyncHandler(async (req, res) => {
  const item = await CoordinatorPool.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CoordinatorPool not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorPool updated successfully'));
});

export const deleteCoordinatorPool = asyncHandler(async (req, res) => {
  const item = await CoordinatorPool.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorPool not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CoordinatorPool deleted successfully'));
});
