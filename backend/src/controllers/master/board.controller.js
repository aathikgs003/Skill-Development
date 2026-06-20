import Board from '../../models/master/Board.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createBoard = asyncHandler(async (req, res) => {
  const item = await Board.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'Board created successfully'));
});

export const getAllBoards = asyncHandler(async (req, res) => {
  const items = await Board.find();
  res.status(200).json(new ApiResponse(200, items, 'Boards fetched successfully'));
});

export const getBoardById = asyncHandler(async (req, res) => {
  const item = await Board.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Board not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Board fetched successfully'));
});

export const updateBoard = asyncHandler(async (req, res) => {
  const item = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'Board not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'Board updated successfully'));
});

export const deleteBoard = asyncHandler(async (req, res) => {
  const item = await Board.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Board not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Board deleted successfully'));
});
