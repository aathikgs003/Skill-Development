import express from 'express';
import {
  createFeedbackQuestion,
  getAllFeedbackQuestions,
  getFeedbackQuestionById,
  updateFeedbackQuestion,
  deleteFeedbackQuestion
} from '../../controllers/feedback/feedbackQuestion.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFeedbackQuestion)
  .get(protect, getAllFeedbackQuestions);

router.route('/:id')
  .get(protect, getFeedbackQuestionById)
  .put(protect, updateFeedbackQuestion)
  .delete(protect, deleteFeedbackQuestion);

export default router;
