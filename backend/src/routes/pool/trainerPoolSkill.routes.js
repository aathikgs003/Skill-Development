import express from 'express';
import {
  createTrainerPoolSkill,
  getAllTrainerPoolSkills,
  getTrainerPoolSkillById,
  updateTrainerPoolSkill,
  deleteTrainerPoolSkill
} from '../../controllers/pool/trainerPoolSkill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTrainerPoolSkill)
  .get(protect, getAllTrainerPoolSkills);

router.route('/:id')
  .get(protect, getTrainerPoolSkillById)
  .put(protect, updateTrainerPoolSkill)
  .delete(protect, deleteTrainerPoolSkill);

export default router;
