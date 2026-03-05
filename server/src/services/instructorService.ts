import { Types } from 'mongoose';
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

export async function getCohortHeatmap(
  cohortId: string,
  filters?: { tier?: number; type?: string; collectionId?: string; page?: number; pageSize?: number },
) {
  const students = await User.find({
    cohortId,
    role: 'student',
    isActive: true,
  })
    .sort({ displayName: 1 })
    .lean();

  const studentIds = students.map((s) => s._id);

  const exerciseFilter: Record<string, unknown> = { isActive: true };
  if (filters?.tier) exerciseFilter.tier = filters.tier;
  if (filters?.type) exerciseFilter.type = filters.type;
  if (filters?.collectionId) exerciseFilter.collectionId = new Types.ObjectId(filters.collectionId);

  const totalExercises = await Exercise.countDocuments(exerciseFilter);
  const page = filters?.page || 1;
  const pageSize = filters?.pageSize || 50;
  const totalPages = Math.ceil(totalExercises / pageSize);

  const exercises = await Exercise.find(exerciseFilter)
    .sort({ tier: 1, title: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .select('_id title tier type')
    .lean();

  const exerciseIds = exercises.map((e) => e._id);

  const progress = await Progress.find({
    userId: { $in: studentIds },
    exerciseId: { $in: exerciseIds },
  }).lean();

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

  return {
    exercises: exerciseHeaders,
    students: grid,
    pagination: { page, pageSize, totalExercises, totalPages },
  };
}

export async function getExerciseDifficultyReport(
  cohortId?: string,
  filters?: { tier?: number; type?: string; collectionId?: string },
) {
  const matchStage: Record<string, unknown> = {
    status: { $in: ['in_progress', 'completed'] },
  };
  if (cohortId) matchStage.cohortId = new Types.ObjectId(cohortId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pipeline: any[] = [
    { $match: matchStage },
    {
      $group: {
        _id: '$exerciseId',
        totalStarted: { $sum: 1 },
        totalCompleted: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
        avgAttempts: { $avg: { $cond: [{ $eq: ['$status', 'completed'] }, '$attempts', null] } },
        avgTimeMs: { $avg: { $cond: [{ $eq: ['$status', 'completed'] }, '$totalTimeSpent', null] } },
        avgHintsViewed: { $avg: '$hintsViewed' },
        solutionViewCount: { $sum: { $cond: ['$solutionViewed', 1, 0] } },
        totalAbandoned: { $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] } },
      },
    },
    {
      $lookup: {
        from: 'exercises',
        localField: '_id',
        foreignField: '_id',
        as: 'exercise',
      },
    },
    { $unwind: '$exercise' },
  ];

  const exerciseMatch: Record<string, unknown> = {};
  if (filters?.tier) exerciseMatch['exercise.tier'] = filters.tier;
  if (filters?.type) exerciseMatch['exercise.type'] = filters.type;
  if (filters?.collectionId) exerciseMatch['exercise.collectionId'] = new Types.ObjectId(filters.collectionId);
  if (Object.keys(exerciseMatch).length > 0) {
    pipeline.push({ $match: exerciseMatch });
  }

  pipeline.push({
    $project: {
      exerciseId: '$_id',
      title: '$exercise.title',
      tier: '$exercise.tier',
      type: '$exercise.type',
      category: '$exercise.category',
      collectionId: '$exercise.collectionId',
      totalStarted: 1,
      totalCompleted: 1,
      completionRate: {
        $cond: [{ $gt: ['$totalStarted', 0] }, { $divide: ['$totalCompleted', '$totalStarted'] }, 0],
      },
      avgAttempts: { $round: [{ $ifNull: ['$avgAttempts', 0] }, 1] },
      avgTimeMs: { $round: [{ $ifNull: ['$avgTimeMs', 0] }, 0] },
      hintUsageRate: { $round: [{ $ifNull: ['$avgHintsViewed', 0] }, 2] },
      solutionViewRate: {
        $cond: [{ $gt: ['$totalStarted', 0] }, { $divide: ['$solutionViewCount', '$totalStarted'] }, 0],
      },
      abandonRate: {
        $cond: [{ $gt: ['$totalStarted', 0] }, { $divide: ['$totalAbandoned', '$totalStarted'] }, 0],
      },
    },
  });

  pipeline.push({ $sort: { tier: 1, title: 1 } });

  const results = await Progress.aggregate(pipeline);
  return results.map((r: Record<string, unknown>) => ({
    ...r,
    exerciseId: String(r.exerciseId),
    collectionId: r.collectionId ? String(r.collectionId) : undefined,
  }));
}

export async function getEngagementTimeline(cohortId?: string, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const studentFilter: Record<string, unknown> = { role: 'student', isActive: true };
  if (cohortId) studentFilter.cohortId = new Types.ObjectId(cohortId);
  const students = await User.find(studentFilter).lean();
  const studentIds = students.map((s) => s._id);

  // Daily activity aggregation
  const dailyActivity = await Progress.aggregate([
    {
      $match: {
        userId: { $in: studentIds },
        updatedAt: { $gte: startDate },
        status: { $in: ['in_progress', 'completed'] },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
        activeStudents: { $addToSet: '$userId' },
        exercisesAttempted: { $sum: 1 },
        exercisesCompleted: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
        totalTimeSpent: { $sum: '$totalTimeSpent' },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: '$_id',
        activeStudentCount: { $size: '$activeStudents' },
        exercisesAttempted: 1,
        exercisesCompleted: 1,
        totalTimeSpent: 1,
      },
    },
  ]);

  // Per-student summary
  const perStudent = await Progress.aggregate([
    { $match: { userId: { $in: studentIds } } },
    {
      $group: {
        _id: '$userId',
        totalAttempted: { $sum: 1 },
        totalCompleted: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
        totalTimeSpent: { $sum: '$totalTimeSpent' },
        lastActivity: { $max: '$updatedAt' },
      },
    },
  ]);

  // Build at-risk list
  const now = new Date();
  const AT_RISK_DAYS = 3;
  const atRiskThreshold = new Date(now.getTime() - AT_RISK_DAYS * 24 * 60 * 60 * 1000);

  const studentMap = new Map(students.map((s) => [String(s._id), s]));
  const studentsWithProgress = new Set(perStudent.map((p: { _id: unknown }) => String(p._id)));

  // Students who never started
  const neverStarted = students
    .filter((s) => !studentsWithProgress.has(String(s._id)))
    .map((s) => ({
      studentId: String(s._id),
      displayName: s.displayName,
      lastActivity: null as string | null,
      daysSinceActivity: null as number | null,
      totalCompleted: 0,
      totalAttempted: 0,
      completionRate: 0,
    }));

  // Students with stale activity
  const staleStudents = perStudent
    .filter((p: { lastActivity?: Date }) => {
      const lastAct = p.lastActivity ? new Date(p.lastActivity) : null;
      return !lastAct || lastAct < atRiskThreshold;
    })
    .map((p: { _id: unknown; lastActivity?: Date; totalCompleted: number; totalAttempted: number }) => {
      const student = studentMap.get(String(p._id));
      const daysSinceActivity = p.lastActivity
        ? Math.floor((now.getTime() - new Date(p.lastActivity).getTime()) / (1000 * 60 * 60 * 24))
        : null;
      return {
        studentId: String(p._id),
        displayName: student?.displayName || 'Unknown',
        lastActivity: p.lastActivity ? new Date(p.lastActivity).toISOString() : null,
        daysSinceActivity,
        totalCompleted: p.totalCompleted,
        totalAttempted: p.totalAttempted,
        completionRate: p.totalAttempted > 0 ? p.totalCompleted / p.totalAttempted : 0,
      };
    })
    .sort((a: { daysSinceActivity: number | null }, b: { daysSinceActivity: number | null }) =>
      (b.daysSinceActivity ?? 999) - (a.daysSinceActivity ?? 999),
    );

  const todayStr = now.toISOString().split('T')[0];
  const activeToday = dailyActivity.find(
    (d: { date: string }) => d.date === todayStr,
  )?.activeStudentCount || 0;

  const avgDailyActive = dailyActivity.length > 0
    ? Math.round(
        dailyActivity.reduce((sum: number, d: { activeStudentCount: number }) => sum + d.activeStudentCount, 0) /
          dailyActivity.length,
      )
    : 0;

  const totalCompletionsThisPeriod = dailyActivity.reduce(
    (sum: number, d: { exercisesCompleted: number }) => sum + d.exercisesCompleted,
    0,
  );

  return {
    dailyActivity,
    totalStudents: students.length,
    atRiskStudents: [...neverStarted, ...staleStudents],
    summary: { activeToday, avgDailyActive, totalCompletionsThisPeriod },
  };
}
