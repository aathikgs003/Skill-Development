import mongoose from 'mongoose';

const studentCertificationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, title: { type: String, required: true }, issuingOrganization: { type: String, required: true }, issueDate: { type: Date, required: true }, expiryDate: { type: Date }, credentialId: { type: String }, credentialUrl: { type: String }
  },
  { timestamps: true }
);

const StudentCertification = mongoose.model('StudentCertification', studentCertificationSchema);
export default StudentCertification;
