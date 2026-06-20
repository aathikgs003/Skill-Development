import FundingProgram from '../../models/funding/FundingProgram.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFundingProgram = asyncHandler(async (req, res) => {
  const item = await FundingProgram.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FundingProgram created successfully'));
});

export const getAllFundingPrograms = asyncHandler(async (req, res) => {
  const items = await FundingProgram.find();
  res.status(200).json(new ApiResponse(200, items, 'FundingPrograms fetched successfully'));
});

export const getFundingProgramById = asyncHandler(async (req, res) => {
  const item = await FundingProgram.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundingProgram not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundingProgram fetched successfully'));
});

export const updateFundingProgram = asyncHandler(async (req, res) => {
  const item = await FundingProgram.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FundingProgram not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundingProgram updated successfully'));
});

export const deleteFundingProgram = asyncHandler(async (req, res) => {
  const item = await FundingProgram.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundingProgram not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FundingProgram deleted successfully'));
});
