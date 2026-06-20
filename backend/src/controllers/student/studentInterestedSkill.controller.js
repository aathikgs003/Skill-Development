import StudentInterestedSkill from '../../models/student/StudentInterestedSkill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createStudentInterestedSkill = asyncHandler(async (req, res) => {
  const item = await StudentInterestedSkill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'StudentInterestedSkill created successfully'));
});

export const getAllStudentInterestedSkills = asyncHandler(async (req, res) => {
  const items = await StudentInterestedSkill.find();
  res.status(200).json(new ApiResponse(200, items, 'StudentInterestedSkills fetched successfully'));
});

export const getStudentInterestedSkillById = asyncHandler(async (req, res) => {
  const item = await StudentInterestedSkill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentInterestedSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentInterestedSkill fetched successfully'));
});

export const updateStudentInterestedSkill = asyncHandler(async (req, res) => {
  const item = await StudentInterestedSkill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'StudentInterestedSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'StudentInterestedSkill updated successfully'));
});

export const deleteStudentInterestedSkill = asyncHandler(async (req, res) => {
  const item = await StudentInterestedSkill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'StudentInterestedSkill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'StudentInterestedSkill deleted successfully'));
});
