import mongoose from 'mongoose';

const assessmentSubmissionSchema = new mongoose.Schema(
  {
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true }, student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, submissionStatus: { type: String, enum: ['Not Started', 'In Progress', 'Submitted', 'Evaluated', 'Re-evaluation', 'Absent'], default: 'Submitted' }, obtainedMarks: { type: Number }, isPassed: { type: Boolean }
  },
  { timestamps: true }
);

const AssessmentSubmission = mongoose.model('AssessmentSubmission', assessmentSubmissionSchema);
export default AssessmentSubmission;
