import mongoose from 'mongoose';

const implementationPartnerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, partnerName: { type: String, required: true }, partnerCode: { type: String, required: true, unique: true }, status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

const ImplementationPartner = mongoose.model('ImplementationPartner', implementationPartnerSchema);
export default ImplementationPartner;
