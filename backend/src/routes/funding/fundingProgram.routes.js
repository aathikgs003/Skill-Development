import express from 'express';
import {
  createFundingProgram,
  getAllFundingPrograms,
  getFundingProgramById,
  updateFundingProgram,
  deleteFundingProgram
} from '../../controllers/funding/fundingProgram.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFundingProgram)
  .get(protect, getAllFundingPrograms);

router.route('/:id')
  .get(protect, getFundingProgramById)
  .put(protect, updateFundingProgram)
  .delete(protect, deleteFundingProgram);

export default router;
