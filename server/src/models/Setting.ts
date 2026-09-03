import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  author: string;
  contactEmail: string;
  location: string;
  soundEffects: boolean;
  maintenanceMode: boolean;
  socialLinks: { platform: string; url: string }[];
}

const SettingSchema = new Schema<ISetting>(
  {
    siteTitle: { type: String, default: 'Luxury Full-Stack Portfolio & CMS' },
    siteDescription: { type: String, default: 'Production-grade software engineer portfolio built with React 19, TypeScript & Node.js' },
    keywords: [{ type: String }],
    author: { type: String, default: 'Paramesh Rajuri' },
    contactEmail: { type: String, default: 'parameshrajuri@gmail.com' },
    location: { type: String, default: 'Hyderabad, India' },
    soundEffects: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
    socialLinks: [{ platform: String, url: String }],
  },
  { timestamps: true }
);

export const Setting = mongoose.model<ISetting>('Setting', SettingSchema);
