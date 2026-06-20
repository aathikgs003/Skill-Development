import express from 'express';
import {
  createFeedbackAnswer,
  getAllFeedbackAnswers,
  getFeedbackAnswerById,
  updateFeedbackAnswer,
  deleteFeedbackAnswer
} from '../../controllers/feedback/feedbackAnswer.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFeedbackAnswer)
  .get(protect, getAllFeedbackAnswers);

router.route('/:id')
  .get(protect, getFeedbackAnswerById)
  .put(protect, updateFeedbackAnswer)
  .delete(protect, deleteFeedbackAnswer);

export default router;
