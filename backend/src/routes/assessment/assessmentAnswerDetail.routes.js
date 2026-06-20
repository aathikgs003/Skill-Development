import express from 'express';
import {
  createAssessmentAnswerDetail,
  getAllAssessmentAnswerDetails,
  getAssessmentAnswerDetailById,
  updateAssessmentAnswerDetail,
  deleteAssessmentAnswerDetail
} from '../../controllers/assessment/assessmentAnswerDetail.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAssessmentAnswerDetail)
  .get(protect, getAllAssessmentAnswerDetails);

router.route('/:id')
  .get(protect, getAssessmentAnswerDetailById)
  .put(protect, updateAssessmentAnswerDetail)
  .delete(protect, deleteAssessmentAnswerDetail);

export default router;
