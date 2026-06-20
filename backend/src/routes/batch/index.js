import express from 'express';
import batchTrainerRoutes from './batchTrainer.routes.js';
import batchCoordinatorRoutes from './batchCoordinator.routes.js';
import batchSessionRoutes from './batchSession.routes.js';

const router = express.Router();

router.use('/batchTrainers', batchTrainerRoutes);
router.use('/batchCoordinators', batchCoordinatorRoutes);
router.use('/batchSessions', batchSessionRoutes);

export default router;
