import Certificate from '../../models/certificate/Certificate.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCertificate = asyncHandler(async (req, res) => {
  const item = await Certificate.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Certificate created successfully'));
});

export const getAllCertificates = asyncHandler(async (req, res) => {
  const items = await Certificate.find();
  res.status(200).json(new ApiResponse(200, items, 'Certificates fetched successfully'));
});

export const getCertificateById = asyncHandler(async (req, res) => {
  const item = await Certificate.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Certificate not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Certificate fetched successfully'));
});

export const updateCertificate = asyncHandler(async (req, res) => {
  const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Certificate not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Certificate updated successfully'));
});

export const deleteCertificate = asyncHandler(async (req, res) => {
  const item = await Certificate.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Certificate not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Certificate deleted successfully'));
});
