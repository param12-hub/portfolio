import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string; // Frontend, Backend, DevOps, AI, Database, Design
  proficiency: number; // 0 - 100
  level: string; // Expert, Advanced, Intermediate
  icon: string;
  color: string;
  featured: boolean;
  order: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    level: { type: String, default: 'Advanced' },
    icon: { type: String, default: 'Code' },
    color: { type: String, default: '#6366f1' },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
