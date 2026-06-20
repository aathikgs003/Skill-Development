import EmailTemplate from '../../models/system/EmailTemplate.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createEmailTemplate = asyncHandler(async (req, res) => {
  const item = await EmailTemplate.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'EmailTemplate created successfully'));
});

export const getAllEmailTemplates = asyncHandler(async (req, res) => {
  const items = await EmailTemplate.find();
  res.status(200).json(new ApiResponse(200, items, 'EmailTemplates fetched successfully'));
});

export const getEmailTemplateById = asyncHandler(async (req, res) => {
  const item = await EmailTemplate.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'EmailTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'EmailTemplate fetched successfully'));
});

export const updateEmailTemplate = asyncHandler(async (req, res) => {
  const item = await EmailTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'EmailTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'EmailTemplate updated successfully'));
});

export const deleteEmailTemplate = asyncHandler(async (req, res) => {
  const item = await EmailTemplate.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'EmailTemplate not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'EmailTemplate deleted successfully'));
});
