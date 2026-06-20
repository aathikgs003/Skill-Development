import express from 'express';
import {
  createAuditLog,
  getAllAuditLogs,
  getAuditLogById,
  updateAuditLog,
  deleteAuditLog
} from '../../controllers/auth/auditLog.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAuditLog)
  .get(protect, getAllAuditLogs);

router.route('/:id')
  .get(protect, getAuditLogById)
  .put(protect, updateAuditLog)
  .delete(protect, deleteAuditLog);

export default router;
