import mongoose from 'mongoose';

const scheduleConflictSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ['Trainer', 'Student', 'Coordinator', 'Venue'],
      required: true,
    },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner' },
    conflictType: {
      type: String,
      enum: ['Double Booking', 'Overlap', 'Outside Availability', 'Capacity Exceeded'],
      required: true,
    },
    conflictWith: [{ type: mongoose.Schema.Types.ObjectId }],
    conflictDate: { type: Date, required: true },
    startTime: String,
    endTime: String,
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    resolutionStatus: {
      type: String,
      enum: ['Pending', 'Resolved', 'Ignored'],
      default: 'Pending',
    },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: Date,
    resolutionAction: String,
    detectedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

scheduleConflictSchema.index({ entityType: 1, entityId: 1 });
scheduleConflictSchema.index({ conflictDate: 1 });
scheduleConflictSchema.index({ resolutionStatus: 1 });
scheduleConflictSchema.index({ organizationId: 1 });
scheduleConflictSchema.index({ partnerId: 1 });

const ScheduleConflict = mongoose.model('ScheduleConflict', scheduleConflictSchema);
export default ScheduleConflict;
