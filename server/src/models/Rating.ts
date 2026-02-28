import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseId: mongoose.Types.ObjectId;
  cohortId: mongoose.Types.ObjectId | null;
  stars: number;
}

const ratingSchema = new Schema<IRating>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', default: null },
    stars: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true },
);

ratingSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });
ratingSchema.index({ exerciseId: 1 });
ratingSchema.index({ cohortId: 1 });

ratingSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    ret.userId = String(ret.userId);
    ret.exerciseId = String(ret.exerciseId);
    if (ret.cohortId) ret.cohortId = String(ret.cohortId);
    delete ret.__v;
    return ret;
  },
});

export const Rating = mongoose.model<IRating>('Rating', ratingSchema);
