import CourseTopic from '../../models/course/CourseTopic.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCourseTopic = asyncHandler(async (req, res) => {
  const item = await CourseTopic.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CourseTopic created successfully'));
});

export const getAllCourseTopics = asyncHandler(async (req, res) => {
  const items = await CourseTopic.find();
  res.status(200).json(new ApiResponse(200, items, 'CourseTopics fetched successfully'));
});

export const getCourseTopicById = asyncHandler(async (req, res) => {
  const item = await CourseTopic.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CourseTopic not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CourseTopic fetched successfully'));
});

export const updateCourseTopic = asyncHandler(async (req, res) => {
  const item = await CourseTopic.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CourseTopic not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CourseTopic updated successfully'));
});

export const deleteCourseTopic = asyncHandler(async (req, res) => {
  const item = await CourseTopic.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CourseTopic not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CourseTopic deleted successfully'));
});
