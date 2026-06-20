import express from 'express';
import {
  createEducationType,
  getAllEducationTypes,
  getEducationTypeById,
  updateEducationType,
  deleteEducationType
} from '../../controllers/master/educationType.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createEducationType)
  .get(protect, getAllEducationTypes);

router.route('/:id')
  .get(protect, getEducationTypeById)
  .put(protect, updateEducationType)
  .delete(protect, deleteEducationType);

export default router;
