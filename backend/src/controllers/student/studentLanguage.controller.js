import StudentLanguage from '../../models/student/StudentLanguage.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentLanguage = asyncHandler(async (req, res) => {
  const item = await StudentLanguage.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentLanguage created successfully'));
});

export const getAllStudentLanguages = asyncHandler(async (req, res) => {
  const items = await StudentLanguage.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentLanguages fetched successfully'));
});

export const getStudentLanguageById = asyncHandler(async (req, res) => {
  const item = await StudentLanguage.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentLanguage fetched successfully'));
});

export const updateStudentLanguage = asyncHandler(async (req, res) => {
  const item = await StudentLanguage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentLanguage updated successfully'));
});

export const deleteStudentLanguage = asyncHandler(async (req, res) => {
  const item = await StudentLanguage.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentLanguage not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentLanguage deleted successfully'));
});
