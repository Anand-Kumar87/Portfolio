import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  current: { type: Boolean, default: false },
  description: String,
  type: { type: String, enum: ['education', 'experience'], required: true },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);