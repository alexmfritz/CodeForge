import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  description?: string;
  cohortId: mongoose.Types.ObjectId;
  exerciseIds: mongoose.Types.ObjectId[];
  targetStudentIds?: mongoose.Types.ObjectId[];
  dueDate?: Date;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
}

// Define assignment document structure with cohort and optional student targeting
const assignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort', required: true },
    exerciseIds: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    targetStudentIds: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Empty array means assigned to entire cohort
    dueDate: { type: Date, default: null },
    isActive: { type: Boolean, default: true }, // Soft delete via deactivation
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

assignmentSchema.index({ cohortId: 1, isActive: 1 });
assignmentSchema.index({ createdBy: 1 });

// Convert ObjectIds to strings for API serialization
assignmentSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: any, ret: any) {
    ret._id = String(ret._id);
    ret.cohortId = String(ret.cohortId);
    ret.createdBy = String(ret.createdBy);
    ret.exerciseIds = ret.exerciseIds.map((id: mongoose.Types.ObjectId) => String(id));
    if (ret.targetStudentIds) {
      ret.targetStudentIds = ret.targetStudentIds.map((id: mongoose.Types.ObjectId) => String(id));
    }
    delete ret.__v;
    return ret;
  },
});

export const Assignment = mongoose.model<IAssignment>('Assignment', assignmentSchema);
