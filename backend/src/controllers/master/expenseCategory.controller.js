import ExpenseCategory from '../../models/master/ExpenseCategory.model.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createExpenseCategory = asyncHandler(async (req, res) => {
  const item = await ExpenseCategory.create(req.body);
  res.status(201).json(new ApiResponse(201, item, 'ExpenseCategory created successfully'));
});

export const getAllExpenseCategorys = asyncHandler(async (req, res) => {
  const items = await ExpenseCategory.find();
  res.status(200).json(new ApiResponse(200, items, 'ExpenseCategorys fetched successfully'));
});

export const getExpenseCategoryById = asyncHandler(async (req, res) => {
  const item = await ExpenseCategory.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'ExpenseCategory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'ExpenseCategory fetched successfully'));
});

export const updateExpenseCategory = asyncHandler(async (req, res) => {
  const item = await ExpenseCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    throw new ApiError(404, 'ExpenseCategory not found');
  }
  res.status(200).json(new ApiResponse(200, item, 'ExpenseCategory updated successfully'));
});

export const deleteExpenseCategory = asyncHandler(async (req, res) => {
  const item = await ExpenseCategory.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'ExpenseCategory not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'ExpenseCategory deleted successfully'));
});
