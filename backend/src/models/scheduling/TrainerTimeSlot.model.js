import mongoose from 'mongoose';

const trainerTimeSlotSchema = new mongoose.Schema(
  {
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner' },
    slotDate: { type: Date, required: true },
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    startTime: { type: String, required: true }, // "HH:mm"
    endTime: { type: String, required: true },
    durationMinutes: { type: Number },
    slotType: {
      type: String,
      enum: ['Recurring', 'One-Time', 'Blocked'],
      default: 'One-Time',
    },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'Booked', 'Tentative', 'Blocked', 'Break'],
      default: 'Available',
    },
    bookedForBatchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    bookedForSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'BatchSession' },
    bookingType: {
      type: String,
      enum: ['Training', 'Mentoring', 'Assessment', 'Doubt Clearing'],
    },
    maxStudents: { type: Number, default: 50 },
    currentStudents: { type: Number, default: 0 },
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Hybrid'],
      default: 'Online',
    },
    location: { type: String },
    meetingLink: { type: String },
    timezone: { type: String, default: 'Asia/Kolkata' },
    recurrencePattern: {
      frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly'] },
      interval: { type: Number, default: 1 },
      endDate: Date,
    },
    parentSlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainerTimeSlot' },
    cancelledAt: Date,
    cancellationReason: String,
    priority: { type: Number, default: 5 },
  },
  { timestamps: true }
);

// Indexes
trainerTimeSlotSchema.index({ trainerId: 1, slotDate: 1 });
trainerTimeSlotSchema.index({ availabilityStatus: 1 });
trainerTimeSlotSchema.index({ bookedForBatchId: 1 });
trainerTimeSlotSchema.index({ slotDate: 1, startTime: 1 });
trainerTimeSlotSchema.index({ organizationId: 1 });
trainerTimeSlotSchema.index({ partnerId: 1 });
trainerTimeSlotSchema.index({ trainerId: 1, slotDate: 1, startTime: 1, endTime: 1 }, { unique: true });

// Pre-save: calculate duration
trainerTimeSlotSchema.pre('save', function (next) {
  const [sh, sm] = this.startTime.split(':').map(Number);
  const [eh, em] = this.endTime.split(':').map(Number);
  this.durationMinutes = eh * 60 + em - (sh * 60 + sm);
  if (this.durationMinutes <= 0) return next(new Error('End time must be after start time'));
  next();
});

const TrainerTimeSlot = mongoose.model('TrainerTimeSlot', trainerTimeSlotSchema);
export default TrainerTimeSlot;
