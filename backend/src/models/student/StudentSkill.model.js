import mongoose from 'mongoose';

const studentSkillSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }, proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Beginner' }
  },
  { timestamps: true }
);

const StudentSkill = mongoose.model('StudentSkill', studentSkillSchema);
export default StudentSkill;
