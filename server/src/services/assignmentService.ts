import { Assignment } from '../models/Assignment.js';
import { Progress } from '../models/Progress.js';
import { Exercise } from '../models/Exercise.js';
import { User } from '../models/User.js';

export async function listAssignments(role: string, cohortId: string | null, includeArchived = false) {
  const filter: Record<string, unknown> = {};
  if (!includeArchived) {
    filter.isActive = true;
  }
  if (role === 'student' && cohortId) {
    filter.cohortId = cohortId;
    filter.isActive = true; // Students always see only active
  }
  if (role !== 'student' && cohortId) {
    filter.cohortId = cohortId;
  }
  const assignments = await Assignment.find(filter).sort({ createdAt: -1 }).lean();
  return assignments.map(toPlainAssignment);
}

export async function getAssignmentById(id: string): Promise<Record<string, unknown> | null> {
  const assignment = await Assignment.findById(id);
  if (!assignment) return null;

  const exercises = await Exercise.find({
    _id: { $in: assignment.exerciseIds },
    isActive: true,
  })
    .select('_id title tier type category basePoints')
    .lean();

  const exerciseList = exercises.map((ex) => ({
    _id: String(ex._id),
    title: ex.title,
    tier: ex.tier,
    type: ex.type,
    category: ex.category,
    basePoints: ex.basePoints,
  }));

  return {
    ...assignment.toJSON(),
    exercises: exerciseList,
  };
}

export async function createAssignment(data: Record<string, unknown>, userId: string) {
  const assignment = await Assignment.create({ ...data, createdBy: userId });
  return assignment.toJSON();
}

export async function updateAssignment(id: string, data: Record<string, unknown>) {
  const assignment = await Assignment.findByIdAndUpdate(id, data, { new: true });
  if (!assignment) return null;
  return assignment.toJSON();
}

export async function deactivateAssignment(id: string) {
  const assignment = await Assignment.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!assignment) return null;
  return assignment.toJSON();
}

export async function getAssignmentProgress(assignmentId: string) {
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) return null;

  const studentFilter: Record<string, unknown> = { cohortId: assignment.cohortId, role: 'student', isActive: true };
  if (assignment.targetStudentIds && assignment.targetStudentIds.length > 0) {
    studentFilter._id = { $in: assignment.targetStudentIds };
  }

  const students = await User.find(studentFilter).select('_id displayName username').lean();
  const studentIds = students.map((s) => s._id);

  const progress = await Progress.find({
    userId: { $in: studentIds },
    exerciseId: { $in: assignment.exerciseIds },
  }).lean();

  const progressMap = new Map<string, Set<string>>();
  for (const p of progress) {
    if (p.status !== 'completed') continue;
    const uid = String(p.userId);
    if (!progressMap.has(uid)) progressMap.set(uid, new Set());
    progressMap.get(uid)!.add(String(p.exerciseId));
  }

  const totalExercises = assignment.exerciseIds.length;

  const studentProgress = students.map((s) => {
    const sid = String(s._id);
    const completedSet = progressMap.get(sid) || new Set();
    const completedExerciseIds = assignment.exerciseIds
      .map((eid) => String(eid))
      .filter((eid) => completedSet.has(eid));
    return {
      studentId: sid,
      displayName: s.displayName,
      username: s.username,
      completed: completedExerciseIds.length,
      total: totalExercises,
      completedExerciseIds,
    };
  });

  return {
    assignmentId: String(assignment._id),
    totalExercises,
    students: studentProgress,
  };
}

export async function getAssignmentProgressSummaries(assignmentIds: string[]) {
  const assignments = await Assignment.find({ _id: { $in: assignmentIds } }).lean();
  const results: Record<string, { totalStudents: number; studentsCompleted: number }> = {};

  for (const assignment of assignments) {
    const aid = String(assignment._id);
    const studentFilter: Record<string, unknown> = {
      cohortId: assignment.cohortId,
      role: 'student',
      isActive: true,
    };
    if (assignment.targetStudentIds && assignment.targetStudentIds.length > 0) {
      studentFilter._id = { $in: assignment.targetStudentIds };
    }

    const students = await User.find(studentFilter).select('_id').lean();
    const totalStudents = students.length;
    const studentIds = students.map((s) => s._id);
    const totalExercises = assignment.exerciseIds.length;

    if (totalStudents === 0 || totalExercises === 0) {
      results[aid] = { totalStudents, studentsCompleted: 0 };
      continue;
    }

    // Count students who completed ALL exercises
    const progress = await Progress.find({
      userId: { $in: studentIds },
      exerciseId: { $in: assignment.exerciseIds },
      status: 'completed',
    }).lean();

    const completionMap = new Map<string, number>();
    for (const p of progress) {
      const uid = String(p.userId);
      completionMap.set(uid, (completionMap.get(uid) || 0) + 1);
    }

    let studentsCompleted = 0;
    for (const count of completionMap.values()) {
      if (count >= totalExercises) studentsCompleted++;
    }

    results[aid] = { totalStudents, studentsCompleted };
  }

  return results;
}

function toPlainAssignment(doc: Record<string, unknown>) {
  const obj = { ...doc };
  obj._id = String(obj._id);
  obj.cohortId = String(obj.cohortId);
  obj.createdBy = String(obj.createdBy);
  if (Array.isArray(obj.exerciseIds)) {
    obj.exerciseIds = (obj.exerciseIds as unknown[]).map((id) => String(id));
  }
  if (Array.isArray(obj.targetStudentIds)) {
    obj.targetStudentIds = (obj.targetStudentIds as unknown[]).map((id) => String(id));
  }
  delete obj.__v;
  return obj;
}
