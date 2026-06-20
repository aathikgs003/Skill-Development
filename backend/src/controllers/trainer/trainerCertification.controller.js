import TrainerCertification from '../../models/trainer/TrainerCertification.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerCertification = asyncHandler(async (req, res) => {
  const item = await TrainerCertification.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerCertification created successfully'));
});

export const getAllTrainerCertifications = asyncHandler(async (req, res) => {
  const items = await TrainerCertification.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerCertifications fetched successfully'));
});

export const getTrainerCertificationById = asyncHandler(async (req, res) => {
  const item = await TrainerCertification.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerCertification not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerCertification fetched successfully'));
});

export const updateTrainerCertification = asyncHandler(async (req, res) => {
  const item = await TrainerCertification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerCertification not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerCertification updated successfully'));
});

export const deleteTrainerCertification = asyncHandler(async (req, res) => {
  const item = await TrainerCertification.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerCertification not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerCertification deleted successfully'));
});
