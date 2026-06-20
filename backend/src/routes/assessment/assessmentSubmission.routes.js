import express from 'express';
import {
  createAssessmentSubmission,
  getAllAssessmentSubmissions,
  getAssessmentSubmissionById,
  updateAssessmentSubmission,
  deleteAssessmentSubmission
} from '../../controllers/assessment/assessmentSubmission.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAssessmentSubmission)
  .get(protect, getAllAssessmentSubmissions);

router.route('/:id')
  .get(protect, getAssessmentSubmissionById)
  .put(protect, updateAssessmentSubmission)
  .delete(protect, deleteAssessmentSubmission);

export default router;
