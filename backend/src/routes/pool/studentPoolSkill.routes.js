import express from 'express';
import {
  createStudentPoolSkill,
  getAllStudentPoolSkills,
  getStudentPoolSkillById,
  updateStudentPoolSkill,
  deleteStudentPoolSkill
} from '../../controllers/pool/studentPoolSkill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentPoolSkill)
  .get(protect, getAllStudentPoolSkills);

router.route('/:id')
  .get(protect, getStudentPoolSkillById)
  .put(protect, updateStudentPoolSkill)
  .delete(protect, deleteStudentPoolSkill);

export default router;
