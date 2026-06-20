import mongoose from 'mongoose';

const studentAchievementSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, title: { type: String, required: true }, description: { type: String }, achievementType: { type: String, enum: ['Award', 'Hackathon', 'Competition', 'Publication', 'Patent', 'Scholarship', 'Other'], default: 'Other' }, achievementDate: { type: Date }
  },
  { timestamps: true }
);

const StudentAchievement = mongoose.model('StudentAchievement', studentAchievementSchema);
export default StudentAchievement;
