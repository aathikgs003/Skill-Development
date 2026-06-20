import OrganizationSkill from '../../models/organization/OrganizationSkill.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createOrganizationSkill = asyncHandler(async (req, res) => {
  const item = await OrganizationSkill.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'OrganizationSkill created successfully'));
});

export const getAllOrganizationSkills = asyncHandler(async (req, res) => {
  const items = await OrganizationSkill.find();
  res.status(200).json(new ApiResponse(200, items, 'OrganizationSkills fetched successfully'));
});

export const getOrganizationSkillById = asyncHandler(async (req, res) => {
  const item = await OrganizationSkill.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationSkill fetched successfully'));
});

export const updateOrganizationSkill = asyncHandler(async (req, res) => {
  const item = await OrganizationSkill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'OrganizationSkill not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationSkill updated successfully'));
});

export const deleteOrganizationSkill = asyncHandler(async (req, res) => {
  const item = await OrganizationSkill.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationSkill not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'OrganizationSkill deleted successfully'));
});
