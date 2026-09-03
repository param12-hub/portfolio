import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  summary: string;
  story: string;
  profileImage: string;
  coreValues: { title: string; desc: string }[];
  highlights: string[];
}

const AboutSchema = new Schema<IAbout>(
  {
    summary: { type: String, required: true },
    story: { type: String, required: true },
    profileImage: { type: String, default: '' },
    coreValues: [{ title: String, desc: String }],
    highlights: [{ type: String }],
  },
  { timestamps: true }
);

export const About = mongoose.model<IAbout>('About', AboutSchema);
