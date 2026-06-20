import mongoose from 'mongoose';

const studentCollegeDetailSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true }, collegeName: { type: String, required: true }, degree: { type: mongoose.Schema.Types.ObjectId, ref: 'Degree', required: true }, department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }, passingYear: { type: Number, required: true }, cgpa: { type: Number, required: true }
  },
  { timestamps: true }
);

const StudentCollegeDetail = mongoose.model('StudentCollegeDetail', studentCollegeDetailSchema);
export default StudentCollegeDetail;
