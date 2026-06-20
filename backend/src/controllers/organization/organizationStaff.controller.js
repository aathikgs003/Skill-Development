import OrganizationStaff from '../../models/organization/OrganizationStaff.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createOrganizationStaff = asyncHandler(async (req, res) => {
  const item = await OrganizationStaff.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'OrganizationStaff created successfully'));
});

export const getAllOrganizationStaffs = asyncHandler(async (req, res) => {
  const items = await OrganizationStaff.find();
  res.status(200).json(new ApiResponse(200, items, 'OrganizationStaffs fetched successfully'));
});

export const getOrganizationStaffById = asyncHandler(async (req, res) => {
  const item = await OrganizationStaff.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationStaff not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationStaff fetched successfully'));
});

export const updateOrganizationStaff = asyncHandler(async (req, res) => {
  const item = await OrganizationStaff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'OrganizationStaff not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'OrganizationStaff updated successfully'));
});

export const deleteOrganizationStaff = asyncHandler(async (req, res) => {
  const item = await OrganizationStaff.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'OrganizationStaff not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'OrganizationStaff deleted successfully'));
});
