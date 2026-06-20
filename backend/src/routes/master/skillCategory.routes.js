import express from 'express';
import {
  createSkillCategory,
  getAllSkillCategorys,
  getSkillCategoryById,
  updateSkillCategory,
  deleteSkillCategory
} from '../../controllers/master/skillCategory.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createSkillCategory)
  .get(protect, getAllSkillCategorys);

router.route('/:id')
  .get(protect, getSkillCategoryById)
  .put(protect, updateSkillCategory)
  .delete(protect, deleteSkillCategory);

export default router;
