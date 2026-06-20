import mongoose from 'mongoose';

const studentLanguageSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true }, proficiency: { type: String, enum: ['Basic', 'Conversational', 'Fluent', 'Native'], default: 'Basic' }
  },
  { timestamps: true }
);

const StudentLanguage = mongoose.model('StudentLanguage', studentLanguageSchema);
export default StudentLanguage;
