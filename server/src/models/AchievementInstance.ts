import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievementInstance extends Document {
  userId: mongoose.Types.ObjectId;
  achievementId: mongoose.Types.ObjectId;
  cohortId: mongoose.Types.ObjectId;
  earnedAt: Date;
  metadata: Record<string, unknown>;
}

const achievementInstanceSchema = new Schema<IAchievementInstance>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    achievementId: { type: Schema.Types.ObjectId, ref: 'AchievementDefinition', required: true },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true },
    earnedAt: { type: Date, default: Date.now },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: false },
);

achievementInstanceSchema.index({ userId: 1, achievementId: 1 }, { unique: true });
achievementInstanceSchema.index({ userId: 1 });
achievementInstanceSchema.index({ cohortId: 1 });

achievementInstanceSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    ret.userId = String(ret.userId);
    ret.achievementId = String(ret.achievementId);
    ret.cohortId = String(ret.cohortId);
    delete ret.__v;
    return ret;
  },
});

export const AchievementInstance = mongoose.model<IAchievementInstance>(
  'AchievementInstance',
  achievementInstanceSchema,
);
