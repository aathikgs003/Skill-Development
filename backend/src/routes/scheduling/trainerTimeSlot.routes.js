import express from 'express';
import {
  createTrainerTimeSlot,
  getAllTrainerTimeSlots,
  getTrainerTimeSlotById,
  updateTrainerTimeSlot,
  deleteTrainerTimeSlot
} from '../../controllers/scheduling/trainerTimeSlot.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerTimeSlot)
  .get(protect, getAllTrainerTimeSlots);

router.route('/:id')
  .get(protect, getTrainerTimeSlotById)
  .put(protect, updateTrainerTimeSlot)
  .delete(protect, deleteTrainerTimeSlot);

export default router;
