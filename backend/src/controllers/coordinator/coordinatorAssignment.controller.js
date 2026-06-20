import CoordinatorAssignment from '../../models/coordinator/CoordinatorAssignment.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCoordinatorAssignment = asyncHandler(async (req, res) => {
  const item = await CoordinatorAssignment.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CoordinatorAssignment created successfully'));
});

export const getAllCoordinatorAssignments = asyncHandler(async (req, res) => {
  const items = await CoordinatorAssignment.find();
  res.status(200).json(new ApiResponse(200, items, 'CoordinatorAssignments fetched successfully'));
});

export const getCoordinatorAssignmentById = asyncHandler(async (req, res) => {
  const item = await CoordinatorAssignment.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorAssignment not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorAssignment fetched successfully'));
});

export const updateCoordinatorAssignment = asyncHandler(async (req, res) => {
  const item = await CoordinatorAssignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CoordinatorAssignment not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorAssignment updated successfully'));
});

export const deleteCoordinatorAssignment = asyncHandler(async (req, res) => {
  const item = await CoordinatorAssignment.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorAssignment not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CoordinatorAssignment deleted successfully'));
});
