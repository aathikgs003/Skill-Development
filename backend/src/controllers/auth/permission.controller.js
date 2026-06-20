import Permission from '../../models/auth/Permission.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createPermission = asyncHandler(async (req, res) => {
  const item = await Permission.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Permission created successfully'));
});

export const getAllPermissions = asyncHandler(async (req, res) => {
  const items = await Permission.find();
  res.status(200).json(new ApiResponse(200, items, 'Permissions fetched successfully'));
});

export const getPermissionById = asyncHandler(async (req, res) => {
  const item = await Permission.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Permission not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Permission fetched successfully'));
});

export const updatePermission = asyncHandler(async (req, res) => {
  const item = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Permission not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Permission updated successfully'));
});

export const deletePermission = asyncHandler(async (req, res) => {
  const item = await Permission.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Permission not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Permission deleted successfully'));
});
