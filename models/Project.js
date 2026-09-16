import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '/images/project-placeholder.svg' },
  category: { type: String, default: 'Web' },
  status: { type: String, default: 'Completed' },
  year: { type: String, default: '2024' },
  features: [String],
  technologies: [String],
  techStack: [String],
  githubUrl: String,
  githubLink: String,
  liveUrl: String,
  liveLink: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Sync aliases before saving
ProjectSchema.pre('save', function (next) {
  if (this.techStack && this.techStack.length && (!this.technologies || !this.technologies.length)) {
    this.technologies = this.techStack;
  } else if (this.technologies && this.technologies.length && (!this.techStack || !this.techStack.length)) {
    this.techStack = this.technologies;
  }
  if (this.githubLink && !this.githubUrl) this.githubUrl = this.githubLink;
  if (this.githubUrl && !this.githubLink) this.githubLink = this.githubUrl;
  if (this.liveLink && !this.liveUrl) this.liveUrl = this.liveLink;
  if (this.liveUrl && !this.liveLink) this.liveLink = this.liveUrl;
  next();
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);