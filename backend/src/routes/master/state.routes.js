import express from 'express';
import {
  createState,
  getAllStates,
  getStateById,
  updateState,
  deleteState
} from '../../controllers/master/state.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createState)
  .get(protect, getAllStates);

router.route('/:id')
  .get(protect, getStateById)
  .put(protect, updateState)
  .delete(protect, deleteState);

export default router;
