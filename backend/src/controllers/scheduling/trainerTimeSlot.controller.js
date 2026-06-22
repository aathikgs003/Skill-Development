import TrainerTimeSlot from '../../models/scheduling/TrainerTimeSlot.model.js';
import Trainer from '../../models/trainer/Trainer.js';
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

// Helper: Check if slot overlaps with existing slot for same trainer
const checkSlotOverlap = async (trainerId, slotDate, startTime, endTime, excludeSlotId = null) => {
  const query = {
    trainerId,
    slotDate: new Date(slotDate),
    availabilityStatus: { $ne: 'Blocked' },
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
    ],
  };

  if (excludeSlotId) {
    query._id = { $ne: excludeSlotId };
  }

  const existingConflict = await TrainerTimeSlot.findOne(query);
  return existingConflict;
};

// CREATE time slots (supports single and recurring slots creation)
export const createTimeSlot = asyncHandler(async (req, res) => {
  const {
    trainerId,
    slotDate,
    dayOfWeek,
    startTime,
    endTime,
    slotType,
    recurrencePattern,
    mode,
    maxStudents,
  } = req.body;

  // Verify trainer exists
  const trainer = await Trainer.findById(trainerId);
  if (!trainer) {
    throw new ApiError(404, 'Trainer not found');
  }

  const tenant = await getTenantQuery(req.user);

  // If recurring, build multiple slots
  if (slotType === 'Recurring' && recurrencePattern) {
    const endDate = new Date(recurrencePattern.endDate);
    let current = new Date(slotDate);
    const slotsToCreate = [];

    while (current <= endDate) {
      // Format day of week for validation/checks
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayName = days[current.getDay()];

      if (currentDayName === dayOfWeek) {
        // Check conflict first
        const overlap = await checkSlotOverlap(trainerId, current, startTime, endTime);
        if (overlap) {
          throw new ApiError(409, `Time slot conflict detected on date: ${current.toLocaleDateString()} at ${startTime}-${endTime}`);
        }

        slotsToCreate.push({
          trainerId,
          ...tenant,
          slotDate: new Date(current),
          dayOfWeek,
          startTime,
          endTime,
          slotType,
          mode,
          maxStudents,
          recurrencePattern,
        });
      }

      // Increment by 1 day
      current.setDate(current.getDate() + 1);
    }

    if (slotsToCreate.length === 0) {
      throw new ApiError(400, 'No slots generated. Check if the start date and day of week match.');
    }

    const createdSlots = await TrainerTimeSlot.insertMany(slotsToCreate);
    return res.status(201).json(new ApiResponse(201, createdSlots, `${createdSlots.length} recurring slots created successfully`));
  }

  // Single Slot Creation
  const overlap = await checkSlotOverlap(trainerId, slotDate, startTime, endTime);
  if (overlap) {
    throw new ApiError(409, `Time slot conflicts with existing slot on ${new Date(slotDate).toLocaleDateString()}`);
  }

  const slot = await TrainerTimeSlot.create({
    trainerId,
    ...tenant,
    slotDate: new Date(slotDate),
    dayOfWeek,
    startTime,
    endTime,
    slotType,
    mode,
    maxStudents,
  });

  res.status(201).json(new ApiResponse(201, slot, 'Time slot created successfully'));
});

// GET trainer's slots
export const getAvailableSlots = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;
  const { startDate, endDate, availabilityStatus } = req.query;

  const filter = { trainerId };

  if (availabilityStatus) {
    filter.availabilityStatus = availabilityStatus;
  }

  if (startDate || endDate) {
    filter.slotDate = {};
    if (startDate) filter.slotDate.$gte = new Date(startDate);
    if (endDate) filter.slotDate.$lte = new Date(endDate);
  }

  const slots = await TrainerTimeSlot.find(filter)
    .populate({
      path: 'trainerId',
      populate: { path: 'user', select: 'firstName lastName email mobile' }
    })
    .sort({ slotDate: 1, startTime: 1 });

  res.status(200).json(new ApiResponse(200, slots, 'Trainer slots fetched successfully'));
});

// GET slot by ID
export const getTimeSlotById = asyncHandler(async (req, res) => {
  const slot = await TrainerTimeSlot.findById(req.params.id)
    .populate({
      path: 'trainerId',
      populate: { path: 'user', select: 'firstName lastName email' }
    })
    .populate('bookedForBatchId', 'name startDate endDate')
    .populate('bookedForSessionId');

  if (!slot) {
    throw new ApiError(404, 'Time slot not found');
  }

  res.status(200).json(new ApiResponse(200, slot, 'Time slot fetched successfully'));
});

// UPDATE trainer time slot
export const updateTimeSlot = asyncHandler(async (req, res) => {
  const slot = await TrainerTimeSlot.findById(req.params.id);
  if (!slot) {
    throw new ApiError(404, 'Time slot not found');
  }

  const { slotDate, startTime, endTime, maxStudents, mode } = req.body;

  if (slotDate || startTime || endTime) {
    const checkDate = slotDate ? new Date(slotDate) : slot.slotDate;
    const checkStart = startTime || slot.startTime;
    const checkEnd = endTime || slot.endTime;

    const overlap = await checkSlotOverlap(slot.trainerId, checkDate, checkStart, checkEnd, slot._id);
    if (overlap) {
      throw new ApiError(409, 'Updating slot results in overlap conflicts');
    }
  }

  const updatedSlot = await TrainerTimeSlot.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, updatedSlot, 'Time slot updated successfully'));
});

// BOOK trainer slot for a batch session
export const bookSlot = asyncHandler(async (req, res) => {
  const { slotId } = req.params;
  const { batchId, sessionId, bookingType } = req.body;

  const slot = await TrainerTimeSlot.findById(slotId);
  if (!slot) throw new ApiError(404, 'Slot not found');

  if (slot.availabilityStatus !== 'Available') {
    throw new ApiError(400, `Slot is not available. Status is: ${slot.availabilityStatus}`);
  }

  slot.availabilityStatus = 'Booked';
  slot.bookedForBatchId = batchId;
  slot.bookedForSessionId = sessionId;
  slot.bookingType = bookingType;
  await slot.save();

  res.status(200).json(new ApiResponse(200, slot, 'Slot booked successfully'));
});

// CANCEL/BLOCK slot
export const cancelSlot = asyncHandler(async (req, res) => {
  const { slotId } = req.params;
  const { reason } = req.body;

  const slot = await TrainerTimeSlot.findById(slotId);
  if (!slot) throw new ApiError(404, 'Slot not found');

  slot.availabilityStatus = 'Blocked';
  slot.cancelledAt = new Date();
  slot.cancellationReason = reason || 'Cancelled by Trainer/Coordinator';
  await slot.save();

  res.status(200).json(new ApiResponse(200, slot, 'Slot cancelled/blocked successfully'));
});

// DELETE slot
export const deleteTimeSlot = asyncHandler(async (req, res) => {
  const slot = await TrainerTimeSlot.findByIdAndDelete(req.params.id);
  if (!slot) {
    throw new ApiError(404, 'Time slot not found');
  }
  res.status(200).json(new ApiResponse(200, null, 'Time slot deleted successfully'));
});
