import StudentEmploymentDetail from '../../models/student/StudentEmploymentDetail.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentEmploymentDetail = asyncHandler(async (req, res) => {
  const item = await StudentEmploymentDetail.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentEmploymentDetail created successfully'));
});

export const getAllStudentEmploymentDetails = asyncHandler(async (req, res) => {
  const items = await StudentEmploymentDetail.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentEmploymentDetails fetched successfully'));
});

export const getStudentEmploymentDetailById = asyncHandler(async (req, res) => {
  const item = await StudentEmploymentDetail.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentEmploymentDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentEmploymentDetail fetched successfully'));
});

export const updateStudentEmploymentDetail = asyncHandler(async (req, res) => {
  const item = await StudentEmploymentDetail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentEmploymentDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentEmploymentDetail updated successfully'));
});

export const deleteStudentEmploymentDetail = asyncHandler(async (req, res) => {
  const item = await StudentEmploymentDetail.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentEmploymentDetail not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentEmploymentDetail deleted successfully'));
});
