import express from 'express';
import {
  createTrainerExperience,
  getAllTrainerExperiences,
  getTrainerExperienceById,
  updateTrainerExperience,
  deleteTrainerExperience
} from '../../controllers/trainer/trainerExperience.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerExperience)
  .get(protect, getAllTrainerExperiences);

router.route('/:id')
  .get(protect, getTrainerExperienceById)
  .put(protect, updateTrainerExperience)
  .delete(protect, deleteTrainerExperience);

export default router;
