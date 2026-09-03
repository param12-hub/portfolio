import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  features: string[];
  timeline: string;
  priceRange?: string;
  order: number;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Layout' },
    features: [{ type: String }],
    timeline: { type: String, default: '2-4 weeks' },
    priceRange: { type: String, default: 'Custom Quote' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
