import mongoose from 'mongoose';

const studentEmploymentDetailSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, companyName: { type: String, required: true }, designation: { type: String, required: true }, startDate: { type: Date, required: true }, endDate: { type: Date }, currentEmployment: { type: Boolean, default: false }, salaryRange: { type: mongoose.Schema.Types.ObjectId, ref: 'SalaryRange' }
  },
  { timestamps: true }
);

const StudentEmploymentDetail = mongoose.model('StudentEmploymentDetail', studentEmploymentDetailSchema);
export default StudentEmploymentDetail;
