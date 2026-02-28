// Cohort model — represents a class cohort with a date range and active flag
import mongoose, { Schema, Document } from 'mongoose';

// Document interface for Cohort
export interface ICohort extends Document {
  name: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema: name and startDate are required; endDate is optional (null = ongoing cohort)
const cohortSchema = new Schema<ICohort>(
  {
    name: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Strip __v from JSON output
cohortSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Cohort = mongoose.model<ICohort>('Cohort', cohortSchema);
