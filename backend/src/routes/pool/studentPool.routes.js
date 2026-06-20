import express from 'express';
import {
  createStudentPool,
  getAllStudentPools,
  getStudentPoolById,
  updateStudentPool,
  deleteStudentPool
} from '../../controllers/pool/studentPool.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudentPool)
  .get(protect, getAllStudentPools);

router.route('/:id')
  .get(protect, getStudentPoolById)
  .put(protect, updateStudentPool)
  .delete(protect, deleteStudentPool);

export default router;
