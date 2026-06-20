import OrganizationRanking from '../../models/analytics/OrganizationRanking.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createOrganizationRanking = asyncHandler(async (req, res) => {
  const item = await OrganizationRanking.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'OrganizationRanking created successfully'));
});

export const getAllOrganizationRankings = asyncHandler(async (req, res) => {
  const items = await OrganizationRanking.find();
  res.status(200).json(new ApiResponse(200, items, 'OrganizationRankings fetched successfully'));
});

export const getOrganizationRankingById = asyncHandler(async (req, res) => {
  const item = await OrganizationRanking.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationRanking not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationRanking fetched successfully'));
});

export const updateOrganizationRanking = asyncHandler(async (req, res) => {
  const item = await OrganizationRanking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'OrganizationRanking not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationRanking updated successfully'));
});

export const deleteOrganizationRanking = asyncHandler(async (req, res) => {
  const item = await OrganizationRanking.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationRanking not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'OrganizationRanking deleted successfully'));
});
