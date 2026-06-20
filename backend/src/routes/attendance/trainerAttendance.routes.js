import express from 'express';
import {
  createTrainerAttendance,
  getAllTrainerAttendances,
  getTrainerAttendanceById,
  updateTrainerAttendance,
  deleteTrainerAttendance
} from '../../controllers/attendance/trainerAttendance.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerAttendance)
  .get(protect, getAllTrainerAttendances);

router.route('/:id')
  .get(protect, getTrainerAttendanceById)
  .put(protect, updateTrainerAttendance)
  .delete(protect, deleteTrainerAttendance);

export default router;
