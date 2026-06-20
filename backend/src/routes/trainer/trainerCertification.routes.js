import express from 'express';
import {
  createTrainerCertification,
  getAllTrainerCertifications,
  getTrainerCertificationById,
  updateTrainerCertification,
  deleteTrainerCertification
} from '../../controllers/trainer/trainerCertification.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerCertification)
  .get(protect, getAllTrainerCertifications);

router.route('/:id')
  .get(protect, getTrainerCertificationById)
  .put(protect, updateTrainerCertification)
  .delete(protect, deleteTrainerCertification);

export default router;
