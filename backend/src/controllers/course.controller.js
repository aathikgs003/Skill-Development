import Course from '../models/course/Course.js';
import ApiResponse from '../utils/apiResponse.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, durationHours, level, modules } = req.body;

  const existingCourse = await Course.findOne({ title });
  if (existingCourse) {
    throw new ApiError(400, 'Course with this title already exists');
  }

  const course = await Course.create({
    title,
    description,
    category,
    durationHours,
    level,
    modules,
    createdBy: req.user?._id,
  });

  res.status(201).json(new ApiResponse(201, course, 'Course created successfully'));
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json(new ApiResponse(200, courses, 'Courses fetched successfully'));
});

export const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  res.status(200).json(new ApiResponse(200, course, 'Course fetched successfully'));
});
