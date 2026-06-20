import mongoose from 'mongoose';

const trainerCertificationSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, title: { type: String, required: true }, issuingOrganization: { type: String, required: true }, issueDate: { type: Date, required: true }, expiryDate: { type: Date }, credentialId: { type: String }
  },
  { timestamps: true }
);

const TrainerCertification = mongoose.model('TrainerCertification', trainerCertificationSchema);
export default TrainerCertification;
