import express from 'express';
import {
  createCoordinatorAssignment,
  getAllCoordinatorAssignments,
  getCoordinatorAssignmentById,
  updateCoordinatorAssignment,
  deleteCoordinatorAssignment
} from '../../controllers/coordinator/coordinatorAssignment.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCoordinatorAssignment)
  .get(protect, getAllCoordinatorAssignments);

router.route('/:id')
  .get(protect, getCoordinatorAssignmentById)
  .put(protect, updateCoordinatorAssignment)
  .delete(protect, deleteCoordinatorAssignment);

export default router;
