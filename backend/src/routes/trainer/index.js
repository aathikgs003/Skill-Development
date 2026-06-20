import express from 'express';
import trainerSkillRoutes from './trainerSkill.routes.js';
import trainerCertificationRoutes from './trainerCertification.routes.js';
import trainerAvailabilityRoutes from './trainerAvailability.routes.js';
import trainerAvailabilityExceptionRoutes from './trainerAvailabilityException.routes.js';
import trainerExperienceRoutes from './trainerExperience.routes.js';
import trainerDocumentRoutes from './trainerDocument.routes.js';
import teachingMaterialRoutes from './teachingMaterial.routes.js';

const router = express.Router();

router.use('/trainerSkills', trainerSkillRoutes);
router.use('/trainerCertifications', trainerCertificationRoutes);
router.use('/trainerAvailabilitys', trainerAvailabilityRoutes);
router.use('/trainerAvailabilityExceptions', trainerAvailabilityExceptionRoutes);
router.use('/trainerExperiences', trainerExperienceRoutes);
router.use('/trainerDocuments', trainerDocumentRoutes);
router.use('/teachingMaterials', teachingMaterialRoutes);

export default router;
