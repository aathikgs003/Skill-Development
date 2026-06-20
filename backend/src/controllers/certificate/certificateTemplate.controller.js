import CertificateTemplate from '../../models/certificate/CertificateTemplate.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCertificateTemplate = asyncHandler(async (req, res) => {
  const item = await CertificateTemplate.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'CertificateTemplate created successfully'));
});

export const getAllCertificateTemplates = asyncHandler(async (req, res) => {
  const items = await CertificateTemplate.find();
  res.status(200).json(new ApiResponse(200, items, 'CertificateTemplates fetched successfully'));
});

export const getCertificateTemplateById = asyncHandler(async (req, res) => {
  const item = await CertificateTemplate.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CertificateTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CertificateTemplate fetched successfully'));
});

export const updateCertificateTemplate = asyncHandler(async (req, res) => {
  const item = await CertificateTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'CertificateTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'CertificateTemplate updated successfully'));
});

export const deleteCertificateTemplate = asyncHandler(async (req, res) => {
  const item = await CertificateTemplate.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'CertificateTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'CertificateTemplate deleted successfully'));
});
