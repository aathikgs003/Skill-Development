import express from 'express';
import {
  createModuleSchedule,
  getAllModuleSchedules,
  getModuleScheduleById,
  updateModuleSchedule,
  deleteModuleSchedule
} from '../../controllers/scheduling/moduleSchedule.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createModuleSchedule)
  .get(protect, getAllModuleSchedules);

router.route('/:id')
  .get(protect, getModuleScheduleById)
  .put(protect, updateModuleSchedule)
  .delete(protect, deleteModuleSchedule);

export default router;
