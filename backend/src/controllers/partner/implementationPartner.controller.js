import ImplementationPartner from '../../models/partner/ImplementationPartner.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createImplementationPartner = asyncHandler(async (req, res) => {
  const item = await ImplementationPartner.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'ImplementationPartner created successfully'));
});

export const getAllImplementationPartners = asyncHandler(async (req, res) => {
  const items = await ImplementationPartner.find();
  res.status(200).json(new ApiResponse(200, items, 'ImplementationPartners fetched successfully'));
});

export const getImplementationPartnerById = asyncHandler(async (req, res) => {
  const item = await ImplementationPartner.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'ImplementationPartner not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'ImplementationPartner fetched successfully'));
});

export const updateImplementationPartner = asyncHandler(async (req, res) => {
  const item = await ImplementationPartner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'ImplementationPartner not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'ImplementationPartner updated successfully'));
});

export const deleteImplementationPartner = asyncHandler(async (req, res) => {
  const item = await ImplementationPartner.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'ImplementationPartner not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'ImplementationPartner deleted successfully'));
});
