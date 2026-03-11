import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseId: mongoose.Types.ObjectId;
  cohortId: mongoose.Types.ObjectId;
  status: 'pending' | 'completed' | 'skipped';
  completedAt?: Date;
  skippedAt?: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true },
    status: { type: String, enum: ['pending', 'completed', 'skipped'], default: 'pending' },
    completedAt: Date,
    skippedAt: Date,
  },
  { timestamps: true },
);

reviewSchema.index({ userId: 1, status: 1 });

reviewSchema.set('toJSON', {
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

export const Review = mongoose.model<IReview>('Review', reviewSchema);
