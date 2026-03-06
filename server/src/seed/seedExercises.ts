import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { config } from '../config.js';
import { Exercise } from '../models/Exercise.js';
import { Collection } from '../models/Collection.js';
import { BASE_POINTS } from '@codeforge/shared/constants';
import type { Tier } from '@codeforge/shared';

interface RawExercise {
  id: number;
  title: string;
  type: 'js' | 'html' | 'css' | 'html-css';
  tier: number;
  category: string[];
  tags: string[];
  description: string;
  instructions: string;
  starterCode: string;
  solution: string;
  testRunner: string;
  testCases?: unknown[];
  providedHtml?: string;
  dataset?: string;
  hint?: string;
  hints?: string[];
  resources: { label: string; url: string; description?: string }[];
  solutionGate?: number;
}

interface RawCollection {
  id: string;
  name: string;
  description?: string;
  color?: string;
  source?: string;
  license?: string;
  attribution?: string;
  hidden?: boolean;
  exerciseIds?: number[];
  exercises?: RawExercise[];
}

function generateSlug(title: string, legacyId: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base}-${legacyId}`;
}

function normalizeHints(raw: RawExercise): string[] {
  if (raw.hints && raw.hints.length > 0) return raw.hints;
  if (raw.hint) return [raw.hint];
  return [];
}

export async function seedExercises(): Promise<void> {
  const collectionsDir = path.join(config.paths.exercises, 'collections');
  if (!fs.existsSync(collectionsDir)) {
    console.log('No exercises/collections directory found — skipping seed');
    return;
  }

  const files = fs.readdirSync(collectionsDir).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
  if (files.length === 0) {
    console.log('No collection files found — skipping seed');
    return;
  }

  const existingCount = await Exercise.countDocuments();
  if (existingCount > 0) {
    console.log(`Found ${existingCount} exercises already seeded — skipping`);
    return;
  }

  console.log(`Seeding exercises from ${files.length} collection files…`);

  const seenLegacyIds = new Set<number>();
  let totalExercises = 0;

  for (let order = 0; order < files.length; order++) {
    const file = files[order];
    const raw: RawCollection = JSON.parse(
      fs.readFileSync(path.join(collectionsDir, file), 'utf-8'),
    );

    const slug = file.replace('.json', '');
    const exercises = raw.exercises ?? [];

    const collection = await Collection.create({
      slug,
      name: raw.name || slug,
      description: raw.description ?? '',
      color: raw.color,
      source: raw.source,
      license: raw.license,
      attribution: raw.attribution,
      hidden: raw.hidden ?? false,
      isDefault: slug === 'default-curriculum',
      exerciseIds: [],
      order,
    });

    const exerciseIds: string[] = [];

    for (const rawEx of exercises) {
      if (seenLegacyIds.has(rawEx.id)) continue;
      seenLegacyIds.add(rawEx.id);

      const tier = (rawEx.tier || 1) as Tier;
      const exercise = await Exercise.create({
        legacyId: rawEx.id,
        title: rawEx.title,
        slug: generateSlug(rawEx.title, rawEx.id),
        type: rawEx.type || 'js',
        tier,
        category: rawEx.category ?? [],
        tags: rawEx.tags ?? [],
        description: rawEx.description ?? '',
        instructions: rawEx.instructions ?? '',
        starterCode: rawEx.starterCode ?? '',
        solution: rawEx.solution ?? '',
        testRunner: rawEx.testRunner ?? '',
        testCases: rawEx.testCases ?? [],
        providedHtml: rawEx.providedHtml,
        dataset: rawEx.dataset,
        hints: normalizeHints(rawEx),
        resources: rawEx.resources ?? [],
        solutionGate: rawEx.solutionGate,
        basePoints: BASE_POINTS[tier] ?? 10,
        collectionId: collection._id,
        isActive: true,
      });

      exerciseIds.push(exercise._id.toString());
      totalExercises++;
    }

    collection.exerciseIds = exerciseIds.map((id) => new mongoose.Types.ObjectId(id));
    await collection.save();

    console.log(`  ${slug}: ${exerciseIds.length} exercises`);
  }

  console.log(`Seed complete: ${totalExercises} exercises across ${files.length} collections`);
}
