import express from 'express';
import registrationWindowRoutes from './registrationWindow.routes.js';
import trainerTimeSlotRoutes from './trainerTimeSlot.routes.js';
import moduleScheduleRoutes from './moduleSchedule.routes.js';
import scheduleConflictRoutes from './scheduleConflict.routes.js';
import allocationRuleRoutes from './allocationRule.routes.js';

const router = express.Router();

router.use('/registrationWindows', registrationWindowRoutes);
router.use('/trainerTimeSlots', trainerTimeSlotRoutes);
router.use('/moduleSchedules', moduleScheduleRoutes);
router.use('/scheduleConflicts', scheduleConflictRoutes);
router.use('/allocationRules', allocationRuleRoutes);

export default router;
