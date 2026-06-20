import mongoose from 'mongoose';

const organizationStaffSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, role: { type: String, enum: ['Admin', 'Manager', 'Coordinator', 'Trainer', 'Support'], default: 'Support' }
  },
  { timestamps: true }
);

const OrganizationStaff = mongoose.model('OrganizationStaff', organizationStaffSchema);
export default OrganizationStaff;
