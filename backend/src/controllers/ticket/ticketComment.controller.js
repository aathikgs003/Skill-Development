import TicketComment from '../../models/ticket/TicketComment.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTicketComment = asyncHandler(async (req, res) => {
  const item = await TicketComment.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TicketComment created successfully'));
});

export const getAllTicketComments = asyncHandler(async (req, res) => {
  const items = await TicketComment.find();
  res.status(200).json(new ApiResponse(200, items, 'TicketComments fetched successfully'));
});

export const getTicketCommentById = asyncHandler(async (req, res) => {
  const item = await TicketComment.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TicketComment not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TicketComment fetched successfully'));
});

export const updateTicketComment = asyncHandler(async (req, res) => {
  const item = await TicketComment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TicketComment not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TicketComment updated successfully'));
});

export const deleteTicketComment = asyncHandler(async (req, res) => {
  const item = await TicketComment.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TicketComment not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TicketComment deleted successfully'));
});
