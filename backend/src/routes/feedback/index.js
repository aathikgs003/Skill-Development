import express from 'express';
import feedbackRoutes from './feedback.routes.js';
import feedbackQuestionRoutes from './feedbackQuestion.routes.js';
import feedbackAnswerRoutes from './feedbackAnswer.routes.js';

const router = express.Router();

router.use('/feedbacks', feedbackRoutes);
router.use('/feedbackQuestions', feedbackQuestionRoutes);
router.use('/feedbackAnswers', feedbackAnswerRoutes);

export default router;
