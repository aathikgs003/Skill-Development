import express from 'express';
import {
  createCountry,
  getAllCountrys,
  getCountryById,
  updateCountry,
  deleteCountry
} from '../../controllers/master/country.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCountry)
  .get(protect, getAllCountrys);

router.route('/:id')
  .get(protect, getCountryById)
  .put(protect, updateCountry)
  .delete(protect, deleteCountry);

export default router;
