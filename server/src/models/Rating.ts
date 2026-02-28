import mongoose, { Schema, Document } from 'mongoose';

// Rating document interface: one rating per user per exercise
export interface IRating extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseId: mongoose.Types.ObjectId;
  cohortId: mongoose.Types.ObjectId;
  stars: number;
}

// Schema: stars constrained to 1-5, auto-timestamps for created/updated
const ratingSchema = new Schema<IRating>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true },
);

// Unique compound index enforces one rating per user per exercise
ratingSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });
ratingSchema.index({ exerciseId: 1 });
ratingSchema.index({ cohortId: 1 });

// Serialize ObjectIds to strings and strip __v for clean JSON output
ratingSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    ret.userId = String(ret.userId);
    ret.exerciseId = String(ret.exerciseId);
    ret.cohortId = String(ret.cohortId);
    delete ret.__v;
    return ret;
  },
});

export const Rating = mongoose.model<IRating>('Rating', ratingSchema);
