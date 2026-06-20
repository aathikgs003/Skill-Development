import BatchCoordinator from '../../models/batch/BatchCoordinator.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createBatchCoordinator = asyncHandler(async (req, res) => {
  const item = await BatchCoordinator.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'BatchCoordinator created successfully'));
});

export const getAllBatchCoordinators = asyncHandler(async (req, res) => {
  const items = await BatchCoordinator.find();
  res.status(200).json(new ApiResponse(200, items, 'BatchCoordinators fetched successfully'));
});

export const getBatchCoordinatorById = asyncHandler(async (req, res) => {
  const item = await BatchCoordinator.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'BatchCoordinator not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'BatchCoordinator fetched successfully'));
});

export const updateBatchCoordinator = asyncHandler(async (req, res) => {
  const item = await BatchCoordinator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'BatchCoordinator not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'BatchCoordinator updated successfully'));
});

export const deleteBatchCoordinator = asyncHandler(async (req, res) => {
  const item = await BatchCoordinator.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'BatchCoordinator not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'BatchCoordinator deleted successfully'));
});
