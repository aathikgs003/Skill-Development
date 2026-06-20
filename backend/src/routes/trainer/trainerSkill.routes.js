import express from 'express';
import {
  createTrainerSkill,
  getAllTrainerSkills,
  getTrainerSkillById,
  updateTrainerSkill,
  deleteTrainerSkill
} from '../../controllers/trainer/trainerSkill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerSkill)
  .get(protect, getAllTrainerSkills);

router.route('/:id')
  .get(protect, getTrainerSkillById)
  .put(protect, updateTrainerSkill)
  .delete(protect, deleteTrainerSkill);

export default router;
