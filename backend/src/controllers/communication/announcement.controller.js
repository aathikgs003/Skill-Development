import Announcement from '../../models/communication/Announcement.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Announcement created successfully'));
});

export const getAllAnnouncements = asyncHandler(async (req, res) => {
  const items = await Announcement.find();
  res.status(200).json(new ApiResponse(200, items, 'Announcements fetched successfully'));
});

export const getAnnouncementById = asyncHandler(async (req, res) => {
  const item = await Announcement.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Announcement not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Announcement fetched successfully'));
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Announcement not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Announcement updated successfully'));
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Announcement not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Announcement deleted successfully'));
});
