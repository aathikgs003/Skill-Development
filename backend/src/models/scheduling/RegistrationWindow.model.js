import mongoose from 'mongoose';

const registrationWindowSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner' },
    windowName: { type: String, required: true, trim: true },
    windowType: {
      type: String,
      enum: ['Course Registration', 'Batch Enrollment', 'Module Registration', 'Assessment'],
      default: 'Course Registration',
    },
    registrationStartAt: { type: Date, required: true },
    registrationEndAt: { type: Date, required: true },
    maxApplicants: { type: Number, required: true, min: 1 },
    currentApplicants: { type: Number, default: 0 },
    waitlistEnabled: { type: Boolean, default: true },
    waitlistCapacity: { type: Number, default: 10 },
    currentWaitlist: { type: Number, default: 0 },
    eligibilityCheckRequired: { type: Boolean, default: true },
    autoApproval: { type: Boolean, default: false },
    notificationEnabled: { type: Boolean, default: true },
    reminderSchedule: [
      {
        daysBefore: Number,
        sent: { type: Boolean, default: false },
        sentAt: Date,
      },
    ],
    status: {
      type: String,
      enum: ['Upcoming', 'Open', 'Closed', 'Cancelled'],
      default: 'Upcoming',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
registrationWindowSchema.index({ courseId: 1, status: 1 });
registrationWindowSchema.index({ batchId: 1 });
registrationWindowSchema.index({ organizationId: 1 });
registrationWindowSchema.index({ partnerId: 1 });
registrationWindowSchema.index({ registrationStartAt: 1 });
registrationWindowSchema.index({ registrationEndAt: 1 });

// Virtual: Is registration open right now?
registrationWindowSchema.virtual('isOpen').get(function () {
  const now = new Date();
  return (
    this.status === 'Open' &&
    now >= this.registrationStartAt &&
    now <= this.registrationEndAt &&
    this.currentApplicants < this.maxApplicants
  );
});

// Virtual: Available seats
registrationWindowSchema.virtual('availableSeats').get(function () {
  return Math.max(0, this.maxApplicants - this.currentApplicants);
});

// Validation: endAt must be after startAt
registrationWindowSchema.pre('validate', function (next) {
  if (this.registrationEndAt <= this.registrationStartAt) {
    return next(new Error('Registration end time must be after start time'));
  }
  next();
});

const RegistrationWindow = mongoose.model('RegistrationWindow', registrationWindowSchema);
export default RegistrationWindow;
