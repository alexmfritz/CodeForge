import { User } from '../models/User.js';
import { Progress } from '../models/Progress.js';
import { Exercise } from '../models/Exercise.js';
import { Cohort } from '../models/Cohort.js';

export async function getOverview(cohortId?: string) {
  const studentFilter: Record<string, unknown> = { role: 'student', isActive: true };
  if (cohortId) studentFilter.cohortId = cohortId;

  const totalStudents = await User.countDocuments(studentFilter);

  const progressFilter: Record<string, unknown> = { status: 'completed' };
  if (cohortId) progressFilter.cohortId = cohortId;

  const completedProgress = await Progress.find(progressFilter).lean();
  const totalCompleted = completedProgress.length;
  const totalScore = completedProgress.reduce((sum, p) => sum + p.score, 0);
  const avgScore = totalCompleted > 0 ? Math.round(totalScore / totalCompleted) : 0;

  const cohorts = await Cohort.find().sort({ startDate: -1 }).lean();
  const cohortSummary = await Promise.all(
    cohorts.map(async (cohort) => {
      const studentCount = await User.countDocuments({
        cohortId: cohort._id,
        role: 'student',
        isActive: true,
      });
      const cohortCompleted = await Progress.countDocuments({
        cohortId: cohort._id,
        status: 'completed',
      });
      return {
        _id: String(cohort._id),
        name: cohort.name,
        studentCount,
        completedExercises: cohortCompleted,
        isActive: cohort.isActive,
      };
    }),
  );

  return {
    totalStudents,
    totalCompleted,
    avgScore,
    totalScore,
    cohortSummary,
  };
}

export async function getStudentProgress(studentId: string): Promise<Record<string, unknown>> {
  const student = await User.findById(studentId);
  if (!student) throw new Error('Student not found');

  const progress = await Progress.find({ userId: studentId }).lean();
  const exerciseIds = progress.map((p) => p.exerciseId);
  const exercises = await Exercise.find({ _id: { $in: exerciseIds } }).lean();
  const exerciseMap = new Map(exercises.map((e) => [String(e._id), e]));

  const progressWithDetails = progress.map((p) => {
    const exercise = exerciseMap.get(String(p.exerciseId));
    return {
      ...p,
      _id: String(p._id),
      userId: String(p.userId),
      exerciseId: String(p.exerciseId),
      cohortId: String(p.cohortId),
      exercise: exercise
        ? {
            _id: String(exercise._id),
            title: exercise.title,
            tier: exercise.tier,
            type: exercise.type,
            category: exercise.category,
            basePoints: exercise.basePoints,
          }
        : null,
    };
  });

  const completed = progress.filter((p) => p.status === 'completed');
  const totalScore = completed.reduce((sum, p) => sum + p.score, 0);

  const tierBreakdown: Record<number, { completed: number; total: number; score: number }> = {};
  const typeBreakdown: Record<string, { completed: number; total: number; score: number }> = {};

  for (const p of progress) {
    const ex = exerciseMap.get(String(p.exerciseId));
    if (!ex) continue;

    if (!tierBreakdown[ex.tier]) tierBreakdown[ex.tier] = { completed: 0, total: 0, score: 0 };
    tierBreakdown[ex.tier].total += 1;
    if (p.status === 'completed') {
      tierBreakdown[ex.tier].completed += 1;
      tierBreakdown[ex.tier].score += p.score;
    }

    if (!typeBreakdown[ex.type]) typeBreakdown[ex.type] = { completed: 0, total: 0, score: 0 };
    typeBreakdown[ex.type].total += 1;
    if (p.status === 'completed') {
      typeBreakdown[ex.type].completed += 1;
      typeBreakdown[ex.type].score += p.score;
    }
  }

  return {
    student: student.toJSON(),
    progress: progressWithDetails,
    summary: {
      totalExercises: progress.length,
      completedCount: completed.length,
      inProgressCount: progress.filter((p) => p.status === 'in_progress').length,
      totalScore,
      totalAttempts: progress.reduce((sum, p) => sum + p.attempts, 0),
      tierBreakdown,
      typeBreakdown,
    },
  };
}

export async function getCohortHeatmap(cohortId: string) {
  const students = await User.find({
    cohortId,
    role: 'student',
    isActive: true,
  })
    .sort({ displayName: 1 })
    .lean();

  const studentIds = students.map((s) => s._id);

  const progress = await Progress.find({
    userId: { $in: studentIds },
  }).lean();

  const exercises = await Exercise.find({ isActive: true })
    .sort({ tier: 1, title: 1 })
    .select('_id title tier type category')
    .lean();

  const progressMap = new Map<string, string>();
  for (const p of progress) {
    const key = `${String(p.userId)}_${String(p.exerciseId)}`;
    progressMap.set(key, p.status);
  }

  const grid = students.map((student) => ({
    studentId: String(student._id),
    displayName: student.displayName,
    cells: exercises.map((exercise) => {
      const key = `${String(student._id)}_${String(exercise._id)}`;
      return {
        exerciseId: String(exercise._id),
        status: progressMap.get(key) || 'not_started',
      };
    }),
  }));

  const exerciseHeaders = exercises.map((e) => ({
    _id: String(e._id),
    title: e.title,
    tier: e.tier,
    type: e.type,
  }));

  return { exercises: exerciseHeaders, students: grid };
}
