import CoordinatorPoolLanguage from '../../models/pool/CoordinatorPoolLanguage.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCoordinatorPoolLanguage = asyncHandler(async (req, res) => {
  const item = await CoordinatorPoolLanguage.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CoordinatorPoolLanguage created successfully'));
});

export const getAllCoordinatorPoolLanguages = asyncHandler(async (req, res) => {
  const items = await CoordinatorPoolLanguage.find();
  res.status(200).json(new ApiResponse(200, items, 'CoordinatorPoolLanguages fetched successfully'));
});

export const getCoordinatorPoolLanguageById = asyncHandler(async (req, res) => {
  const item = await CoordinatorPoolLanguage.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorPoolLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorPoolLanguage fetched successfully'));
});

export const updateCoordinatorPoolLanguage = asyncHandler(async (req, res) => {
  const item = await CoordinatorPoolLanguage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CoordinatorPoolLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoordinatorPoolLanguage updated successfully'));
});

export const deleteCoordinatorPoolLanguage = asyncHandler(async (req, res) => {
  const item = await CoordinatorPoolLanguage.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoordinatorPoolLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CoordinatorPoolLanguage deleted successfully'));
});
