import mongoose from 'mongoose';

const organizationSpecializationSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, specialization: { type: String, required: true }
  },
  { timestamps: true }
);

const OrganizationSpecialization = mongoose.model('OrganizationSpecialization', organizationSpecializationSchema);
export default OrganizationSpecialization;
