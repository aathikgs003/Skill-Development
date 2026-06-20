import express from 'express';
import coordinatorRoutes from './coordinator.routes.js';
import coordinatorSkillRoutes from './coordinatorSkill.routes.js';
import coordinatorLanguageRoutes from './coordinatorLanguage.routes.js';
import coordinatorAssignmentRoutes from './coordinatorAssignment.routes.js';

const router = express.Router();

router.use('/coordinators', coordinatorRoutes);
router.use('/coordinatorSkills', coordinatorSkillRoutes);
router.use('/coordinatorLanguages', coordinatorLanguageRoutes);
router.use('/coordinatorAssignments', coordinatorAssignmentRoutes);

export default router;
