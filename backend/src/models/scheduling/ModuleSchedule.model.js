import mongoose from 'mongoose';

const moduleScheduleSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, module: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModule', required: true }, startDate: { type: Date }, endDate: { type: Date }
  },
  { timestamps: true }
);

const ModuleSchedule = mongoose.model('ModuleSchedule', moduleScheduleSchema);
export default ModuleSchedule;
