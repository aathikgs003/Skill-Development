import express from 'express';
import countryRoutes from './country.routes.js';
import stateRoutes from './state.routes.js';
import districtRoutes from './district.routes.js';
import cityRoutes from './city.routes.js';
import skillCategoryRoutes from './skillCategory.routes.js';
import skillRoutes from './skill.routes.js';
import languageRoutes from './language.routes.js';
import educationTypeRoutes from './educationType.routes.js';
import courseCategoryRoutes from './courseCategory.routes.js';
import documentTypeRoutes from './documentType.routes.js';
import boardRoutes from './board.routes.js';
import universityRoutes from './university.routes.js';
import degreeRoutes from './degree.routes.js';
import departmentRoutes from './department.routes.js';
import salaryRangeRoutes from './salaryRange.routes.js';
import expenseCategoryRoutes from './expenseCategory.routes.js';

const router = express.Router();

router.use('/countrys', countryRoutes);
router.use('/states', stateRoutes);
router.use('/districts', districtRoutes);
router.use('/citys', cityRoutes);
router.use('/skillCategorys', skillCategoryRoutes);
router.use('/skills', skillRoutes);
router.use('/languages', languageRoutes);
router.use('/educationTypes', educationTypeRoutes);
router.use('/courseCategorys', courseCategoryRoutes);
router.use('/documentTypes', documentTypeRoutes);
router.use('/boards', boardRoutes);
router.use('/universitys', universityRoutes);
router.use('/degrees', degreeRoutes);
router.use('/departments', departmentRoutes);
router.use('/salaryRanges', salaryRangeRoutes);
router.use('/expenseCategorys', expenseCategoryRoutes);

export default router;
