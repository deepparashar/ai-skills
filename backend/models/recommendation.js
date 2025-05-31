// models/Recommendation.js
import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skills: [String],
  interests: [String],
  goals: String,
  recommendations: String, // AI generated
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Recommendation', recommendationSchema);
