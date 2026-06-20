import express from 'express';
import {
  createCourseSkillCovered,
  getAllCourseSkillCovereds,
  getCourseSkillCoveredById,
  updateCourseSkillCovered,
  deleteCourseSkillCovered
} from '../../controllers/course/courseSkillCovered.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCourseSkillCovered)
  .get(protect, getAllCourseSkillCovereds);

router.route('/:id')
  .get(protect, getCourseSkillCoveredById)
  .put(protect, updateCourseSkillCovered)
  .delete(protect, deleteCourseSkillCovered);

export default router;
