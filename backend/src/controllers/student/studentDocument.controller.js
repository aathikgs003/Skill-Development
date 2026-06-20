import StudentDocument from '../../models/student/StudentDocument.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentDocument = asyncHandler(async (req, res) => {
  const item = await StudentDocument.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentDocument created successfully'));
});

export const getAllStudentDocuments = asyncHandler(async (req, res) => {
  const items = await StudentDocument.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentDocuments fetched successfully'));
});

export const getStudentDocumentById = asyncHandler(async (req, res) => {
  const item = await StudentDocument.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentDocument not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentDocument fetched successfully'));
});

export const updateStudentDocument = asyncHandler(async (req, res) => {
  const item = await StudentDocument.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentDocument not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentDocument updated successfully'));
});

export const deleteStudentDocument = asyncHandler(async (req, res) => {
  const item = await StudentDocument.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentDocument not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentDocument deleted successfully'));
});
