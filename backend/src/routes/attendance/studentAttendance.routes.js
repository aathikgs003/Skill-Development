import express from 'express';
import {
  createStudentAttendance,
  getAllStudentAttendances,
  getStudentAttendanceById,
  updateStudentAttendance,
  deleteStudentAttendance
} from '../../controllers/attendance/studentAttendance.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentAttendance)
  .get(protect, getAllStudentAttendances);

router.route('/:id')
  .get(protect, getStudentAttendanceById)
  .put(protect, updateStudentAttendance)
  .delete(protect, deleteStudentAttendance);

export default router;
