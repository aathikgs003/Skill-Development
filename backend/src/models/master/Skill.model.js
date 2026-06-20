import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, category: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillCategory', required: true }, description: { type: String }
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
