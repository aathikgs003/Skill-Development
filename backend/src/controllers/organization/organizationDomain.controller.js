import OrganizationDomain from '../../models/organization/OrganizationDomain.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createOrganizationDomain = asyncHandler(async (req, res) => {
  const item = await OrganizationDomain.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'OrganizationDomain created successfully'));
});

export const getAllOrganizationDomains = asyncHandler(async (req, res) => {
  const items = await OrganizationDomain.find();
  res.status(200).json(new ApiResponse(200, items, 'OrganizationDomains fetched successfully'));
});

export const getOrganizationDomainById = asyncHandler(async (req, res) => {
  const item = await OrganizationDomain.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationDomain not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationDomain fetched successfully'));
});

export const updateOrganizationDomain = asyncHandler(async (req, res) => {
  const item = await OrganizationDomain.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'OrganizationDomain not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationDomain updated successfully'));
});

export const deleteOrganizationDomain = asyncHandler(async (req, res) => {
  const item = await OrganizationDomain.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationDomain not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'OrganizationDomain deleted successfully'));
});
