import express from 'express';
import {
  createStudentSkill,
  getAllStudentSkills,
  getStudentSkillById,
  updateStudentSkill,
  deleteStudentSkill
} from '../../controllers/student/studentSkill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentSkill)
  .get(protect, getAllStudentSkills);

router.route('/:id')
  .get(protect, getStudentSkillById)
  .put(protect, updateStudentSkill)
  .delete(protect, deleteStudentSkill);

export default router;
