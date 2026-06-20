import mongoose from 'mongoose';

const scheduleConflictSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, conflictDetails: { type: String, required: true }, resolved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const ScheduleConflict = mongoose.model('ScheduleConflict', scheduleConflictSchema);
export default ScheduleConflict;
