import express from 'express';
import studentSchoolDetailRoutes from './studentSchoolDetail.routes.js';
import studentCollegeDetailRoutes from './studentCollegeDetail.routes.js';
import studentEmploymentDetailRoutes from './studentEmploymentDetail.routes.js';
import studentUnemployedDetailRoutes from './studentUnemployedDetail.routes.js';
import studentSkillRoutes from './studentSkill.routes.js';
import studentInterestedSkillRoutes from './studentInterestedSkill.routes.js';
import studentCodingProfileRoutes from './studentCodingProfile.routes.js';
import studentLanguageRoutes from './studentLanguage.routes.js';
import studentCertificationRoutes from './studentCertification.routes.js';
import studentAchievementRoutes from './studentAchievement.routes.js';
import studentDocumentRoutes from './studentDocument.routes.js';

const router = express.Router();

router.use('/studentSchoolDetails', studentSchoolDetailRoutes);
router.use('/studentCollegeDetails', studentCollegeDetailRoutes);
router.use('/studentEmploymentDetails', studentEmploymentDetailRoutes);
router.use('/studentUnemployedDetails', studentUnemployedDetailRoutes);
router.use('/studentSkills', studentSkillRoutes);
router.use('/studentInterestedSkills', studentInterestedSkillRoutes);
router.use('/studentCodingProfiles', studentCodingProfileRoutes);
router.use('/studentLanguages', studentLanguageRoutes);
router.use('/studentCertifications', studentCertificationRoutes);
router.use('/studentAchievements', studentAchievementRoutes);
router.use('/studentDocuments', studentDocumentRoutes);

export default router;
