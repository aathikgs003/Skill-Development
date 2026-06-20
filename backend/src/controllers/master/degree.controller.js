import Degree from '../../models/master/Degree.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createDegree = asyncHandler(async (req, res) => {
  const item = await Degree.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Degree created successfully'));
});

export const getAllDegrees = asyncHandler(async (req, res) => {
  const items = await Degree.find();
  res.status(200).json(new ApiResponse(200, items, 'Degrees fetched successfully'));
});

export const getDegreeById = asyncHandler(async (req, res) => {
  const item = await Degree.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Degree not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Degree fetched successfully'));
});

export const updateDegree = asyncHandler(async (req, res) => {
  const item = await Degree.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Degree not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Degree updated successfully'));
});

export const deleteDegree = asyncHandler(async (req, res) => {
  const item = await Degree.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Degree not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Degree deleted successfully'));
});
