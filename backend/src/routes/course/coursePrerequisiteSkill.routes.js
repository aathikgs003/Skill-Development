import express from 'express';
import {
  createCoursePrerequisiteSkill,
  getAllCoursePrerequisiteSkills,
  getCoursePrerequisiteSkillById,
  updateCoursePrerequisiteSkill,
  deleteCoursePrerequisiteSkill
} from '../../controllers/course/coursePrerequisiteSkill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCoursePrerequisiteSkill)
  .get(protect, getAllCoursePrerequisiteSkills);

router.route('/:id')
  .get(protect, getCoursePrerequisiteSkillById)
  .put(protect, updateCoursePrerequisiteSkill)
  .delete(protect, deleteCoursePrerequisiteSkill);

export default router;
