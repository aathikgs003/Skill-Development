import CourseSkillCovered from '../../models/course/CourseSkillCovered.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCourseSkillCovered = asyncHandler(async (req, res) => {
  const item = await CourseSkillCovered.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CourseSkillCovered created successfully'));
});

export const getAllCourseSkillCovereds = asyncHandler(async (req, res) => {
  const items = await CourseSkillCovered.find();
  res.status(200).json(new ApiResponse(200, items, 'CourseSkillCovereds fetched successfully'));
});

export const getCourseSkillCoveredById = asyncHandler(async (req, res) => {
  const item = await CourseSkillCovered.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CourseSkillCovered not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CourseSkillCovered fetched successfully'));
});

export const updateCourseSkillCovered = asyncHandler(async (req, res) => {
  const item = await CourseSkillCovered.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CourseSkillCovered not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CourseSkillCovered updated successfully'));
});

export const deleteCourseSkillCovered = asyncHandler(async (req, res) => {
  const item = await CourseSkillCovered.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CourseSkillCovered not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CourseSkillCovered deleted successfully'));
});
