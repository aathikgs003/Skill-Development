import mongoose from 'mongoose';

const studentInterestedSkillSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }
  },
  { timestamps: true }
);

const StudentInterestedSkill = mongoose.model('StudentInterestedSkill', studentInterestedSkillSchema);
export default StudentInterestedSkill;
