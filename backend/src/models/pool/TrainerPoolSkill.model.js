import mongoose from 'mongoose';

const trainerPoolSkillSchema = new mongoose.Schema(
  {
    pool: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainerPool', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }
  },
  { timestamps: true }
);

const TrainerPoolSkill = mongoose.model('TrainerPoolSkill', trainerPoolSkillSchema);
export default TrainerPoolSkill;
