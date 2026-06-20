import QRAttendanceCode from '../../models/attendance/QRAttendanceCode.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createQRAttendanceCode = asyncHandler(async (req, res) => {
  const item = await QRAttendanceCode.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'QRAttendanceCode created successfully'));
});

export const getAllQRAttendanceCodes = asyncHandler(async (req, res) => {
  const items = await QRAttendanceCode.find();
  res.status(200).json(new ApiResponse(200, items, 'QRAttendanceCodes fetched successfully'));
});

export const getQRAttendanceCodeById = asyncHandler(async (req, res) => {
  const item = await QRAttendanceCode.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'QRAttendanceCode not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'QRAttendanceCode fetched successfully'));
});

export const updateQRAttendanceCode = asyncHandler(async (req, res) => {
  const item = await QRAttendanceCode.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'QRAttendanceCode not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'QRAttendanceCode updated successfully'));
});

export const deleteQRAttendanceCode = asyncHandler(async (req, res) => {
  const item = await QRAttendanceCode.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'QRAttendanceCode not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'QRAttendanceCode deleted successfully'));
});
