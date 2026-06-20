import DailyReport from '../../models/report/DailyReport.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createDailyReport = asyncHandler(async (req, res) => {
  const item = await DailyReport.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'DailyReport created successfully'));
});

export const getAllDailyReports = asyncHandler(async (req, res) => {
  const items = await DailyReport.find();
  res.status(200).json(new ApiResponse(200, items, 'DailyReports fetched successfully'));
});

export const getDailyReportById = asyncHandler(async (req, res) => {
  const item = await DailyReport.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'DailyReport not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'DailyReport fetched successfully'));
});

export const updateDailyReport = asyncHandler(async (req, res) => {
  const item = await DailyReport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'DailyReport not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'DailyReport updated successfully'));
});

export const deleteDailyReport = asyncHandler(async (req, res) => {
  const item = await DailyReport.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'DailyReport not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'DailyReport deleted successfully'));
});
