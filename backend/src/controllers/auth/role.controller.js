import Role from '../../models/auth/Role.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createRole = asyncHandler(async (req, res) => {
  const item = await Role.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Role created successfully'));
});

export const getAllRoles = asyncHandler(async (req, res) => {
  const items = await Role.find();
  res.status(200).json(new ApiResponse(200, items, 'Roles fetched successfully'));
});

export const getRoleById = asyncHandler(async (req, res) => {
  const item = await Role.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Role not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Role fetched successfully'));
});

export const updateRole = asyncHandler(async (req, res) => {
  const item = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Role not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Role updated successfully'));
});

export const deleteRole = asyncHandler(async (req, res) => {
  const item = await Role.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Role not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Role deleted successfully'));
});
