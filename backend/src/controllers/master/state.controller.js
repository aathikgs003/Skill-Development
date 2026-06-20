import State from '../../models/master/State.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createState = asyncHandler(async (req, res) => {
  const item = await State.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'State created successfully'));
});

export const getAllStates = asyncHandler(async (req, res) => {
  const items = await State.find();
  res.status(200).json(new ApiResponse(200, items, 'States fetched successfully'));
});

export const getStateById = asyncHandler(async (req, res) => {
  const item = await State.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'State not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'State fetched successfully'));
});

export const updateState = asyncHandler(async (req, res) => {
  const item = await State.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'State not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'State updated successfully'));
});

export const deleteState = asyncHandler(async (req, res) => {
  const item = await State.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'State not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'State deleted successfully'));
});
