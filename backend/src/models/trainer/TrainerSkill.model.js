import mongoose from 'mongoose';

const trainerSkillSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }, proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Beginner' }
  },
  { timestamps: true }
);

const TrainerSkill = mongoose.model('TrainerSkill', trainerSkillSchema);
export default TrainerSkill;
