import TicketStatusHistory from '../../models/ticket/TicketStatusHistory.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createTicketStatusHistory = asyncHandler(async (req, res) => {
  const item = await TicketStatusHistory.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'TicketStatusHistory created successfully'));
});

export const getAllTicketStatusHistorys = asyncHandler(async (req, res) => {
  const items = await TicketStatusHistory.find();
  res.status(200).json(new ApiResponse(200, items, 'TicketStatusHistorys fetched successfully'));
});

export const getTicketStatusHistoryById = asyncHandler(async (req, res) => {
  const item = await TicketStatusHistory.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TicketStatusHistory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TicketStatusHistory fetched successfully'));
});

export const updateTicketStatusHistory = asyncHandler(async (req, res) => {
  const item = await TicketStatusHistory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'TicketStatusHistory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'TicketStatusHistory updated successfully'));
});

export const deleteTicketStatusHistory = asyncHandler(async (req, res) => {
  const item = await TicketStatusHistory.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'TicketStatusHistory not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'TicketStatusHistory deleted successfully'));
});
