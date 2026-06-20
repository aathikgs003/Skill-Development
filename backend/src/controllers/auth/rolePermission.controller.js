import RolePermission from '../../models/auth/RolePermission.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createRolePermission = asyncHandler(async (req, res) => {
  const item = await RolePermission.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'RolePermission created successfully'));
});

export const getAllRolePermissions = asyncHandler(async (req, res) => {
  const items = await RolePermission.find();
  res.status(200).json(new ApiResponse(200, items, 'RolePermissions fetched successfully'));
});

export const getRolePermissionById = asyncHandler(async (req, res) => {
  const item = await RolePermission.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'RolePermission not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'RolePermission fetched successfully'));
});

export const updateRolePermission = asyncHandler(async (req, res) => {
  const item = await RolePermission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'RolePermission not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'RolePermission updated successfully'));
});

export const deleteRolePermission = asyncHandler(async (req, res) => {
  const item = await RolePermission.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'RolePermission not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'RolePermission deleted successfully'));
});
