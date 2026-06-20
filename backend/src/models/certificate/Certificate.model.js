import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, certificateNumber: { type: String, required: true, unique: true }, issueDate: { type: Date, default: Date.now }, verificationHash: { type: String, required: true }, status: { type: String, enum: ['Generated', 'Approved', 'Issued', 'Revoked', 'Expired'], default: 'Generated' }
  },
  { timestamps: true }
);

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
