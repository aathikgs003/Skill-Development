import express from 'express';
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill
} from '../../controllers/master/skill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createSkill)
  .get(protect, getAllSkills);

router.route('/:id')
  .get(protect, getSkillById)
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

export default router;
