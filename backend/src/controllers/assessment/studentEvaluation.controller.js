import StudentEvaluation from '../../models/assessment/StudentEvaluation.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentEvaluation = asyncHandler(async (req, res) => {
  const item = await StudentEvaluation.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentEvaluation created successfully'));
});

export const getAllStudentEvaluations = asyncHandler(async (req, res) => {
  const items = await StudentEvaluation.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentEvaluations fetched successfully'));
});

export const getStudentEvaluationById = asyncHandler(async (req, res) => {
  const item = await StudentEvaluation.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentEvaluation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentEvaluation fetched successfully'));
});

export const updateStudentEvaluation = asyncHandler(async (req, res) => {
  const item = await StudentEvaluation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentEvaluation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentEvaluation updated successfully'));
});

export const deleteStudentEvaluation = asyncHandler(async (req, res) => {
  const item = await StudentEvaluation.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentEvaluation not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentEvaluation deleted successfully'));
});
