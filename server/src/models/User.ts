import mongoose, { Schema, Document } from 'mongoose';
import type { Role, Theme } from '@codeforge/shared';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  role: Role;
  displayName: string;
  docNumber: string;
  cohortId?: mongoose.Types.ObjectId;
  isActive: boolean;
  lastLogin?: Date;
  preferences: {
    theme: Theme;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['instructor', 'ta', 'student'], required: true },
    displayName: { type: String, required: true, trim: true },
    docNumber: { type: String, required: true },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', default: null },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    preferences: {
      theme: { type: String, default: 'midnight' },
    },
  },
  { timestamps: true },
);

userSchema.index({ docNumber: 1 });
userSchema.index({ cohortId: 1 });
userSchema.index({ role: 1, isActive: 1 });

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model<IUser>('User', userSchema);
