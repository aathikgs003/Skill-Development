import OrganizationSpecialization from '../../models/organization/OrganizationSpecialization.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createOrganizationSpecialization = asyncHandler(async (req, res) => {
  const item = await OrganizationSpecialization.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'OrganizationSpecialization created successfully'));
});

export const getAllOrganizationSpecializations = asyncHandler(async (req, res) => {
  const items = await OrganizationSpecialization.find();
  res.status(200).json(new ApiResponse(200, items, 'OrganizationSpecializations fetched successfully'));
});

export const getOrganizationSpecializationById = asyncHandler(async (req, res) => {
  const item = await OrganizationSpecialization.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationSpecialization not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationSpecialization fetched successfully'));
});

export const updateOrganizationSpecialization = asyncHandler(async (req, res) => {
  const item = await OrganizationSpecialization.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'OrganizationSpecialization not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationSpecialization updated successfully'));
});

export const deleteOrganizationSpecialization = asyncHandler(async (req, res) => {
  const item = await OrganizationSpecialization.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationSpecialization not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'OrganizationSpecialization deleted successfully'));
});
