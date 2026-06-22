import Trainer from '../../models/trainer/Trainer.js';
import TrainerSkill from '../../models/trainer/TrainerSkill.model.js';
import TrainerTimeSlot from '../../models/scheduling/TrainerTimeSlot.model.js';
import ModuleSchedule from '../../models/scheduling/ModuleSchedule.model.js';
import CourseSkillCovered from '../../models/course/CourseSkillCovered.model.js';
import Organization from '../../models/organization/Organization.model.js';
import ImplementationPartner from '../../models/partner/ImplementationPartner.model.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';
import ApiError from '../../utils/apiError.js';

// Resolve tenant scopes for multi-tenancy
const getTenantQuery = async (user) => {
  if (!user) return {};
  const query = {};
  if (user.role === 'Organization') {
    const org = await Organization.findOne({ user: user._id });
    if (org) query.organizationId = org._id;
  } else if (user.role === 'Partner') {
    const partner = await ImplementationPartner.findOne({ user: user._id });
    if (partner) query.partnerId = partner._id;
  }
  return query;
};

// Internal function to calculate recommendations
const calculateTrainerRecommendations = async (moduleScheduleId, user) => {
  const moduleSchedule = await ModuleSchedule.findById(moduleScheduleId)
    .populate('moduleId')
    .populate('courseId');
  if (!moduleSchedule) throw new ApiError(404, 'Module schedule not found');

  const {
    courseId,
    daysOfWeek,
    preferredTimeSlot,
    plannedStartDate,
    plannedEndDate,
  } = moduleSchedule;

  // Step 1: Get required skills from CourseSkillCovered
  const skillCoveredDocs = await CourseSkillCovered.find({ course: courseId });
  const requiredSkills = skillCoveredDocs.map((s) => s.skill.toString());

  // Step 2: Find trainer skills
  const trainerSkillsQuery = {};
  if (requiredSkills.length > 0) {
    trainerSkillsQuery.skill = { $in: requiredSkills };
  }

  const trainerSkills = await TrainerSkill.find(trainerSkillsQuery)
    .populate({
      path: 'trainer',
      populate: { path: 'user', select: 'firstName lastName email' }
    });

  const trainerMap = {};
  trainerSkills.forEach((ts) => {
    if (!ts.trainer) return;
    const tid = ts.trainer._id.toString();
    if (!trainerMap[tid]) {
      trainerMap[tid] = { trainer: ts.trainer, skillMatchCount: 0 };
    }
    trainerMap[tid].skillMatchCount += 1;
  });

  // If no trainers match the skills, fallback to all active trainers in the tenant
  if (Object.keys(trainerMap).length === 0) {
    const tenantFilter = await getTenantQuery(user);
    // Find trainers (we can scope if trainer model holds tenant info, otherwise fetch all)
    const allTrainers = await Trainer.find().populate('user', 'firstName lastName email');
    allTrainers.forEach((t) => {
      const tid = t._id.toString();
      trainerMap[tid] = { trainer: t, skillMatchCount: 0 };
    });
  }

  // Step 3: Check availability and score each trainer candidate
  const candidates = [];
  for (const tid of Object.keys(trainerMap)) {
    const { trainer, skillMatchCount } = trainerMap[tid];

    // Find available slots in date range matching days & times
    const availableSlots = await TrainerTimeSlot.find({
      trainerId: tid,
      slotDate: { $gte: plannedStartDate, $lte: plannedEndDate },
      dayOfWeek: { $in: daysOfWeek },
      startTime: { $lte: preferredTimeSlot.startTime },
      endTime: { $gte: preferredTimeSlot.endTime },
      availabilityStatus: 'Available',
    });

    if (availableSlots.length === 0) continue;

    // Score calculation
    const skillScore = requiredSkills.length > 0 ? (skillMatchCount / requiredSkills.length) * 40 : 40;
    const availabilityScore = Math.min(30, (availableSlots.length / 10) * 30);
    const ratingScore = (trainer.rating || 5) * 4; // 5 * 4 = 20
    const costScore = trainer.hourlyRate
      ? Math.max(0, 10 - trainer.hourlyRate / 100)
      : 10;

    const overallScore = skillScore + availabilityScore + ratingScore + costScore;

    candidates.push({
      trainerId: tid,
      trainerName: `${trainer.user?.firstName || ''} ${trainer.user?.lastName || ''}`.trim() || 'Unnamed Trainer',
      skillMatchCount,
      availableSlotsCount: availableSlots.length,
      availableSlots: availableSlots.map((s) => s._id),
      rating: trainer.rating || 5,
      hourlyRate: trainer.hourlyRate || 0,
      scores: {
        skillScore: parseFloat(skillScore.toFixed(2)),
        availabilityScore: parseFloat(availabilityScore.toFixed(2)),
        ratingScore: parseFloat(ratingScore.toFixed(2)),
        costScore: parseFloat(costScore.toFixed(2)),
      },
      overallScore: parseFloat(overallScore.toFixed(2)),
    });
  }

  // Sort by overall score descending
  candidates.sort((a, b) => b.overallScore - a.overallScore);

  return { candidates, moduleSchedule };
};

/**
 * Auto-allocate trainer to a module schedule based on score ranking
 */
export const autoAllocateTrainer = asyncHandler(async (req, res) => {
  const { moduleScheduleId } = req.params;

  const { candidates, moduleSchedule } = await calculateTrainerRecommendations(moduleScheduleId, req.user);

  if (candidates.length === 0) {
    throw new ApiError(404, 'No suitable trainer found with available slots for this module schedule');
  }

  // Auto-assign top trainer
  const topCandidate = candidates[0];
  moduleSchedule.assignedTrainerId = topCandidate.trainerId;
  moduleSchedule.backupTrainerId = candidates[1]?.trainerId || null;
  moduleSchedule.scheduleStatus = 'Scheduled';
  await moduleSchedule.save();

  // Book the slots
  await TrainerTimeSlot.updateMany(
    { _id: { $in: topCandidate.availableSlots } },
    {
      availabilityStatus: 'Booked',
      bookedForBatchId: moduleSchedule.batchId,
      bookingType: 'Training',
    }
  );

  res.status(200).json(
    new ApiResponse(
      200,
      {
        assignedTrainer: topCandidate,
        allCandidates: candidates.slice(0, 5),
      },
      'Trainer auto-allocated successfully'
    )
  );
});

/**
 * Get trainer recommendations (without auto-assigning)
 */
export const getTrainerRecommendations = asyncHandler(async (req, res) => {
  const { moduleScheduleId } = req.params;
  const { candidates } = await calculateTrainerRecommendations(moduleScheduleId, req.user);
  res.status(200).json(new ApiResponse(200, candidates, 'Recommendations fetched successfully'));
});
