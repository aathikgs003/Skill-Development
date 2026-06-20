import mongoose from 'mongoose';

const studentPoolSkillSchema = new mongoose.Schema(
  {
    pool: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentPool', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }
  },
  { timestamps: true }
);

const StudentPoolSkill = mongoose.model('StudentPoolSkill', studentPoolSkillSchema);
export default StudentPoolSkill;
