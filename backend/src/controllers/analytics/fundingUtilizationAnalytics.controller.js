import FundingUtilizationAnalytics from '../../models/analytics/FundingUtilizationAnalytics.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createFundingUtilizationAnalytics = asyncHandler(async (req, res) => {
  const item = await FundingUtilizationAnalytics.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'FundingUtilizationAnalytics created successfully'));
});

export const getAllFundingUtilizationAnalyticss = asyncHandler(async (req, res) => {
  const items = await FundingUtilizationAnalytics.find();
  res.status(200).json(new ApiResponse(200, items, 'FundingUtilizationAnalyticss fetched successfully'));
});

export const getFundingUtilizationAnalyticsById = asyncHandler(async (req, res) => {
  const item = await FundingUtilizationAnalytics.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundingUtilizationAnalytics not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundingUtilizationAnalytics fetched successfully'));
});

export const updateFundingUtilizationAnalytics = asyncHandler(async (req, res) => {
  const item = await FundingUtilizationAnalytics.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'FundingUtilizationAnalytics not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'FundingUtilizationAnalytics updated successfully'));
});

export const deleteFundingUtilizationAnalytics = asyncHandler(async (req, res) => {
  const item = await FundingUtilizationAnalytics.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'FundingUtilizationAnalytics not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'FundingUtilizationAnalytics deleted successfully'));
});
