import StudentCertification from '../../models/student/StudentCertification.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentCertification = asyncHandler(async (req, res) => {
  const item = await StudentCertification.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentCertification created successfully'));
});

export const getAllStudentCertifications = asyncHandler(async (req, res) => {
  const items = await StudentCertification.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentCertifications fetched successfully'));
});

export const getStudentCertificationById = asyncHandler(async (req, res) => {
  const item = await StudentCertification.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentCertification not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentCertification fetched successfully'));
});

export const updateStudentCertification = asyncHandler(async (req, res) => {
  const item = await StudentCertification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentCertification not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentCertification updated successfully'));
});

export const deleteStudentCertification = asyncHandler(async (req, res) => {
  const item = await StudentCertification.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentCertification not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentCertification deleted successfully'));
});
