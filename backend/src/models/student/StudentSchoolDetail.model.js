import mongoose from 'mongoose';

const studentSchoolDetailSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }, schoolName: { type: String, required: true }, passingYear: { type: Number, required: true }, percentage: { type: Number, required: true }
  },
  { timestamps: true }
);

const StudentSchoolDetail = mongoose.model('StudentSchoolDetail', studentSchoolDetailSchema);
export default StudentSchoolDetail;
