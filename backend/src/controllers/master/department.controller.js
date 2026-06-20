import Department from '../../models/master/Department.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createDepartment = asyncHandler(async (req, res) => {
  const item = await Department.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Department created successfully'));
});

export const getAllDepartments = asyncHandler(async (req, res) => {
  const items = await Department.find();
  res.status(200).json(new ApiResponse(200, items, 'Departments fetched successfully'));
});

export const getDepartmentById = asyncHandler(async (req, res) => {
  const item = await Department.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Department not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Department fetched successfully'));
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const item = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Department not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Department updated successfully'));
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  const item = await Department.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Department not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Department deleted successfully'));
});
