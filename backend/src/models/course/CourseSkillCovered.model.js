import mongoose from 'mongoose';

const courseSkillCoveredSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }
  },
  { timestamps: true }
);

const CourseSkillCovered = mongoose.model('CourseSkillCovered', courseSkillCoveredSchema);
export default CourseSkillCovered;
