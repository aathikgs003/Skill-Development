import StudentRecommendation from '../../models/partner/StudentRecommendation.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentRecommendation = asyncHandler(async (req, res) => {
  const item = await StudentRecommendation.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentRecommendation created successfully'));
});

export const getAllStudentRecommendations = asyncHandler(async (req, res) => {
  const items = await StudentRecommendation.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentRecommendations fetched successfully'));
});

export const getStudentRecommendationById = asyncHandler(async (req, res) => {
  const item = await StudentRecommendation.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentRecommendation fetched successfully'));
});

export const updateStudentRecommendation = asyncHandler(async (req, res) => {
  const item = await StudentRecommendation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentRecommendation updated successfully'));
});

export const deleteStudentRecommendation = asyncHandler(async (req, res) => {
  const item = await StudentRecommendation.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentRecommendation deleted successfully'));
});
