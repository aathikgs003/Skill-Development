import express from 'express';
import {
  createRegistrationWindow,
  getAllRegistrationWindows,
  getRegistrationWindowById,
  updateRegistrationWindow,
  deleteRegistrationWindow
} from '../../controllers/scheduling/registrationWindow.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createRegistrationWindow)
  .get(protect, getAllRegistrationWindows);

router.route('/:id')
  .get(protect, getRegistrationWindowById)
  .put(protect, updateRegistrationWindow)
  .delete(protect, deleteRegistrationWindow);

export default router;
