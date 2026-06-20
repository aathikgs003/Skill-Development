import express from 'express';
import trainerPoolRoutes from './trainerPool.routes.js';
import trainerPoolSkillRoutes from './trainerPoolSkill.routes.js';
import trainerPoolCertificationRoutes from './trainerPoolCertification.routes.js';
import coordinatorPoolRoutes from './coordinatorPool.routes.js';
import coordinatorPoolLanguageRoutes from './coordinatorPoolLanguage.routes.js';
import studentPoolRoutes from './studentPool.routes.js';
import studentPoolSkillRoutes from './studentPoolSkill.routes.js';

const router = express.Router();

router.use('/trainerPools', trainerPoolRoutes);
router.use('/trainerPoolSkills', trainerPoolSkillRoutes);
router.use('/trainerPoolCertifications', trainerPoolCertificationRoutes);
router.use('/coordinatorPools', coordinatorPoolRoutes);
router.use('/coordinatorPoolLanguages', coordinatorPoolLanguageRoutes);
router.use('/studentPools', studentPoolRoutes);
router.use('/studentPoolSkills', studentPoolSkillRoutes);

export default router;
