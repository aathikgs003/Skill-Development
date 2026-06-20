import Organization from '../../models/organization/Organization.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createOrganization = asyncHandler(async (req, res) => {
  const item = await Organization.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Organization created successfully'));
});

export const getAllOrganizations = asyncHandler(async (req, res) => {
  const items = await Organization.find();
  res.status(200).json(new ApiResponse(200, items, 'Organizations fetched successfully'));
});

export const getOrganizationById = asyncHandler(async (req, res) => {
  const item = await Organization.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Organization not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Organization fetched successfully'));
});

export const updateOrganization = asyncHandler(async (req, res) => {
  const item = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Organization not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Organization updated successfully'));
});

export const deleteOrganization = asyncHandler(async (req, res) => {
  const item = await Organization.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Organization not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Organization deleted successfully'));
});
