import express from 'express';
import coursePrerequisiteSkillRoutes from './coursePrerequisiteSkill.routes.js';
import courseSkillCoveredRoutes from './courseSkillCovered.routes.js';
import courseModuleRoutes from './courseModule.routes.js';
import courseTopicRoutes from './courseTopic.routes.js';

const router = express.Router();

router.use('/coursePrerequisiteSkills', coursePrerequisiteSkillRoutes);
router.use('/courseSkillCovereds', courseSkillCoveredRoutes);
router.use('/courseModules', courseModuleRoutes);
router.use('/courseTopics', courseTopicRoutes);

export default router;
