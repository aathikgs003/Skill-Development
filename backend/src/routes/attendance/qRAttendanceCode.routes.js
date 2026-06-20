import express from 'express';
import {
  createQRAttendanceCode,
  getAllQRAttendanceCodes,
  getQRAttendanceCodeById,
  updateQRAttendanceCode,
  deleteQRAttendanceCode
} from '../../controllers/attendance/qRAttendanceCode.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createQRAttendanceCode)
  .get(protect, getAllQRAttendanceCodes);

router.route('/:id')
  .get(protect, getQRAttendanceCodeById)
  .put(protect, updateQRAttendanceCode)
  .delete(protect, deleteQRAttendanceCode);

export default router;
