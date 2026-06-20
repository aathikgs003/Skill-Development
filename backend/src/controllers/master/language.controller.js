import Language from '../../models/master/Language.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createLanguage = asyncHandler(async (req, res) => {
  const item = await Language.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Language created successfully'));
});

export const getAllLanguages = asyncHandler(async (req, res) => {
  const items = await Language.find();
  res.status(200).json(new ApiResponse(200, items, 'Languages fetched successfully'));
});

export const getLanguageById = asyncHandler(async (req, res) => {
  const item = await Language.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Language not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Language fetched successfully'));
});

export const updateLanguage = asyncHandler(async (req, res) => {
  const item = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Language not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Language updated successfully'));
});

export const deleteLanguage = asyncHandler(async (req, res) => {
  const item = await Language.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Language not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Language deleted successfully'));
});
