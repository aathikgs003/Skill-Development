import express from 'express';
import {
  createEnrollmentStatusHistory,
  getAllEnrollmentStatusHistorys,
  getEnrollmentStatusHistoryById,
  updateEnrollmentStatusHistory,
  deleteEnrollmentStatusHistory
} from '../../controllers/enrollment/enrollmentStatusHistory.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createEnrollmentStatusHistory)
  .get(protect, getAllEnrollmentStatusHistorys);

router.route('/:id')
  .get(protect, getEnrollmentStatusHistoryById)
  .put(protect, updateEnrollmentStatusHistory)
  .delete(protect, deleteEnrollmentStatusHistory);

export default router;
