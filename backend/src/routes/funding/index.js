import express from 'express';
import fundingAgencyRoutes from './fundingAgency.routes.js';
import fundingProgramRoutes from './fundingProgram.routes.js';
import fundingAllocationRoutes from './fundingAllocation.routes.js';
import fundReleaseRoutes from './fundRelease.routes.js';
import fundUtilizationRoutes from './fundUtilization.routes.js';

const router = express.Router();

router.use('/fundingAgencys', fundingAgencyRoutes);
router.use('/fundingPrograms', fundingProgramRoutes);
router.use('/fundingAllocations', fundingAllocationRoutes);
router.use('/fundReleases', fundReleaseRoutes);
router.use('/fundUtilizations', fundUtilizationRoutes);

export default router;
