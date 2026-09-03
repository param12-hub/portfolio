import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  path: string;
  views: number;
  date: string; // YYYY-MM-DD
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    path: { type: String, required: true },
    views: { type: Number, default: 1 },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

AnalyticsSchema.index({ path: 1, date: 1 }, { unique: true });

export const Analytics = mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
