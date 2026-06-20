import City from '../../models/master/City.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCity = asyncHandler(async (req, res) => {
  const item = await City.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'City created successfully'));
});

export const getAllCitys = asyncHandler(async (req, res) => {
  const items = await City.find();
  res.status(200).json(new ApiResponse(200, items, 'Citys fetched successfully'));
});

export const getCityById = asyncHandler(async (req, res) => {
  const item = await City.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'City not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'City fetched successfully'));
});

export const updateCity = asyncHandler(async (req, res) => {
  const item = await City.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'City not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'City updated successfully'));
});

export const deleteCity = asyncHandler(async (req, res) => {
  const item = await City.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'City not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'City deleted successfully'));
});
