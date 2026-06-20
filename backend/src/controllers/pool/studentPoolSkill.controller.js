import StudentPoolSkill from '../../models/pool/StudentPoolSkill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentPoolSkill = asyncHandler(async (req, res) => {
  const item = await StudentPoolSkill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentPoolSkill created successfully'));
});

export const getAllStudentPoolSkills = asyncHandler(async (req, res) => {
  const items = await StudentPoolSkill.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentPoolSkills fetched successfully'));
});

export const getStudentPoolSkillById = asyncHandler(async (req, res) => {
  const item = await StudentPoolSkill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentPoolSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentPoolSkill fetched successfully'));
});

export const updateStudentPoolSkill = asyncHandler(async (req, res) => {
  const item = await StudentPoolSkill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentPoolSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentPoolSkill updated successfully'));
});

export const deleteStudentPoolSkill = asyncHandler(async (req, res) => {
  const item = await StudentPoolSkill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentPoolSkill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentPoolSkill deleted successfully'));
});
