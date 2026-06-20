import Country from '../../models/master/Country.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCountry = asyncHandler(async (req, res) => {
  const item = await Country.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Country created successfully'));
});

export const getAllCountrys = asyncHandler(async (req, res) => {
  const items = await Country.find();
  res.status(200).json(new ApiResponse(200, items, 'Countrys fetched successfully'));
});

export const getCountryById = asyncHandler(async (req, res) => {
  const item = await Country.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Country not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Country fetched successfully'));
});

export const updateCountry = asyncHandler(async (req, res) => {
  const item = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Country not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Country updated successfully'));
});

export const deleteCountry = asyncHandler(async (req, res) => {
  const item = await Country.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Country not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Country deleted successfully'));
});
