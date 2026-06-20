import AssessmentAnswerDetail from '../../models/assessment/AssessmentAnswerDetail.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAssessmentAnswerDetail = asyncHandler(async (req, res) => {
  const item = await AssessmentAnswerDetail.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'AssessmentAnswerDetail created successfully'));
});

export const getAllAssessmentAnswerDetails = asyncHandler(async (req, res) => {
  const items = await AssessmentAnswerDetail.find();
  res.status(200).json(new ApiResponse(200, items, 'AssessmentAnswerDetails fetched successfully'));
});

export const getAssessmentAnswerDetailById = asyncHandler(async (req, res) => {
  const item = await AssessmentAnswerDetail.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AssessmentAnswerDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AssessmentAnswerDetail fetched successfully'));
});

export const updateAssessmentAnswerDetail = asyncHandler(async (req, res) => {
  const item = await AssessmentAnswerDetail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'AssessmentAnswerDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AssessmentAnswerDetail updated successfully'));
});

export const deleteAssessmentAnswerDetail = asyncHandler(async (req, res) => {
  const item = await AssessmentAnswerDetail.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AssessmentAnswerDetail not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'AssessmentAnswerDetail deleted successfully'));
});
