import express from 'express';
import {
  createTimeSlot,
  getAvailableSlots,
  getTimeSlotById,
  updateTimeSlot,
  bookSlot,
  cancelSlot,
  deleteTimeSlot,
} from '../../controllers/scheduling/trainerTimeSlot.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/rbac.middleware.js';

const router = express.Router();

router.use(authMiddleware);

// Get available slots for a trainer
router.get('/trainer/:trainerId/available', getAvailableSlots);

// Manage slots
router.route('/')
  .post(authorizeRoles('SuperAdmin', 'Admin', 'Trainer', 'Coordinator'), createTimeSlot);

router.route('/:id')
  .get(getTimeSlotById)
  .put(authorizeRoles('SuperAdmin', 'Admin', 'Trainer', 'Coordinator'), updateTimeSlot)
  .delete(authorizeRoles('SuperAdmin', 'Admin', 'Trainer', 'Coordinator'), deleteTimeSlot);

// Special booking / cancellation actions
router.patch('/:slotId/book', authorizeRoles('SuperAdmin', 'Admin', 'Coordinator', 'Partner', 'Organization'), bookSlot);
router.patch('/:slotId/cancel', authorizeRoles('SuperAdmin', 'Admin', 'Trainer', 'Coordinator'), cancelSlot);

export default router;
