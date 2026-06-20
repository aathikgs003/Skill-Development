import DocumentType from '../../models/master/DocumentType.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createDocumentType = asyncHandler(async (req, res) => {
  const item = await DocumentType.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'DocumentType created successfully'));
});

export const getAllDocumentTypes = asyncHandler(async (req, res) => {
  const items = await DocumentType.find();
  res.status(200).json(new ApiResponse(200, items, 'DocumentTypes fetched successfully'));
});

export const getDocumentTypeById = asyncHandler(async (req, res) => {
  const item = await DocumentType.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'DocumentType not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'DocumentType fetched successfully'));
});

export const updateDocumentType = asyncHandler(async (req, res) => {
  const item = await DocumentType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'DocumentType not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'DocumentType updated successfully'));
});

export const deleteDocumentType = asyncHandler(async (req, res) => {
  const item = await DocumentType.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'DocumentType not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'DocumentType deleted successfully'));
});
