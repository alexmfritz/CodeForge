import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise extends Document {
  legacyId?: number;
  title: string;
  slug: string;
  type: 'js' | 'html' | 'css' | 'html-css';
  tier: number;
  category: string[];
  tags: string[];
  description: string;
  instructions: string;
  starterCode: string;
  solution: string;
  testRunner: string;
  testCases: {
    query?: string;
    assertion: string;
    property?: string;
    value?: string | number | string[];
    description: string;
    flags?: string;
  }[];
  providedHtml?: string;
  dataset?: string;
  hints: string[];
  resources: { label: string; url: string; description?: string }[];
  solutionGate?: number;
  basePoints: number;
  collectionId?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const exerciseSchema = new Schema<IExercise>(
  {
    legacyId: { type: Number, index: true, sparse: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['js', 'html', 'css', 'html-css'] },
    tier: { type: Number, required: true, min: 1, max: 5 },
    category: [{ type: String }],
    tags: [{ type: String }],
    description: { type: String, required: true },
    instructions: { type: String, default: '' },
    starterCode: { type: String, default: '' },
    solution: { type: String, required: true },
    testRunner: { type: String, default: '' },
    testCases: [
      {
        _id: false,
        query: String,
        assertion: { type: String, required: true },
        property: String,
        value: Schema.Types.Mixed,
        description: { type: String, required: true },
        flags: String,
      },
    ],
    providedHtml: String,
    dataset: String,
    hints: [{ type: String }],
    resources: [
      {
        _id: false,
        label: { type: String, required: true },
        url: { type: String, required: true },
        description: String,
      },
    ],
    solutionGate: Number,
    basePoints: { type: Number, required: true },
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection' },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

exerciseSchema.index({ type: 1, tier: 1 });
exerciseSchema.index({ tags: 1 });
exerciseSchema.index({ category: 1 });
exerciseSchema.index({ collectionId: 1 });
exerciseSchema.index({ isActive: 1 });

exerciseSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    if (ret.collectionId) ret.collectionId = String(ret.collectionId);
    if (ret.createdBy) ret.createdBy = String(ret.createdBy);
    if (ret.updatedBy) ret.updatedBy = String(ret.updatedBy);
    delete ret.__v;
    return ret;
  },
});

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
