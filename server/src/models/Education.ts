import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  cgpa?: string;
  coursework: string[];
  description: string;
  order: number;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    cgpa: { type: String, default: '' },
    coursework: [{ type: String }],
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = mongoose.model<IEducation>('Education', EducationSchema);
