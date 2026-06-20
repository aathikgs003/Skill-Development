import AssessmentQuestion from '../../models/assessment/AssessmentQuestion.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAssessmentQuestion = asyncHandler(async (req, res) => {
  const item = await AssessmentQuestion.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'AssessmentQuestion created successfully'));
});

export const getAllAssessmentQuestions = asyncHandler(async (req, res) => {
  const items = await AssessmentQuestion.find();
  res.status(200).json(new ApiResponse(200, items, 'AssessmentQuestions fetched successfully'));
});

export const getAssessmentQuestionById = asyncHandler(async (req, res) => {
  const item = await AssessmentQuestion.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AssessmentQuestion not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AssessmentQuestion fetched successfully'));
});

export const updateAssessmentQuestion = asyncHandler(async (req, res) => {
  const item = await AssessmentQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'AssessmentQuestion not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AssessmentQuestion updated successfully'));
});

export const deleteAssessmentQuestion = asyncHandler(async (req, res) => {
  const item = await AssessmentQuestion.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AssessmentQuestion not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'AssessmentQuestion deleted successfully'));
});
