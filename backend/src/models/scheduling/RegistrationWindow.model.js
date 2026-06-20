import mongoose from 'mongoose';

const registrationWindowSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, openDate: { type: Date, required: true }, closeDate: { type: Date, required: true }, maxEnrollments: { type: Number }
  },
  { timestamps: true }
);

const RegistrationWindow = mongoose.model('RegistrationWindow', registrationWindowSchema);
export default RegistrationWindow;
