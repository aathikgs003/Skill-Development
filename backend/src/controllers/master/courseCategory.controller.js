import CourseCategory from '../../models/master/CourseCategory.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCourseCategory = asyncHandler(async (req, res) => {
  const item = await CourseCategory.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CourseCategory created successfully'));
});

export const getAllCourseCategorys = asyncHandler(async (req, res) => {
  const items = await CourseCategory.find();
  res.status(200).json(new ApiResponse(200, items, 'CourseCategorys fetched successfully'));
});

export const getCourseCategoryById = asyncHandler(async (req, res) => {
  const item = await CourseCategory.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CourseCategory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CourseCategory fetched successfully'));
});

export const updateCourseCategory = asyncHandler(async (req, res) => {
  const item = await CourseCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CourseCategory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CourseCategory updated successfully'));
});

export const deleteCourseCategory = asyncHandler(async (req, res) => {
  const item = await CourseCategory.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CourseCategory not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CourseCategory deleted successfully'));
});
