import mongoose from 'mongoose';

const courseTopicSchema = new mongoose.Schema(
  {
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModule', required: true }, title: { type: String, required: true }, description: { type: String }, durationMinutes: { type: Number, default: 60 }
  },
  { timestamps: true }
);

const CourseTopic = mongoose.model('CourseTopic', courseTopicSchema);
export default CourseTopic;
