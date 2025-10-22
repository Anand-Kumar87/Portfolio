import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  profileImage: String,
  name: String,
  profession: String,
  tagline: String,
  resumeUrl: String,
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.About || mongoose.model('About', AboutSchema);