import StudentCollegeDetail from '../../models/student/StudentCollegeDetail.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentCollegeDetail = asyncHandler(async (req, res) => {
  const item = await StudentCollegeDetail.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentCollegeDetail created successfully'));
});

export const getAllStudentCollegeDetails = asyncHandler(async (req, res) => {
  const items = await StudentCollegeDetail.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentCollegeDetails fetched successfully'));
});

export const getStudentCollegeDetailById = asyncHandler(async (req, res) => {
  const item = await StudentCollegeDetail.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentCollegeDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentCollegeDetail fetched successfully'));
});

export const updateStudentCollegeDetail = asyncHandler(async (req, res) => {
  const item = await StudentCollegeDetail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentCollegeDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentCollegeDetail updated successfully'));
});

export const deleteStudentCollegeDetail = asyncHandler(async (req, res) => {
  const item = await StudentCollegeDetail.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentCollegeDetail not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentCollegeDetail deleted successfully'));
});
