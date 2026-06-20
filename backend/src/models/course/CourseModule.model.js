import mongoose from 'mongoose';

const courseModuleSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, title: { type: String, required: true }, description: { type: String }
  },
  { timestamps: true }
);

const CourseModule = mongoose.model('CourseModule', courseModuleSchema);
export default CourseModule;
