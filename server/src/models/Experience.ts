import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  companyLogo?: string;
  location?: string;
  type: string; // Full-time, Contract, Remote, etc.
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    companyLogo: { type: String, default: '' },
    location: { type: String, default: '' },
    type: { type: String, default: 'Full-time' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    achievements: [{ type: String }],
    skills: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);
