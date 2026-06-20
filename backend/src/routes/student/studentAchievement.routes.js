import express from 'express';
import {
  createStudentAchievement,
  getAllStudentAchievements,
  getStudentAchievementById,
  updateStudentAchievement,
  deleteStudentAchievement
} from '../../controllers/student/studentAchievement.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentAchievement)
  .get(protect, getAllStudentAchievements);

router.route('/:id')
  .get(protect, getStudentAchievementById)
  .put(protect, updateStudentAchievement)
  .delete(protect, deleteStudentAchievement);

export default router;
