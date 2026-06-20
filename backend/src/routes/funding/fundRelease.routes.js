import express from 'express';
import {
  createFundRelease,
  getAllFundReleases,
  getFundReleaseById,
  updateFundRelease,
  deleteFundRelease
} from '../../controllers/funding/fundRelease.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createFundRelease)
  .get(protect, getAllFundReleases);

router.route('/:id')
  .get(protect, getFundReleaseById)
  .put(protect, updateFundRelease)
  .delete(protect, deleteFundRelease);

export default router;
