import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  greeting: string;
  name: string;
  titles: string[];
  bio: string;
  availability: string;
  yearsOfExp: string;
  projectsCompleted: string;
  happyClients: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

const HeroSchema = new Schema<IHero>(
  {
    greeting: { type: String, default: "Hello, I'm" },
    name: { type: String, required: true },
    titles: [{ type: String }],
    bio: { type: String, required: true },
    availability: { type: String, default: 'Available for New Opportunities' },
    yearsOfExp: { type: String, default: '5+' },
    projectsCompleted: { type: String, default: '30+' },
    happyClients: { type: String, default: '20+' },
    resumeUrl: { type: String, default: '/resume.pdf' },
    githubUrl: { type: String, default: 'https://github.com' },
    linkedinUrl: { type: String, default: 'https://linkedin.com' },
    twitterUrl: { type: String, default: 'https://twitter.com' },
  },
  { timestamps: true }
);

export const Hero = mongoose.model<IHero>('Hero', HeroSchema);
