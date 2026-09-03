import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  techStack: string[];
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  metrics?: { label: string; value: string }[];
  timeline?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, default: 'Full-Stack' },
    tags: [{ type: String }],
    techStack: [{ type: String }],
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    videoUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    metrics: [{ label: String, value: String }],
    timeline: { type: String, default: '' },
  },
  { timestamps: true }
);

ProjectSchema.index({ featured: -1, order: 1 });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
