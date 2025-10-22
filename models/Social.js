import mongoose from 'mongoose';

const SocialSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: String,
  order: { type: Number, default: 0 },
});

export default mongoose.models.Social || mongoose.model('Social', SocialSchema);