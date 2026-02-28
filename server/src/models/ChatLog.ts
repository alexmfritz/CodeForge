import mongoose, { Schema, Document } from 'mongoose';

export interface IChatLog extends Document {
  cohortId: mongoose.Types.ObjectId;
  date: string;
  messages: unknown[];
  messageCount: number;
  participants: mongoose.Types.ObjectId[];
  archivedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const chatLogSchema = new Schema<IChatLog>(
  {
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true },
    date: { type: String, required: true },
    messages: [{ type: Schema.Types.Mixed }],
    messageCount: { type: Number, default: 0 },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    archivedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

chatLogSchema.index({ cohortId: 1, date: -1 });

chatLogSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    ret.cohortId = String(ret.cohortId);
    ret.participants = (ret.participants ?? []).map(String);
    delete ret.__v;
    return ret;
  },
});

export const ChatLog = mongoose.model<IChatLog>('ChatLog', chatLogSchema);
