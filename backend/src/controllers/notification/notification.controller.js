import Notification from '../../models/notification/Notification.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createNotification = asyncHandler(async (req, res) => {
  const item = await Notification.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Notification created successfully'));
});

export const getAllNotifications = asyncHandler(async (req, res) => {
  const items = await Notification.find();
  res.status(200).json(new ApiResponse(200, items, 'Notifications fetched successfully'));
});

export const getNotificationById = asyncHandler(async (req, res) => {
  const item = await Notification.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Notification not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Notification fetched successfully'));
});

export const updateNotification = asyncHandler(async (req, res) => {
  const item = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Notification not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Notification updated successfully'));
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const item = await Notification.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Notification not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Notification deleted successfully'));
});
