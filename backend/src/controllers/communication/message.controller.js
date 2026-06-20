import Message from '../../models/communication/Message.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createMessage = asyncHandler(async (req, res) => {
  const item = await Message.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Message created successfully'));
});

export const getAllMessages = asyncHandler(async (req, res) => {
  const items = await Message.find();
  res.status(200).json(new ApiResponse(200, items, 'Messages fetched successfully'));
});

export const getMessageById = asyncHandler(async (req, res) => {
  const item = await Message.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Message not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Message fetched successfully'));
});

export const updateMessage = asyncHandler(async (req, res) => {
  const item = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Message not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Message updated successfully'));
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const item = await Message.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Message not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Message deleted successfully'));
});
