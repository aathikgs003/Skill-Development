import express from 'express';
import {
  createDegree,
  getAllDegrees,
  getDegreeById,
  updateDegree,
  deleteDegree
} from '../../controllers/master/degree.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createDegree)
  .get(protect, getAllDegrees);

router.route('/:id')
  .get(protect, getDegreeById)
  .put(protect, updateDegree)
  .delete(protect, deleteDegree);

export default router;
