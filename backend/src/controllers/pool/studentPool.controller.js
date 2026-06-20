import StudentPool from '../../models/pool/StudentPool.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentPool = asyncHandler(async (req, res) => {
  const item = await StudentPool.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentPool created successfully'));
});

export const getAllStudentPools = asyncHandler(async (req, res) => {
  const items = await StudentPool.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentPools fetched successfully'));
});

export const getStudentPoolById = asyncHandler(async (req, res) => {
  const item = await StudentPool.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentPool not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentPool fetched successfully'));
});

export const updateStudentPool = asyncHandler(async (req, res) => {
  const item = await StudentPool.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentPool not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentPool updated successfully'));
});

export const deleteStudentPool = asyncHandler(async (req, res) => {
  const item = await StudentPool.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentPool not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentPool deleted successfully'));
});
