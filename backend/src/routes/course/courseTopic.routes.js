import express from 'express';
import {
  createCourseTopic,
  getAllCourseTopics,
  getCourseTopicById,
  updateCourseTopic,
  deleteCourseTopic
} from '../../controllers/course/courseTopic.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createCourseTopic)
  .get(protect, getAllCourseTopics);

router.route('/:id')
  .get(protect, getCourseTopicById)
  .put(protect, updateCourseTopic)
  .delete(protect, deleteCourseTopic);

export default router;
