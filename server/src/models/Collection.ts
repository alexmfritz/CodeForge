import mongoose, { Schema, Document } from 'mongoose';

// Groups exercises into thematic sets (e.g. "Array Methods", "DOM Basics")
export interface ICollection extends Document {
  slug: string;
  name: string;
  description: string;
  exerciseIds: mongoose.Types.ObjectId[];
  // Marks the primary curriculum collection so the UI can feature it
  isDefault: boolean;
  // Hidden collections are admin-only and excluded from student browse views
  hidden: boolean;
  color?: string;
  source?: string;
  license?: string;
  attribution?: string;
  order: number;
}

const collectionSchema = new Schema<ICollection>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    exerciseIds: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    isDefault: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    color: String,
    source: String,
    license: String,
    attribution: String,
      // Controls display order in the browse view sidebar
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

collectionSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    ret.exerciseIds = (ret.exerciseIds as unknown[]).map((id: any) => String(id));
    delete ret.__v;
    return ret;
  },
});

export const Collection = mongoose.model<ICollection>('Collection', collectionSchema);
