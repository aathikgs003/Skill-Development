import mongoose from 'mongoose';

const placementSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, companyName: { type: String, required: true }, designation: { type: String, required: true }, salaryPackage: { type: Number }, placementType: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Freelance', 'Contract'], default: 'Full-time' }, placementSource: { type: String, enum: ['Campus', 'Off-Campus', 'Referral', 'Self', 'Organization-assisted'], default: 'Campus' }, placementStatus: { type: String, enum: ['Offered', 'Accepted', 'Joined', 'Declined', 'Withdrawn'], default: 'Offered' }
  },
  { timestamps: true }
);

const Placement = mongoose.model('Placement', placementSchema);
export default Placement;
