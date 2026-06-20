import express from 'express';
import {
  createCoordinatorSkill,
  getAllCoordinatorSkills,
  getCoordinatorSkillById,
  updateCoordinatorSkill,
  deleteCoordinatorSkill
} from '../../controllers/coordinator/coordinatorSkill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCoordinatorSkill)
  .get(protect, getAllCoordinatorSkills);

router.route('/:id')
  .get(protect, getCoordinatorSkillById)
  .put(protect, updateCoordinatorSkill)
  .delete(protect, deleteCoordinatorSkill);

export default router;
