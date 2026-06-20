import ModuleSchedule from '../../models/scheduling/ModuleSchedule.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createModuleSchedule = asyncHandler(async (req, res) => {
  const item = await ModuleSchedule.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'ModuleSchedule created successfully'));
});

export const getAllModuleSchedules = asyncHandler(async (req, res) => {
  const items = await ModuleSchedule.find();
  res.status(200).json(new ApiResponse(200, items, 'ModuleSchedules fetched successfully'));
});

export const getModuleScheduleById = asyncHandler(async (req, res) => {
  const item = await ModuleSchedule.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'ModuleSchedule not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'ModuleSchedule fetched successfully'));
});

export const updateModuleSchedule = asyncHandler(async (req, res) => {
  const item = await ModuleSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'ModuleSchedule not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'ModuleSchedule updated successfully'));
});

export const deleteModuleSchedule = asyncHandler(async (req, res) => {
  const item = await ModuleSchedule.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'ModuleSchedule not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'ModuleSchedule deleted successfully'));
});
