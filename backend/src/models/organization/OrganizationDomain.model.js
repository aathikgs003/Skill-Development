import mongoose from 'mongoose';

const organizationDomainSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, domain: { type: String, required: true }
  },
  { timestamps: true }
);

const OrganizationDomain = mongoose.model('OrganizationDomain', organizationDomainSchema);
export default OrganizationDomain;
