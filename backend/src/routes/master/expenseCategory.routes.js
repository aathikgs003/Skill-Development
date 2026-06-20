import express from 'express';
import {
  createExpenseCategory,
  getAllExpenseCategorys,
  getExpenseCategoryById,
  updateExpenseCategory,
  deleteExpenseCategory
} from '../../controllers/master/expenseCategory.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createExpenseCategory)
  .get(protect, getAllExpenseCategorys);

router.route('/:id')
  .get(protect, getExpenseCategoryById)
  .put(protect, updateExpenseCategory)
  .delete(protect, deleteExpenseCategory);

export default router;
