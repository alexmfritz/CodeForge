import mongoose, { Schema, Document } from 'mongoose';
import type { Role, ChatMessageType, EmojiReaction } from '@codeforge/shared';

export interface IChatMessage extends Document {
  cohortId: mongoose.Types.ObjectId;
  date: string;
  userId: mongoose.Types.ObjectId;
  username: string;
  displayName: string;
  role: Role;
  messageType: ChatMessageType;
  content: string;
  exerciseLink?: {
    exerciseId: mongoose.Types.ObjectId;
    title: string;
    tier: number;
    type: string;
  };
  codeSnippet?: {
    code: string;
    language: string;
  };
  mentions: string[];
  reactions: {
    emoji: EmojiReaction;
    userIds: mongoose.Types.ObjectId[];
  }[];
  isPinned: boolean;
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true },
    date: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    role: { type: String, enum: ['instructor', 'ta', 'student'], required: true },
    messageType: { type: String, enum: ['text', 'exercise-link', 'code-snippet', 'system'], required: true },
    content: { type: String, default: '' },
    exerciseLink: {
      exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
      title: String,
      tier: Number,
      type: String,
    },
    codeSnippet: {
      code: String,
      language: String,
    },
    mentions: [{ type: String }],
    reactions: [
      {
        emoji: { type: String, enum: ['thumbs-up', 'lightbulb', 'checkmark'] },
        userIds: [{ type: Schema.Types.ObjectId }],
      },
    ],
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true },
);

chatMessageSchema.index({ cohortId: 1, date: 1 });
chatMessageSchema.index({ cohortId: 1, isPinned: 1 });

chatMessageSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    ret.cohortId = String(ret.cohortId);
    ret.userId = String(ret.userId);
    if (ret.exerciseLink?.exerciseId) {
      ret.exerciseLink.exerciseId = String(ret.exerciseLink.exerciseId);
    }
    ret.reactions = (ret.reactions ?? []).map((r: any) => ({
      ...r,
      userIds: (r.userIds ?? []).map(String),
    }));
    delete ret.__v;
    return ret;
  },
});

export const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);
