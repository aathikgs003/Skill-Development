import District from '../../models/master/District.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createDistrict = asyncHandler(async (req, res) => {
  const item = await District.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'District created successfully'));
});

export const getAllDistricts = asyncHandler(async (req, res) => {
  const items = await District.find();
  res.status(200).json(new ApiResponse(200, items, 'Districts fetched successfully'));
});

export const getDistrictById = asyncHandler(async (req, res) => {
  const item = await District.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'District not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'District fetched successfully'));
});

export const updateDistrict = asyncHandler(async (req, res) => {
  const item = await District.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'District not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'District updated successfully'));
});

export const deleteDistrict = asyncHandler(async (req, res) => {
  const item = await District.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'District not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'District deleted successfully'));
});
