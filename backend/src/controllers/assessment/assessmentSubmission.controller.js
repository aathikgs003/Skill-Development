import AssessmentSubmission from '../../models/assessment/AssessmentSubmission.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAssessmentSubmission = asyncHandler(async (req, res) => {
  const item = await AssessmentSubmission.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'AssessmentSubmission created successfully'));
});

export const getAllAssessmentSubmissions = asyncHandler(async (req, res) => {
  const items = await AssessmentSubmission.find();
  res.status(200).json(new ApiResponse(200, items, 'AssessmentSubmissions fetched successfully'));
});

export const getAssessmentSubmissionById = asyncHandler(async (req, res) => {
  const item = await AssessmentSubmission.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AssessmentSubmission not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AssessmentSubmission fetched successfully'));
});

export const updateAssessmentSubmission = asyncHandler(async (req, res) => {
  const item = await AssessmentSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'AssessmentSubmission not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AssessmentSubmission updated successfully'));
});

export const deleteAssessmentSubmission = asyncHandler(async (req, res) => {
  const item = await AssessmentSubmission.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AssessmentSubmission not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'AssessmentSubmission deleted successfully'));
});
