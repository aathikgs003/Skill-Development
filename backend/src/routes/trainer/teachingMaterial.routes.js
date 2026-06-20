import express from 'express';
import {
  createTeachingMaterial,
  getAllTeachingMaterials,
  getTeachingMaterialById,
  updateTeachingMaterial,
  deleteTeachingMaterial
} from '../../controllers/trainer/teachingMaterial.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTeachingMaterial)
  .get(protect, getAllTeachingMaterials);

router.route('/:id')
  .get(protect, getTeachingMaterialById)
  .put(protect, updateTeachingMaterial)
  .delete(protect, deleteTeachingMaterial);

export default router;
