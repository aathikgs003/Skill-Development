import mongoose from 'mongoose';

const trainerPoolCertificationSchema = new mongoose.Schema(
  {
    pool: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainerPool', required: true }, title: { type: String, required: true }
  },
  { timestamps: true }
);

const TrainerPoolCertification = mongoose.model('TrainerPoolCertification', trainerPoolCertificationSchema);
export default TrainerPoolCertification;
