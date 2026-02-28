import { Cohort } from '../models/Cohort.js';
import { User } from '../models/User.js';

export async function createCohort(data: { name: string; startDate: string; endDate?: string }) {
  const cohort = await Cohort.create({
    name: data.name,
    startDate: new Date(data.startDate),
    endDate: data.endDate ? new Date(data.endDate) : null,
    isActive: true,
  });
  return cohort.toJSON();
}

export async function addStudentToCohort(cohortId: string, userId: string) {
  const [cohort, user] = await Promise.all([Cohort.findById(cohortId), User.findById(userId)]);

  if (!cohort) throw new Error('Cohort not found');
  if (!user) throw new Error('User not found');
  if (user.role !== 'student') throw new Error('Only students can be added to cohorts');

  user.cohortId = cohort._id as typeof user.cohortId;
  await user.save();
  return user.toJSON();
}

export async function removeStudentFromCohort(userId: string) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.cohortId = undefined;
  await user.save();
  return user.toJSON();
}

export async function getCohortWithStudentCount(cohortId: string) {
  const cohort = await Cohort.findById(cohortId);
  if (!cohort) return null;

  const studentCount = await User.countDocuments({ cohortId, role: 'student', isActive: true });
  return { ...cohort.toJSON(), studentCount };
}
