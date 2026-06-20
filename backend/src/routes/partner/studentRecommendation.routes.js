import express from 'express';
import {
  createStudentRecommendation,
  getAllStudentRecommendations,
  getStudentRecommendationById,
  updateStudentRecommendation,
  deleteStudentRecommendation
} from '../../controllers/partner/studentRecommendation.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentRecommendation)
  .get(protect, getAllStudentRecommendations);

router.route('/:id')
  .get(protect, getStudentRecommendationById)
  .put(protect, updateStudentRecommendation)
  .delete(protect, deleteStudentRecommendation);

export default router;
