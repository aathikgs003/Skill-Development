import express from 'express';
import {
  createSalaryRange,
  getAllSalaryRanges,
  getSalaryRangeById,
  updateSalaryRange,
  deleteSalaryRange
} from '../../controllers/master/salaryRange.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createSalaryRange)
  .get(protect, getAllSalaryRanges);

router.route('/:id')
  .get(protect, getSalaryRangeById)
  .put(protect, updateSalaryRange)
  .delete(protect, deleteSalaryRange);

export default router;
