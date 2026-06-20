import Enrollment from '../../models/enrollment/Enrollment.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createEnrollment = asyncHandler(async (req, res) => {
  const item = await Enrollment.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Enrollment created successfully'));
});

export const getAllEnrollments = asyncHandler(async (req, res) => {
  const filter = { ...req.query };
  const items = await Enrollment.find(filter).populate('student course batch');
  res.status(200).json(new ApiResponse(200, items, 'Enrollments fetched successfully'));
});

export const getEnrollmentById = asyncHandler(async (req, res) => {
  const item = await Enrollment.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Enrollment not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Enrollment fetched successfully'));
});

export const updateEnrollment = asyncHandler(async (req, res) => {
  const item = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Enrollment not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Enrollment updated successfully'));
});

export const deleteEnrollment = asyncHandler(async (req, res) => {
  const item = await Enrollment.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Enrollment not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Enrollment deleted successfully'));
});
