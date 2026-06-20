import NotificationPreference from '../../models/notification/NotificationPreference.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createNotificationPreference = asyncHandler(async (req, res) => {
  const item = await NotificationPreference.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'NotificationPreference created successfully'));
});

export const getAllNotificationPreferences = asyncHandler(async (req, res) => {
  const items = await NotificationPreference.find();
  res.status(200).json(new ApiResponse(200, items, 'NotificationPreferences fetched successfully'));
});

export const getNotificationPreferenceById = asyncHandler(async (req, res) => {
  const item = await NotificationPreference.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'NotificationPreference not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'NotificationPreference fetched successfully'));
});

export const updateNotificationPreference = asyncHandler(async (req, res) => {
  const item = await NotificationPreference.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'NotificationPreference not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'NotificationPreference updated successfully'));
});

export const deleteNotificationPreference = asyncHandler(async (req, res) => {
  const item = await NotificationPreference.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'NotificationPreference not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'NotificationPreference deleted successfully'));
});
