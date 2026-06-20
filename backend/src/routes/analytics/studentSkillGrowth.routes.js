import express from 'express';
import {
  createStudentSkillGrowth,
  getAllStudentSkillGrowths,
  getStudentSkillGrowthById,
  updateStudentSkillGrowth,
  deleteStudentSkillGrowth
} from '../../controllers/analytics/studentSkillGrowth.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentSkillGrowth)
  .get(protect, getAllStudentSkillGrowths);

router.route('/:id')
  .get(protect, getStudentSkillGrowthById)
  .put(protect, updateStudentSkillGrowth)
  .delete(protect, deleteStudentSkillGrowth);

export default router;
