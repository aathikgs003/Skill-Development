import SalaryRange from '../../models/master/SalaryRange.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createSalaryRange = asyncHandler(async (req, res) => {
  const item = await SalaryRange.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'SalaryRange created successfully'));
});

export const getAllSalaryRanges = asyncHandler(async (req, res) => {
  const items = await SalaryRange.find();
  res.status(200).json(new ApiResponse(200, items, 'SalaryRanges fetched successfully'));
});

export const getSalaryRangeById = asyncHandler(async (req, res) => {
  const item = await SalaryRange.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'SalaryRange not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'SalaryRange fetched successfully'));
});

export const updateSalaryRange = asyncHandler(async (req, res) => {
  const item = await SalaryRange.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'SalaryRange not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'SalaryRange updated successfully'));
});

export const deleteSalaryRange = asyncHandler(async (req, res) => {
  const item = await SalaryRange.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'SalaryRange not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'SalaryRange deleted successfully'));
});
