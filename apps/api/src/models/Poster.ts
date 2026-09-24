import mongoose, { Schema, Document } from 'mongoose';

export interface IPoster extends Document {
  userId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
  formData: {
    name: string;
    designation: string;
    party: string;
    district: string;
    headline: string;
  };
  uploadedPhotoUrls: string[];
  generatedImageUrl?: string;
  status: 'draft' | 'generating' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const PosterSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    templateId: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
    formData: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      party: { type: String, required: true },
      district: { type: String },
      headline: { type: String },
    },
    uploadedPhotoUrls: [{ type: String }],
    generatedImageUrl: { type: String },
    status: {
      type: String,
      enum: ['draft', 'generating', 'completed', 'failed'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPoster>('Poster', PosterSchema);
