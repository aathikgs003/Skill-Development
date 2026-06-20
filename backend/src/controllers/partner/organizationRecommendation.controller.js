import OrganizationRecommendation from '../../models/partner/OrganizationRecommendation.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createOrganizationRecommendation = asyncHandler(async (req, res) => {
  const item = await OrganizationRecommendation.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'OrganizationRecommendation created successfully'));
});

export const getAllOrganizationRecommendations = asyncHandler(async (req, res) => {
  const items = await OrganizationRecommendation.find();
  res.status(200).json(new ApiResponse(200, items, 'OrganizationRecommendations fetched successfully'));
});

export const getOrganizationRecommendationById = asyncHandler(async (req, res) => {
  const item = await OrganizationRecommendation.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationRecommendation fetched successfully'));
});

export const updateOrganizationRecommendation = asyncHandler(async (req, res) => {
  const item = await OrganizationRecommendation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'OrganizationRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationRecommendation updated successfully'));
});

export const deleteOrganizationRecommendation = asyncHandler(async (req, res) => {
  const item = await OrganizationRecommendation.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationRecommendation not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'OrganizationRecommendation deleted successfully'));
});
