import Feedback from '../../models/feedback/Feedback.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFeedback = asyncHandler(async (req, res) => {
  const item = await Feedback.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Feedback created successfully'));
});

export const getAllFeedbacks = asyncHandler(async (req, res) => {
  const items = await Feedback.find();
  res.status(200).json(new ApiResponse(200, items, 'Feedbacks fetched successfully'));
});

export const getFeedbackById = asyncHandler(async (req, res) => {
  const item = await Feedback.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Feedback not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Feedback fetched successfully'));
});

export const updateFeedback = asyncHandler(async (req, res) => {
  const item = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Feedback not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Feedback updated successfully'));
});

export const deleteFeedback = asyncHandler(async (req, res) => {
  const item = await Feedback.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Feedback not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Feedback deleted successfully'));
});
