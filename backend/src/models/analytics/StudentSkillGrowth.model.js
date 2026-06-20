import mongoose from 'mongoose';

const studentSkillGrowthSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }, initialProficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }, currentProficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
  },
  { timestamps: true }
);

const StudentSkillGrowth = mongoose.model('StudentSkillGrowth', studentSkillGrowthSchema);
export default StudentSkillGrowth;
