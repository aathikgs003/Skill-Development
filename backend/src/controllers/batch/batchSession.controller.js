import BatchSession from '../../models/batch/BatchSession.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createBatchSession = asyncHandler(async (req, res) => {
  const item = await BatchSession.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'BatchSession created successfully'));
});

export const getAllBatchSessions = asyncHandler(async (req, res) => {
  const items = await BatchSession.find();
  res.status(200).json(new ApiResponse(200, items, 'BatchSessions fetched successfully'));
});

export const getBatchSessionById = asyncHandler(async (req, res) => {
  const item = await BatchSession.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'BatchSession not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'BatchSession fetched successfully'));
});

export const updateBatchSession = asyncHandler(async (req, res) => {
  const item = await BatchSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'BatchSession not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'BatchSession updated successfully'));
});

export const deleteBatchSession = asyncHandler(async (req, res) => {
  const item = await BatchSession.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'BatchSession not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'BatchSession deleted successfully'));
});
