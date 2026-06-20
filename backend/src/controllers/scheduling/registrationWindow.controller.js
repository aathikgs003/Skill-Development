import RegistrationWindow from '../../models/scheduling/RegistrationWindow.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createRegistrationWindow = asyncHandler(async (req, res) => {
  const item = await RegistrationWindow.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'RegistrationWindow created successfully'));
});

export const getAllRegistrationWindows = asyncHandler(async (req, res) => {
  const items = await RegistrationWindow.find();
  res.status(200).json(new ApiResponse(200, items, 'RegistrationWindows fetched successfully'));
});

export const getRegistrationWindowById = asyncHandler(async (req, res) => {
  const item = await RegistrationWindow.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'RegistrationWindow not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'RegistrationWindow fetched successfully'));
});

export const updateRegistrationWindow = asyncHandler(async (req, res) => {
  const item = await RegistrationWindow.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'RegistrationWindow not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'RegistrationWindow updated successfully'));
});

export const deleteRegistrationWindow = asyncHandler(async (req, res) => {
  const item = await RegistrationWindow.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'RegistrationWindow not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'RegistrationWindow deleted successfully'));
});
