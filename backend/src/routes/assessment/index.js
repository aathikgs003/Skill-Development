import express from 'express';
import assessmentRoutes from './assessment.routes.js';
import assessmentQuestionRoutes from './assessmentQuestion.routes.js';
import assessmentSubmissionRoutes from './assessmentSubmission.routes.js';
import assessmentAnswerDetailRoutes from './assessmentAnswerDetail.routes.js';
import studentEvaluationRoutes from './studentEvaluation.routes.js';

const router = express.Router();

router.use('/assessments', assessmentRoutes);
router.use('/assessmentQuestions', assessmentQuestionRoutes);
router.use('/assessmentSubmissions', assessmentSubmissionRoutes);
router.use('/assessmentAnswerDetails', assessmentAnswerDetailRoutes);
router.use('/studentEvaluations', studentEvaluationRoutes);

export default router;
