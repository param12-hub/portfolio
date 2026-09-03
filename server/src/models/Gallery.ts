import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  imageUrl: string;
  category: string;
  caption: string;
  order: number;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, default: 'Workspaces & Setup' },
    caption: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Gallery = mongoose.model<IGallery>('Gallery', GallerySchema);
