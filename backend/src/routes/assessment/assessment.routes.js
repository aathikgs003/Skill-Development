import express from 'express';
import {
  createAssessment,
  getAllAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment
} from '../../controllers/assessment/assessment.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAssessment)
  .get(protect, getAllAssessments);

router.route('/:id')
  .get(protect, getAssessmentById)
  .put(protect, updateAssessment)
  .delete(protect, deleteAssessment);

export default router;
