import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  issuer: String,
  credentialUrl: String,
  icon: String,
  order: { type: Number, default: 0 },
});

export default mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);