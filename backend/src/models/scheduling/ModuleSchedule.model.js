import mongoose from 'mongoose';

const moduleScheduleSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModule', required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner' },
    moduleName: { type: String, required: true },
    moduleOrder: { type: Number, required: true },
    plannedStartDate: { type: Date, required: true },
    plannedEndDate: { type: Date, required: true },
    actualStartDate: Date,
    actualEndDate: Date,
    totalHours: { type: Number, required: true },
    completedHours: { type: Number, default: 0 },
    assignedTrainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    backupTrainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    sessionFrequency: {
      type: String,
      enum: ['Daily', 'Alternate Days', 'Weekly', 'Custom'],
      default: 'Weekly',
    },
    sessionsPerWeek: { type: Number, default: 3 },
    sessionDurationMinutes: { type: Number, default: 120 },
    preferredTimeSlot: {
      startTime: String,
      endTime: String,
    },
    daysOfWeek: [
      {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
    ],
    totalSessionsPlanned: { type: Number },
    completedSessions: { type: Number, default: 0 },
    progressPct: { type: Number, default: 0 },
    scheduleStatus: {
      type: String,
      enum: ['Planned', 'Scheduled', 'In Progress', 'Completed', 'Delayed', 'Cancelled'],
      default: 'Planned',
    },
    delayReason: String,
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

moduleScheduleSchema.index({ courseId: 1, batchId: 1 });
moduleScheduleSchema.index({ moduleId: 1 });
moduleScheduleSchema.index({ assignedTrainerId: 1 });
moduleScheduleSchema.index({ scheduleStatus: 1 });
moduleScheduleSchema.index({ organizationId: 1 });
moduleScheduleSchema.index({ partnerId: 1 });

// Auto-calculate progress
moduleScheduleSchema.pre('save', function (next) {
  if (this.totalSessionsPlanned > 0) {
    this.progressPct = Math.round((this.completedSessions / this.totalSessionsPlanned) * 100);
  }
  next();
});

const ModuleSchedule = mongoose.model('ModuleSchedule', moduleScheduleSchema);
export default ModuleSchedule;
