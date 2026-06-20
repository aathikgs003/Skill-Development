import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to a User with role='Trainer'
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Refers to a User with role='Coordinator' or 'Admin'
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of student Users enrolled in this batch
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    scheduleTime: { type: String, required: true }, // e.g. "09:00 AM - 11:00 AM"
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Upcoming',
    },
  },
  { timestamps: true }
);

// Indexing for faster course/trainer lookups
batchSchema.index({ course: 1 });
batchSchema.index({ trainer: 1 });
batchSchema.index({ status: 1 });

const Batch = mongoose.model('Batch', batchSchema);
export default Batch;
