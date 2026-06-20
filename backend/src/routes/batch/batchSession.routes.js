import express from 'express';
import {
  createBatchSession,
  getAllBatchSessions,
  getBatchSessionById,
  updateBatchSession,
  deleteBatchSession
} from '../../controllers/batch/batchSession.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createBatchSession)
  .get(protect, getAllBatchSessions);

router.route('/:id')
  .get(protect, getBatchSessionById)
  .put(protect, updateBatchSession)
  .delete(protect, deleteBatchSession);

export default router;
