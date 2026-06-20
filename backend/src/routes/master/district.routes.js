import express from 'express';
import {
  createDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict
} from '../../controllers/master/district.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createDistrict)
  .get(protect, getAllDistricts);

router.route('/:id')
  .get(protect, getDistrictById)
  .put(protect, updateDistrict)
  .delete(protect, deleteDistrict);

export default router;
