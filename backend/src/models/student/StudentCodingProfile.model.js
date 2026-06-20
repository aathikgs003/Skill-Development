import mongoose from 'mongoose';

const studentCodingProfileSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, platform: { type: String, enum: ['GitHub', 'LeetCode', 'HackerRank', 'CodeChef', 'Codeforces', 'GeeksforGeeks', 'Other'], required: true }, username: { type: String, required: true }, profileUrl: { type: String }
  },
  { timestamps: true }
);

const StudentCodingProfile = mongoose.model('StudentCodingProfile', studentCodingProfileSchema);
export default StudentCodingProfile;
