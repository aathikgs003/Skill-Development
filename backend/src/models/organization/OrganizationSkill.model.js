import mongoose from 'mongoose';

const organizationSkillSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }
  },
  { timestamps: true }
);

const OrganizationSkill = mongoose.model('OrganizationSkill', organizationSkillSchema);
export default OrganizationSkill;
