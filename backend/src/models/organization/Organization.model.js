import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, organizationName: { type: String, required: true }, organizationCode: { type: String, required: true, unique: true }, organizationType: { type: String, enum: ['Training Centre', 'College', 'Corporate', 'NGO', 'Government', 'Other'], default: 'Training Centre' }, status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;
