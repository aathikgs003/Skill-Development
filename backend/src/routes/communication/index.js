import express from 'express';
import messageRoutes from './message.routes.js';
import announcementRoutes from './announcement.routes.js';

const router = express.Router();

router.use('/messages', messageRoutes);
router.use('/announcements', announcementRoutes);

export default router;
