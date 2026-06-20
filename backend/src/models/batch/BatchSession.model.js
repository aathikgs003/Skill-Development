import mongoose from 'mongoose';

const batchSessionSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, title: { type: String, required: true }, description: { type: String }, sessionType: { type: String, enum: ['Theory', 'Practical', 'Lab', 'Assessment', 'Doubt Session', 'Guest Lecture'], default: 'Theory' }, trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, startTime: { type: Date, required: true }, endTime: { type: Date, required: true }, status: { type: String, enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled', 'Postponed', 'Rescheduled'], default: 'Scheduled' }
  },
  { timestamps: true }
);

const BatchSession = mongoose.model('BatchSession', batchSessionSchema);
export default BatchSession;
