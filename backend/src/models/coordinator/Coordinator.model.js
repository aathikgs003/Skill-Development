import mongoose from 'mongoose';

const coordinatorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, coordinatorCode: { type: String, required: true, unique: true }, status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

const Coordinator = mongoose.model('Coordinator', coordinatorSchema);
export default Coordinator;
