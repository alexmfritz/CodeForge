import { Exercise } from '../models/Exercise.js';
import { Collection } from '../models/Collection.js';
import type { ExercisesData } from '@codeforge/shared';
import fs from 'fs';
import path from 'path';
import { config } from '../config.js';

export async function getExercisesData(): Promise<ExercisesData> {
  const [exercises, collections] = await Promise.all([
    Exercise.find({ isActive: true }).lean(),
    Collection.find().sort({ order: 1 }).lean(),
  ]);

  const categoriesPath = path.join(config.paths.exercises, 'categories.json');
  let categories = {};
  if (fs.existsSync(categoriesPath)) {
    categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
  }

  const exerciseJson = exercises.map((ex) => ({
    ...ex,
    _id: ex._id.toString(),
    collectionId: ex.collectionId?.toString(),
    createdBy: ex.createdBy?.toString(),
    updatedBy: ex.updatedBy?.toString(),
  }));

  const collectionJson = collections.map((col) => ({
    ...col,
    _id: col._id.toString(),
    exerciseIds: col.exerciseIds.map((id) => id.toString()),
  }));

  return {
    categories,
    collections: collectionJson as unknown as ExercisesData['collections'],
    exercises: exerciseJson as unknown as ExercisesData['exercises'],
  };
}

export async function getExerciseById(id: string) {
  return Exercise.findById(id);
}

export async function createExercise(data: Record<string, unknown>, userId: string) {
  const slug = generateSlug(data.title as string);
  return Exercise.create({ ...data, slug, createdBy: userId, updatedBy: userId });
}

export async function updateExercise(id: string, data: Record<string, unknown>, userId: string) {
  return Exercise.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { new: true });
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base}-${Date.now().toString(36)}`;
}
