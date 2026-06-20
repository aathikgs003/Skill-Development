import StudentSchoolDetail from '../../models/student/StudentSchoolDetail.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentSchoolDetail = asyncHandler(async (req, res) => {
  const item = await StudentSchoolDetail.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentSchoolDetail created successfully'));
});

export const getAllStudentSchoolDetails = asyncHandler(async (req, res) => {
  const items = await StudentSchoolDetail.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentSchoolDetails fetched successfully'));
});

export const getStudentSchoolDetailById = asyncHandler(async (req, res) => {
  const item = await StudentSchoolDetail.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentSchoolDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentSchoolDetail fetched successfully'));
});

export const updateStudentSchoolDetail = asyncHandler(async (req, res) => {
  const item = await StudentSchoolDetail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentSchoolDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentSchoolDetail updated successfully'));
});

export const deleteStudentSchoolDetail = asyncHandler(async (req, res) => {
  const item = await StudentSchoolDetail.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentSchoolDetail not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentSchoolDetail deleted successfully'));
});
