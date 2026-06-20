import express from 'express';
import {
  createOrganizationSkill,
  getAllOrganizationSkills,
  getOrganizationSkillById,
  updateOrganizationSkill,
  deleteOrganizationSkill
} from '../../controllers/organization/organizationSkill.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrganizationSkill)
  .get(protect, getAllOrganizationSkills);

router.route('/:id')
  .get(protect, getOrganizationSkillById)
  .put(protect, updateOrganizationSkill)
  .delete(protect, deleteOrganizationSkill);

export default router;
