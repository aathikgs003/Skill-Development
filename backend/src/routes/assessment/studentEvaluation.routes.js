import express from 'express';
import {
  createStudentEvaluation,
  getAllStudentEvaluations,
  getStudentEvaluationById,
  updateStudentEvaluation,
  deleteStudentEvaluation
} from '../../controllers/assessment/studentEvaluation.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentEvaluation)
  .get(protect, getAllStudentEvaluations);

router.route('/:id')
  .get(protect, getStudentEvaluationById)
  .put(protect, updateStudentEvaluation)
  .delete(protect, deleteStudentEvaluation);

export default router;
