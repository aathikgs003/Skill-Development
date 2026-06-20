import express from 'express';
import organizationRoutes from './organization.routes.js';
import organizationDomainRoutes from './organizationDomain.routes.js';
import organizationSkillRoutes from './organizationSkill.routes.js';
import organizationSpecializationRoutes from './organizationSpecialization.routes.js';
import organizationDocumentRoutes from './organizationDocument.routes.js';
import organizationStaffRoutes from './organizationStaff.routes.js';

const router = express.Router();

router.use('/organizations', organizationRoutes);
router.use('/organizationDomains', organizationDomainRoutes);
router.use('/organizationSkills', organizationSkillRoutes);
router.use('/organizationSpecializations', organizationSpecializationRoutes);
router.use('/organizationDocuments', organizationDocumentRoutes);
router.use('/organizationStaffs', organizationStaffRoutes);

export default router;
