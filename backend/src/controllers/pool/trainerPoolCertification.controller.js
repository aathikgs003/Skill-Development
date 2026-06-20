import TrainerPoolCertification from '../../models/pool/TrainerPoolCertification.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTrainerPoolCertification = asyncHandler(async (req, res) => {
  const item = await TrainerPoolCertification.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TrainerPoolCertification created successfully'));
});

export const getAllTrainerPoolCertifications = asyncHandler(async (req, res) => {
  const items = await TrainerPoolCertification.find();
  res.status(200).json(new ApiResponse(200, items, 'TrainerPoolCertifications fetched successfully'));
});

export const getTrainerPoolCertificationById = asyncHandler(async (req, res) => {
  const item = await TrainerPoolCertification.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerPoolCertification not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerPoolCertification fetched successfully'));
});

export const updateTrainerPoolCertification = asyncHandler(async (req, res) => {
  const item = await TrainerPoolCertification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TrainerPoolCertification not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TrainerPoolCertification updated successfully'));
});

export const deleteTrainerPoolCertification = asyncHandler(async (req, res) => {
  const item = await TrainerPoolCertification.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TrainerPoolCertification not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TrainerPoolCertification deleted successfully'));
});
