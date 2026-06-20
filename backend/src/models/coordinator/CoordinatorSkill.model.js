import mongoose from 'mongoose';

const coordinatorSkillSchema = new mongoose.Schema(
  {
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }
  },
  { timestamps: true }
);

const CoordinatorSkill = mongoose.model('CoordinatorSkill', coordinatorSkillSchema);
export default CoordinatorSkill;
