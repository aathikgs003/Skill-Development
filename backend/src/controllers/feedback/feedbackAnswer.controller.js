import FeedbackAnswer from '../../models/feedback/FeedbackAnswer.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFeedbackAnswer = asyncHandler(async (req, res) => {
  const item = await FeedbackAnswer.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FeedbackAnswer created successfully'));
});

export const getAllFeedbackAnswers = asyncHandler(async (req, res) => {
  const items = await FeedbackAnswer.find();
  res.status(200).json(new ApiResponse(200, items, 'FeedbackAnswers fetched successfully'));
});

export const getFeedbackAnswerById = asyncHandler(async (req, res) => {
  const item = await FeedbackAnswer.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FeedbackAnswer not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FeedbackAnswer fetched successfully'));
});

export const updateFeedbackAnswer = asyncHandler(async (req, res) => {
  const item = await FeedbackAnswer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FeedbackAnswer not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FeedbackAnswer updated successfully'));
});

export const deleteFeedbackAnswer = asyncHandler(async (req, res) => {
  const item = await FeedbackAnswer.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FeedbackAnswer not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FeedbackAnswer deleted successfully'));
});
