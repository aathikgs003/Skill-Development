import CoursePerformance from '../../models/analytics/CoursePerformance.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCoursePerformance = asyncHandler(async (req, res) => {
  const item = await CoursePerformance.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CoursePerformance created successfully'));
});

export const getAllCoursePerformances = asyncHandler(async (req, res) => {
  const items = await CoursePerformance.find();
  res.status(200).json(new ApiResponse(200, items, 'CoursePerformances fetched successfully'));
});

export const getCoursePerformanceById = asyncHandler(async (req, res) => {
  const item = await CoursePerformance.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoursePerformance not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoursePerformance fetched successfully'));
});

export const updateCoursePerformance = asyncHandler(async (req, res) => {
  const item = await CoursePerformance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CoursePerformance not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoursePerformance updated successfully'));
});

export const deleteCoursePerformance = asyncHandler(async (req, res) => {
  const item = await CoursePerformance.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoursePerformance not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CoursePerformance deleted successfully'));
});
