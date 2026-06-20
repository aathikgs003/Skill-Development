import UserRole from '../../models/auth/UserRole.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createUserRole = asyncHandler(async (req, res) => {
  const item = await UserRole.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'UserRole created successfully'));
});

export const getAllUserRoles = asyncHandler(async (req, res) => {
  const items = await UserRole.find();
  res.status(200).json(new ApiResponse(200, items, 'UserRoles fetched successfully'));
});

export const getUserRoleById = asyncHandler(async (req, res) => {
  const item = await UserRole.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'UserRole not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'UserRole fetched successfully'));
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const item = await UserRole.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'UserRole not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'UserRole updated successfully'));
});

export const deleteUserRole = asyncHandler(async (req, res) => {
  const item = await UserRole.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'UserRole not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'UserRole deleted successfully'));
});
