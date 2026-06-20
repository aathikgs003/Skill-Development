import StudentSkill from '../../models/student/StudentSkill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentSkill = asyncHandler(async (req, res) => {
  const item = await StudentSkill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentSkill created successfully'));
});

export const getAllStudentSkills = asyncHandler(async (req, res) => {
  const items = await StudentSkill.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentSkills fetched successfully'));
});

export const getStudentSkillById = asyncHandler(async (req, res) => {
  const item = await StudentSkill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentSkill fetched successfully'));
});

export const updateStudentSkill = asyncHandler(async (req, res) => {
  const item = await StudentSkill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentSkill updated successfully'));
});

export const deleteStudentSkill = asyncHandler(async (req, res) => {
  const item = await StudentSkill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentSkill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentSkill deleted successfully'));
});
