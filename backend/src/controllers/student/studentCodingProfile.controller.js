import StudentCodingProfile from '../../models/student/StudentCodingProfile.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentCodingProfile = asyncHandler(async (req, res) => {
  const item = await StudentCodingProfile.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentCodingProfile created successfully'));
});

export const getAllStudentCodingProfiles = asyncHandler(async (req, res) => {
  const items = await StudentCodingProfile.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentCodingProfiles fetched successfully'));
});

export const getStudentCodingProfileById = asyncHandler(async (req, res) => {
  const item = await StudentCodingProfile.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentCodingProfile not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentCodingProfile fetched successfully'));
});

export const updateStudentCodingProfile = asyncHandler(async (req, res) => {
  const item = await StudentCodingProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentCodingProfile not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentCodingProfile updated successfully'));
});

export const deleteStudentCodingProfile = asyncHandler(async (req, res) => {
  const item = await StudentCodingProfile.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentCodingProfile not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentCodingProfile deleted successfully'));
});
