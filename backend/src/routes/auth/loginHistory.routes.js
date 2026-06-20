import express from 'express';
import {
  createLoginHistory,
  getAllLoginHistorys,
  getLoginHistoryById,
  updateLoginHistory,
  deleteLoginHistory
} from '../../controllers/auth/loginHistory.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createLoginHistory)
  .get(protect, getAllLoginHistorys);

router.route('/:id')
  .get(protect, getLoginHistoryById)
  .put(protect, updateLoginHistory)
  .delete(protect, deleteLoginHistory);

export default router;
