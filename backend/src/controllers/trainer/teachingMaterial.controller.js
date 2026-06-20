import TeachingMaterial from '../../models/trainer/TeachingMaterial.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTeachingMaterial = asyncHandler(async (req, res) => {
  const item = await TeachingMaterial.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TeachingMaterial created successfully'));
});

export const getAllTeachingMaterials = asyncHandler(async (req, res) => {
  const items = await TeachingMaterial.find();
  res.status(200).json(new ApiResponse(200, items, 'TeachingMaterials fetched successfully'));
});

export const getTeachingMaterialById = asyncHandler(async (req, res) => {
  const item = await TeachingMaterial.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TeachingMaterial not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TeachingMaterial fetched successfully'));
});

export const updateTeachingMaterial = asyncHandler(async (req, res) => {
  const item = await TeachingMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TeachingMaterial not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TeachingMaterial updated successfully'));
});

export const deleteTeachingMaterial = asyncHandler(async (req, res) => {
  const item = await TeachingMaterial.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TeachingMaterial not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TeachingMaterial deleted successfully'));
});
