import express from 'express';
import {
  createRegistrationWindow,
  getAllRegistrationWindows,
  getRegistrationWindowById,
  updateRegistrationWindow,
  deleteRegistrationWindow,
  getOpenWindows,
  registerForWindow,
  closeWindow,
} from '../../controllers/scheduling/registrationWindow.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/rbac.middleware.js';

const router = express.Router();

// Public/Student routes (but authenticated)
router.get('/open', authMiddleware, getOpenWindows);
router.post('/:windowId/register', authMiddleware, authorizeRoles('Student'), registerForWindow);

// Manager/Admin/IP routes
router.use(authMiddleware);

router.route('/')
  .post(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), createRegistrationWindow)
  .get(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'), getAllRegistrationWindows);

router.patch('/:windowId/close', authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), closeWindow);

router.route('/:id')
  .get(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'), getRegistrationWindowById)
  .put(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), updateRegistrationWindow)
  .delete(authorizeRoles('SuperAdmin', 'Admin', 'Partner', 'Organization'), deleteRegistrationWindow);

export default router;
