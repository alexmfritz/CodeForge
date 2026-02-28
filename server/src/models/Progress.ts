import mongoose, { Schema, Document } from 'mongoose';

// Per-user, per-exercise state — tracks code, attempts, score, and completion
export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseId: mongoose.Types.ObjectId;
  cohortId: mongoose.Types.ObjectId;
  status: 'not_started' | 'in_progress' | 'completed';
  currentCode: string;
  attempts: number;
  // Deduplicated attempt count — only incremented when code hash is new
  uniqueAttempts: number;
  // Hashes of previously submitted failing code to detect duplicate submissions
  failedCodeHashes: string[];
  hintsViewed: number;
  solutionViewed: boolean;
  score: number;
  firstAttemptAt?: Date;
  completedAt?: Date;
  totalTimeSpent: number;
}

const progressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true },
    status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
    currentCode: { type: String, default: '' },
    attempts: { type: Number, default: 0 },
    uniqueAttempts: { type: Number, default: 0 },
    failedCodeHashes: [{ type: String }],
    hintsViewed: { type: Number, default: 0 },
    solutionViewed: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    firstAttemptAt: Date,
    completedAt: Date,
    totalTimeSpent: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// One progress record per user+exercise; additional indexes for dashboard queries
progressSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });
progressSchema.index({ userId: 1, status: 1 });
progressSchema.index({ cohortId: 1 });
progressSchema.index({ exerciseId: 1 });

// Convert ObjectIds to strings and strip Mongoose internals for JSON responses
progressSchema.set('toJSON', {
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

export const Progress = mongoose.model<IProgress>('Progress', progressSchema);
