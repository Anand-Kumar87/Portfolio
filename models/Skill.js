import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Frontend, Backend, Tools, etc.
  level: { type: Number, min: 0, max: 100, default: 50 },
  icon: String,
  order: { type: Number, default: 0 },
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);