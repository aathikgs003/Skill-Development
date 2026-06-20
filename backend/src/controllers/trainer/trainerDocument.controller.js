import TrainerDocument from '../../models/trainer/TrainerDocument.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerDocument = asyncHandler(async (req, res) => {
  const item = await TrainerDocument.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerDocument created successfully'));
});

export const getAllTrainerDocuments = asyncHandler(async (req, res) => {
  const items = await TrainerDocument.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerDocuments fetched successfully'));
});

export const getTrainerDocumentById = asyncHandler(async (req, res) => {
  const item = await TrainerDocument.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerDocument not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerDocument fetched successfully'));
});

export const updateTrainerDocument = asyncHandler(async (req, res) => {
  const item = await TrainerDocument.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerDocument not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerDocument updated successfully'));
});

export const deleteTrainerDocument = asyncHandler(async (req, res) => {
  const item = await TrainerDocument.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerDocument not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerDocument deleted successfully'));
});
