import express from 'express';
import {
  createScheduleConflict,
  getAllScheduleConflicts,
  getScheduleConflictById,
  updateScheduleConflict,
  deleteScheduleConflict
} from '../../controllers/scheduling/scheduleConflict.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createScheduleConflict)
  .get(protect, getAllScheduleConflicts);

router.route('/:id')
  .get(protect, getScheduleConflictById)
  .put(protect, updateScheduleConflict)
  .delete(protect, deleteScheduleConflict);

export default router;
