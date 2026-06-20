import EducationType from '../../models/master/EducationType.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createEducationType = asyncHandler(async (req, res) => {
  const item = await EducationType.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'EducationType created successfully'));
});

export const getAllEducationTypes = asyncHandler(async (req, res) => {
  const items = await EducationType.find();
  res.status(200).json(new ApiResponse(200, items, 'EducationTypes fetched successfully'));
});

export const getEducationTypeById = asyncHandler(async (req, res) => {
  const item = await EducationType.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'EducationType not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'EducationType fetched successfully'));
});

export const updateEducationType = asyncHandler(async (req, res) => {
  const item = await EducationType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'EducationType not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'EducationType updated successfully'));
});

export const deleteEducationType = asyncHandler(async (req, res) => {
  const item = await EducationType.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'EducationType not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'EducationType deleted successfully'));
});
