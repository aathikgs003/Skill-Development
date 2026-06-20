import FeedbackQuestion from '../../models/feedback/FeedbackQuestion.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFeedbackQuestion = asyncHandler(async (req, res) => {
  const item = await FeedbackQuestion.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FeedbackQuestion created successfully'));
});

export const getAllFeedbackQuestions = asyncHandler(async (req, res) => {
  const items = await FeedbackQuestion.find();
  res.status(200).json(new ApiResponse(200, items, 'FeedbackQuestions fetched successfully'));
});

export const getFeedbackQuestionById = asyncHandler(async (req, res) => {
  const item = await FeedbackQuestion.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FeedbackQuestion not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FeedbackQuestion fetched successfully'));
});

export const updateFeedbackQuestion = asyncHandler(async (req, res) => {
  const item = await FeedbackQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FeedbackQuestion not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FeedbackQuestion updated successfully'));
});

export const deleteFeedbackQuestion = asyncHandler(async (req, res) => {
  const item = await FeedbackQuestion.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FeedbackQuestion not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FeedbackQuestion deleted successfully'));
});
