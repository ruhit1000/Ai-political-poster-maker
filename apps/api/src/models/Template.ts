import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
  title: string;
  occasionType: string;
  thumbnailUrl: string;
  layoutConfig: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    occasionType: { type: String, required: true }, // e.g., 'Victory Day', 'Election'
    thumbnailUrl: { type: String, required: true },
    layoutConfig: { type: Schema.Types.Mixed, default: {} }, // JSON config for photo/text slots
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITemplate>('Template', TemplateSchema);
