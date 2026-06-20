import FileUpload from '../../models/system/FileUpload.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFileUpload = asyncHandler(async (req, res) => {
  const item = await FileUpload.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FileUpload created successfully'));
});

export const getAllFileUploads = asyncHandler(async (req, res) => {
  const items = await FileUpload.find();
  res.status(200).json(new ApiResponse(200, items, 'FileUploads fetched successfully'));
});

export const getFileUploadById = asyncHandler(async (req, res) => {
  const item = await FileUpload.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FileUpload not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FileUpload fetched successfully'));
});

export const updateFileUpload = asyncHandler(async (req, res) => {
  const item = await FileUpload.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FileUpload not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FileUpload updated successfully'));
});

export const deleteFileUpload = asyncHandler(async (req, res) => {
  const item = await FileUpload.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FileUpload not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FileUpload deleted successfully'));
});
