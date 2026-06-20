import SystemSetting from '../../models/system/SystemSetting.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createSystemSetting = asyncHandler(async (req, res) => {
  const item = await SystemSetting.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'SystemSetting created successfully'));
});

export const getAllSystemSettings = asyncHandler(async (req, res) => {
  const items = await SystemSetting.find();
  res.status(200).json(new ApiResponse(200, items, 'SystemSettings fetched successfully'));
});

export const getSystemSettingById = asyncHandler(async (req, res) => {
  const item = await SystemSetting.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'SystemSetting not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'SystemSetting fetched successfully'));
});

export const updateSystemSetting = asyncHandler(async (req, res) => {
  const item = await SystemSetting.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'SystemSetting not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'SystemSetting updated successfully'));
});

export const deleteSystemSetting = asyncHandler(async (req, res) => {
  const item = await SystemSetting.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'SystemSetting not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'SystemSetting deleted successfully'));
});
