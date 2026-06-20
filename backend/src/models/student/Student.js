import mongoose from 'mongoose';

const schoolDetailSchema = new mongoose.Schema({
  board: { type: String, required: true },
  schoolName: { type: String, required: true },
  passingYear: { type: Number, required: true },
  percentage: { type: Number, required: true },
});

const collegeDetailSchema = new mongoose.Schema({
  university: { type: String, required: true },
  collegeName: { type: String, required: true },
  degree: { type: String, required: true },
  department: { type: String, required: true },
  passingYear: { type: Number, required: true },
  cgpa: { type: Number, required: true },
});

const employmentDetailSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  designation: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  currentEmployment: { type: Boolean, default: false },
  salaryRange: { type: String },
});

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuingOrganization: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date },
  credentialId: { type: String },
  credentialUrl: { type: String },
});

const studentDocumentSchema = new mongoose.Schema({
  documentType: { type: String, required: true },
  documentUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    educationLevel: {
      type: String,
      enum: ['HighSchool', 'Intermediate', 'Graduate', 'PostGraduate', 'Doctorate'],
      required: true,
    },
    skills: [{ type: String }],
    schoolDetail: schoolDetailSchema,
    collegeDetail: collegeDetailSchema,
    employmentHistory: [employmentDetailSchema],
    certifications: [certificationSchema],
    documents: [studentDocumentSchema],
    guardianName: { type: String, required: true },
    guardianMobile: { type: String, required: true },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;
