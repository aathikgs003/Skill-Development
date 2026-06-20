import mongoose from 'mongoose';

const coursePrerequisiteSkillSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }
  },
  { timestamps: true }
);

const CoursePrerequisiteSkill = mongoose.model('CoursePrerequisiteSkill', coursePrerequisiteSkillSchema);
export default CoursePrerequisiteSkill;
