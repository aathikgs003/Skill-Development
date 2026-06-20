import OrganizationDocument from '../../models/organization/OrganizationDocument.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createOrganizationDocument = asyncHandler(async (req, res) => {
  const item = await OrganizationDocument.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'OrganizationDocument created successfully'));
});

export const getAllOrganizationDocuments = asyncHandler(async (req, res) => {
  const items = await OrganizationDocument.find();
  res.status(200).json(new ApiResponse(200, items, 'OrganizationDocuments fetched successfully'));
});

export const getOrganizationDocumentById = asyncHandler(async (req, res) => {
  const item = await OrganizationDocument.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationDocument not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationDocument fetched successfully'));
});

export const updateOrganizationDocument = asyncHandler(async (req, res) => {
  const item = await OrganizationDocument.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'OrganizationDocument not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationDocument updated successfully'));
});

export const deleteOrganizationDocument = asyncHandler(async (req, res) => {
  const item = await OrganizationDocument.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationDocument not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'OrganizationDocument deleted successfully'));
});
