import UserPermission from '../../models/auth/UserPermission.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createUserPermission = asyncHandler(async (req, res) => {
  const item = await UserPermission.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'UserPermission created successfully'));
});

export const getAllUserPermissions = asyncHandler(async (req, res) => {
  const items = await UserPermission.find();
  res.status(200).json(new ApiResponse(200, items, 'UserPermissions fetched successfully'));
});

export const getUserPermissionById = asyncHandler(async (req, res) => {
  const item = await UserPermission.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'UserPermission not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'UserPermission fetched successfully'));
});

export const updateUserPermission = asyncHandler(async (req, res) => {
  const item = await UserPermission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'UserPermission not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'UserPermission updated successfully'));
});

export const deleteUserPermission = asyncHandler(async (req, res) => {
  const item = await UserPermission.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'UserPermission not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'UserPermission deleted successfully'));
});
