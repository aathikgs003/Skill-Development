import mongoose from 'mongoose';

const trainerRankingSchema = new mongoose.Schema(
  {
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true }, rank: { type: Number, required: true }, score: { type: Number, required: true }
  },
  { timestamps: true }
);

const TrainerRanking = mongoose.model('TrainerRanking', trainerRankingSchema);
export default TrainerRanking;
