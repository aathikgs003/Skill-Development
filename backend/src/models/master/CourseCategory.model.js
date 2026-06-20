import mongoose from 'mongoose';

const courseCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, description: { type: String }
  },
  { timestamps: true }
);

const CourseCategory = mongoose.model('CourseCategory', courseCategorySchema);
export default CourseCategory;
