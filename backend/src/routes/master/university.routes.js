import express from 'express';
import {
  createUniversity,
  getAllUniversitys,
  getUniversityById,
  updateUniversity,
  deleteUniversity
} from '../../controllers/master/university.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createUniversity)
  .get(protect, getAllUniversitys);

router.route('/:id')
  .get(protect, getUniversityById)
  .put(protect, updateUniversity)
  .delete(protect, deleteUniversity);

export default router;
