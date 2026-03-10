import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievementDefinition extends Document {
  name: string;
  description: string;
  icon: string;
  criteriaType: string;
  criteriaParams: Record<string, unknown>;
  isActive: boolean;
}

const achievementDefinitionSchema = new Schema<IAchievementDefinition>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    criteriaType: {
      type: String,
      required: true,
      enum: [
        'exercises_completed',
        'tier_completed',
        'type_completed',
        'score_reached',
        'collection_completed',
        'perfect_score',
        'streak',
        'all_exercises',
        'all_tiers',
        'all_types',
        'collections_count',
        'categories_explored',
        'daily_completed',
        'chat_messages',
      ],
    },
    criteriaParams: { type: Schema.Types.Mixed, default: {} },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

achievementDefinitionSchema.index({ isActive: 1 });
achievementDefinitionSchema.index({ criteriaType: 1 });

achievementDefinitionSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    delete ret.__v;
    return ret;
  },
});

export const AchievementDefinition = mongoose.model<IAchievementDefinition>(
  'AchievementDefinition',
  achievementDefinitionSchema,
);
