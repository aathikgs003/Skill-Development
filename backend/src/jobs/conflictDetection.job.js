import TrainerTimeSlot from '../models/scheduling/TrainerTimeSlot.model.js';
import ScheduleConflict from '../models/scheduling/ScheduleConflict.model.js';
import logger from '../config/logger.js';

export const detectScheduleConflicts = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find trainers with booked slots starting from today
    const slots = await TrainerTimeSlot.find({
      availabilityStatus: 'Booked',
      slotDate: { $gte: today },
    }).sort({ trainerId: 1, slotDate: 1, startTime: 1 });

    // Group slots by trainer + date
    const grouped = {};
    for (const slot of slots) {
      const dateStr = slot.slotDate.toISOString().split('T')[0];
      const key = `${slot.trainerId.toString()}_${dateStr}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(slot);
    }

    let conflictsFound = 0;

    for (const key of Object.keys(grouped)) {
      const daySlots = grouped[key];
      for (let i = 0; i < daySlots.length - 1; i++) {
        for (let j = i + 1; j < daySlots.length; j++) {
          const a = daySlots[i];
          const b = daySlots[j];

          // Check overlap: (a.startTime < b.endTime) && (a.endTime > b.startTime)
          if (a.startTime < b.endTime && a.endTime > b.startTime) {
            // Overlap detected
            const existing = await ScheduleConflict.findOne({
              entityType: 'Trainer',
              entityId: a.trainerId,
              conflictDate: a.slotDate,
              conflictWith: { $all: [a._id, b._id] },
            });

            if (!existing) {
              await ScheduleConflict.create({
                entityType: 'Trainer',
                entityId: a.trainerId,
                organizationId: a.organizationId,
                partnerId: a.partnerId,
                conflictType: 'Double Booking',
                conflictWith: [a._id, b._id],
                conflictDate: a.slotDate,
                startTime: a.startTime,
                endTime: b.endTime,
                severity: 'High',
              });
              conflictsFound++;
            }
          }
        }
      }
    }

    if (conflictsFound > 0) {
      logger.warn(`⚠️ Detected ${conflictsFound} new trainer schedule conflicts`);
    }
  } catch (error) {
    logger.error(`❌ Error detecting conflicts: ${error.message}`);
  }
};
