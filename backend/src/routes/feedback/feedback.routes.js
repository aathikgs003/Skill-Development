import express from 'express';
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} from '../../controllers/feedback/feedback.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFeedback)
  .get(protect, getAllFeedbacks);

router.route('/:id')
  .get(protect, getFeedbackById)
  .put(protect, updateFeedback)
  .delete(protect, deleteFeedback);

export default router;
