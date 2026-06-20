import mongoose from 'mongoose';

const certificateVerificationLogSchema = new mongoose.Schema(
  {
    certificate: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate', required: true }, verifiedAt: { type: Date, default: Date.now }, verifiedIp: { type: String }
  },
  { timestamps: true }
);

const CertificateVerificationLog = mongoose.model('CertificateVerificationLog', certificateVerificationLogSchema);
export default CertificateVerificationLog;
