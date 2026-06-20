import express from 'express';
import {
  createImplementationPartner,
  getAllImplementationPartners,
  getImplementationPartnerById,
  updateImplementationPartner,
  deleteImplementationPartner
} from '../../controllers/partner/implementationPartner.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createImplementationPartner)
  .get(protect, getAllImplementationPartners);

router.route('/:id')
  .get(protect, getImplementationPartnerById)
  .put(protect, updateImplementationPartner)
  .delete(protect, deleteImplementationPartner);

export default router;
