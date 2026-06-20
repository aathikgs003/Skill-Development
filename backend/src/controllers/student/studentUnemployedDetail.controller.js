import StudentUnemployedDetail from '../../models/student/StudentUnemployedDetail.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentUnemployedDetail = asyncHandler(async (req, res) => {
  const item = await StudentUnemployedDetail.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentUnemployedDetail created successfully'));
});

export const getAllStudentUnemployedDetails = asyncHandler(async (req, res) => {
  const items = await StudentUnemployedDetail.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentUnemployedDetails fetched successfully'));
});

export const getStudentUnemployedDetailById = asyncHandler(async (req, res) => {
  const item = await StudentUnemployedDetail.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentUnemployedDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentUnemployedDetail fetched successfully'));
});

export const updateStudentUnemployedDetail = asyncHandler(async (req, res) => {
  const item = await StudentUnemployedDetail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentUnemployedDetail not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentUnemployedDetail updated successfully'));
});

export const deleteStudentUnemployedDetail = asyncHandler(async (req, res) => {
  const item = await StudentUnemployedDetail.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentUnemployedDetail not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentUnemployedDetail deleted successfully'));
});
