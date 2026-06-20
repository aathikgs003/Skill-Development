import NotificationTemplate from '../../models/notification/NotificationTemplate.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createNotificationTemplate = asyncHandler(async (req, res) => {
  const item = await NotificationTemplate.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'NotificationTemplate created successfully'));
});

export const getAllNotificationTemplates = asyncHandler(async (req, res) => {
  const items = await NotificationTemplate.find();
  res.status(200).json(new ApiResponse(200, items, 'NotificationTemplates fetched successfully'));
});

export const getNotificationTemplateById = asyncHandler(async (req, res) => {
  const item = await NotificationTemplate.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'NotificationTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'NotificationTemplate fetched successfully'));
});

export const updateNotificationTemplate = asyncHandler(async (req, res) => {
  const item = await NotificationTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'NotificationTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'NotificationTemplate updated successfully'));
});

export const deleteNotificationTemplate = asyncHandler(async (req, res) => {
  const item = await NotificationTemplate.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'NotificationTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'NotificationTemplate deleted successfully'));
});
