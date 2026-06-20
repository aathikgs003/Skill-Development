import University from '../../models/master/University.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createUniversity = asyncHandler(async (req, res) => {
  const item = await University.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'University created successfully'));
});

export const getAllUniversitys = asyncHandler(async (req, res) => {
  const items = await University.find();
  res.status(200).json(new ApiResponse(200, items, 'Universitys fetched successfully'));
});

export const getUniversityById = asyncHandler(async (req, res) => {
  const item = await University.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'University not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'University fetched successfully'));
});

export const updateUniversity = asyncHandler(async (req, res) => {
  const item = await University.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'University not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'University updated successfully'));
});

export const deleteUniversity = asyncHandler(async (req, res) => {
  const item = await University.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'University not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'University deleted successfully'));
});
