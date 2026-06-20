import express from 'express';
import {
  createCity,
  getAllCitys,
  getCityById,
  updateCity,
  deleteCity
} from '../../controllers/master/city.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCity)
  .get(protect, getAllCitys);

router.route('/:id')
  .get(protect, getCityById)
  .put(protect, updateCity)
  .delete(protect, deleteCity);

export default router;
