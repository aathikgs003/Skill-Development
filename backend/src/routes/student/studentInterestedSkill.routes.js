import express from 'express';
import {
  createStudentInterestedSkill,
  getAllStudentInterestedSkills,
  getStudentInterestedSkillById,
  updateStudentInterestedSkill,
  deleteStudentInterestedSkill
} from '../../controllers/student/studentInterestedSkill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentInterestedSkill)
  .get(protect, getAllStudentInterestedSkills);

router.route('/:id')
  .get(protect, getStudentInterestedSkillById)
  .put(protect, updateStudentInterestedSkill)
  .delete(protect, deleteStudentInterestedSkill);

export default router;
