import mongoose from 'mongoose';

const coursePerformanceSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, avgScore: { type: Number, required: true }
  },
  { timestamps: true }
);

const CoursePerformance = mongoose.model('CoursePerformance', coursePerformanceSchema);
export default CoursePerformance;
