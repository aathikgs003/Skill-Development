import AuditLog from '../../models/auth/AuditLog.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAuditLog = asyncHandler(async (req, res) => {
  const item = await AuditLog.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'AuditLog created successfully'));
});

export const getAllAuditLogs = asyncHandler(async (req, res) => {
  const items = await AuditLog.find();
  res.status(200).json(new ApiResponse(200, items, 'AuditLogs fetched successfully'));
});

export const getAuditLogById = asyncHandler(async (req, res) => {
  const item = await AuditLog.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AuditLog not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AuditLog fetched successfully'));
});

export const updateAuditLog = asyncHandler(async (req, res) => {
  const item = await AuditLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'AuditLog not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'AuditLog updated successfully'));
});

export const deleteAuditLog = asyncHandler(async (req, res) => {
  const item = await AuditLog.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'AuditLog not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'AuditLog deleted successfully'));
});
