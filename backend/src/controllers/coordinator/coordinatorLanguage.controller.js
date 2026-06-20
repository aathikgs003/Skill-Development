import CoordinatorLanguage from '../../models/coordinator/CoordinatorLanguage.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCoordinatorLanguage = asyncHandler(async (req, res) => {
  const item = await CoordinatorLanguage.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CoordinatorLanguage created successfully'));
});

export const getAllCoordinatorLanguages = asyncHandler(async (req, res) => {
  const items = await CoordinatorLanguage.find();
  res.status(200).json(new ApiResponse(200, items, 'CoordinatorLanguages fetched successfully'));
});

export const getCoordinatorLanguageById = asyncHandler(async (req, res) => {
  const item = await CoordinatorLanguage.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorLanguage fetched successfully'));
});

export const updateCoordinatorLanguage = asyncHandler(async (req, res) => {
  const item = await CoordinatorLanguage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CoordinatorLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorLanguage updated successfully'));
});

export const deleteCoordinatorLanguage = asyncHandler(async (req, res) => {
  const item = await CoordinatorLanguage.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CoordinatorLanguage deleted successfully'));
});
