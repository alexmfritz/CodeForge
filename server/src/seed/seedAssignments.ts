import { Assignment } from '../models/Assignment.js';
import { Cohort } from '../models/Cohort.js';
import { Exercise } from '../models/Exercise.js';
import { User } from '../models/User.js';

export async function seedAssignments(): Promise<void> {
  const existingCount = await Assignment.countDocuments();
  if (existingCount > 0) return;

  const cohort = await Cohort.findOne({ isActive: true }).lean();
  const instructor = await User.findOne({ role: 'instructor' }).lean();

  if (!cohort || !instructor) {
    console.log('[seed] Skipping assignments — no cohort or instructor found');
    return;
  }

  // Assignment 1: Single exercise — a quick, focused task
  const singleExercise = await Exercise.findOne({
    title: 'Age Check',
    isActive: true,
  }).lean();

  // Assignment 2: Many exercises — a mix of tiers, types, and tags
  const multiExercises = await Exercise.find({
    isActive: true,
    title: {
      $in: [
        'First Variables',
        'Array Basics',
        'Coin Counter',
        'Format Price',
        'Adventurer Title Card',
        'Loop and Filter',
        'Health Bar (Basic)',
        'Append to String',
        'Bigger of Two',
        'Negate It',
        'Even or Odd',
        'Gold Purse',
      ],
    },
  }).lean();

  const assignments = [];

  if (singleExercise) {
    assignments.push({
      title: 'Quick Check — Conditionals',
      description:
        'A single focused exercise on conditional logic. Complete this before our next session.',
      cohortId: cohort._id,
      exerciseIds: [singleExercise._id],
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      isActive: true,
      createdBy: instructor._id,
    });
  }

  if (multiExercises.length > 0) {
    assignments.push({
      title: 'Week 2 — JavaScript Fundamentals',
      description:
        'Work through these exercises covering variables, arrays, loops, and string manipulation. A mix of Tier I and Tier II across JS, CSS, and HTML types.',
      cohortId: cohort._id,
      exerciseIds: multiExercises.map((ex) => ex._id),
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      isActive: true,
      createdBy: instructor._id,
    });
  }

  if (assignments.length > 0) {
    await Assignment.insertMany(assignments);
    console.log(`[seed] Created ${assignments.length} mock assignment(s)`);
  }
}
