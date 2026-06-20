import Assessment from '../../models/assessment/Assessment.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAssessment = asyncHandler(async (req, res) => {
  const item = await Assessment.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Assessment created successfully'));
});

export const getAllAssessments = asyncHandler(async (req, res) => {
  const items = await Assessment.find();
  res.status(200).json(new ApiResponse(200, items, 'Assessments fetched successfully'));
});

export const getAssessmentById = asyncHandler(async (req, res) => {
  const item = await Assessment.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Assessment not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Assessment fetched successfully'));
});

export const updateAssessment = asyncHandler(async (req, res) => {
  const item = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Assessment not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Assessment updated successfully'));
});

export const deleteAssessment = asyncHandler(async (req, res) => {
  const item = await Assessment.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Assessment not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Assessment deleted successfully'));
});
