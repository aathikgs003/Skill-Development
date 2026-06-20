import express from 'express';
import {
  createStudentCodingProfile,
  getAllStudentCodingProfiles,
  getStudentCodingProfileById,
  updateStudentCodingProfile,
  deleteStudentCodingProfile
} from '../../controllers/student/studentCodingProfile.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentCodingProfile)
  .get(protect, getAllStudentCodingProfiles);

router.route('/:id')
  .get(protect, getStudentCodingProfileById)
  .put(protect, updateStudentCodingProfile)
  .delete(protect, deleteStudentCodingProfile);

export default router;
