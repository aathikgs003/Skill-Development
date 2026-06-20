import express from 'express';
import {
  createFundingAgency,
  getAllFundingAgencys,
  getFundingAgencyById,
  updateFundingAgency,
  deleteFundingAgency
} from '../../controllers/funding/fundingAgency.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFundingAgency)
  .get(protect, getAllFundingAgencys);

router.route('/:id')
  .get(protect, getFundingAgencyById)
  .put(protect, updateFundingAgency)
  .delete(protect, deleteFundingAgency);

export default router;
