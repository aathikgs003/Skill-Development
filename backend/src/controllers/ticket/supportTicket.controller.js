import SupportTicket from '../../models/ticket/SupportTicket.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createSupportTicket = asyncHandler(async (req, res) => {
  const item = await SupportTicket.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'SupportTicket created successfully'));
});

export const getAllSupportTickets = asyncHandler(async (req, res) => {
  const items = await SupportTicket.find();
  res.status(200).json(new ApiResponse(200, items, 'SupportTickets fetched successfully'));
});

export const getSupportTicketById = asyncHandler(async (req, res) => {
  const item = await SupportTicket.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'SupportTicket not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'SupportTicket fetched successfully'));
});

export const updateSupportTicket = asyncHandler(async (req, res) => {
  const item = await SupportTicket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'SupportTicket not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'SupportTicket updated successfully'));
});

export const deleteSupportTicket = asyncHandler(async (req, res) => {
  const item = await SupportTicket.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'SupportTicket not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'SupportTicket deleted successfully'));
});
