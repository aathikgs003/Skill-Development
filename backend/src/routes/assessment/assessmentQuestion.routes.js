import express from 'express';
import {
  createAssessmentQuestion,
  getAllAssessmentQuestions,
  getAssessmentQuestionById,
  updateAssessmentQuestion,
  deleteAssessmentQuestion
} from '../../controllers/assessment/assessmentQuestion.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAssessmentQuestion)
  .get(protect, getAllAssessmentQuestions);

router.route('/:id')
  .get(protect, getAssessmentQuestionById)
  .put(protect, updateAssessmentQuestion)
  .delete(protect, deleteAssessmentQuestion);

export default router;
