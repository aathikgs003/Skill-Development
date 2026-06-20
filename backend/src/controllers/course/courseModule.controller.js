import CourseModule from '../../models/course/CourseModule.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCourseModule = asyncHandler(async (req, res) => {
  const item = await CourseModule.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CourseModule created successfully'));
});

export const getAllCourseModules = asyncHandler(async (req, res) => {
  const items = await CourseModule.find();
  res.status(200).json(new ApiResponse(200, items, 'CourseModules fetched successfully'));
});

export const getCourseModuleById = asyncHandler(async (req, res) => {
  const item = await CourseModule.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CourseModule not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CourseModule fetched successfully'));
});

export const updateCourseModule = asyncHandler(async (req, res) => {
  const item = await CourseModule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CourseModule not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CourseModule updated successfully'));
});

export const deleteCourseModule = asyncHandler(async (req, res) => {
  const item = await CourseModule.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CourseModule not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CourseModule deleted successfully'));
});
