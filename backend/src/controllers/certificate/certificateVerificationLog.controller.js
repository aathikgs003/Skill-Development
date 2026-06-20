import CertificateVerificationLog from '../../models/certificate/CertificateVerificationLog.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCertificateVerificationLog = asyncHandler(async (req, res) => {
  const item = await CertificateVerificationLog.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CertificateVerificationLog created successfully'));
});

export const getAllCertificateVerificationLogs = asyncHandler(async (req, res) => {
  const items = await CertificateVerificationLog.find();
  res.status(200).json(new ApiResponse(200, items, 'CertificateVerificationLogs fetched successfully'));
});

export const getCertificateVerificationLogById = asyncHandler(async (req, res) => {
  const item = await CertificateVerificationLog.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CertificateVerificationLog not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CertificateVerificationLog fetched successfully'));
});

export const updateCertificateVerificationLog = asyncHandler(async (req, res) => {
  const item = await CertificateVerificationLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CertificateVerificationLog not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CertificateVerificationLog updated successfully'));
});

export const deleteCertificateVerificationLog = asyncHandler(async (req, res) => {
  const item = await CertificateVerificationLog.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CertificateVerificationLog not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CertificateVerificationLog deleted successfully'));
});
