import mongoose, { Schema, Document } from 'mongoose';

export interface ICohort extends Document {
  name: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const cohortSchema = new Schema<ICohort>(
  {
    name: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

cohortSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Cohort = mongoose.model<ICohort>('Cohort', cohortSchema);
