import CoursePrerequisiteSkill from '../../models/course/CoursePrerequisiteSkill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCoursePrerequisiteSkill = asyncHandler(async (req, res) => {
  const item = await CoursePrerequisiteSkill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CoursePrerequisiteSkill created successfully'));
});

export const getAllCoursePrerequisiteSkills = asyncHandler(async (req, res) => {
  const items = await CoursePrerequisiteSkill.find();
  res.status(200).json(new ApiResponse(200, items, 'CoursePrerequisiteSkills fetched successfully'));
});

export const getCoursePrerequisiteSkillById = asyncHandler(async (req, res) => {
  const item = await CoursePrerequisiteSkill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoursePrerequisiteSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoursePrerequisiteSkill fetched successfully'));
});

export const updateCoursePrerequisiteSkill = asyncHandler(async (req, res) => {
  const item = await CoursePrerequisiteSkill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CoursePrerequisiteSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CoursePrerequisiteSkill updated successfully'));
});

export const deleteCoursePrerequisiteSkill = asyncHandler(async (req, res) => {
  const item = await CoursePrerequisiteSkill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CoursePrerequisiteSkill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CoursePrerequisiteSkill deleted successfully'));
});
