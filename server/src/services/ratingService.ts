import mongoose from 'mongoose';
import { Rating } from '../models/Rating.js';

// Upsert: one rating per user per exercise, creates or updates
export async function submitRating(
  userId: string,
  exerciseId: string,
  cohortId: string,
  stars: number,
) {
  const rating = await Rating.findOneAndUpdate(
    { userId: new mongoose.Types.ObjectId(userId), exerciseId: new mongoose.Types.ObjectId(exerciseId) },
    {
      userId: new mongoose.Types.ObjectId(userId),
      exerciseId: new mongoose.Types.ObjectId(exerciseId),
      cohortId: new mongoose.Types.ObjectId(cohortId),
      stars,
    },
    { upsert: true, new: true, runValidators: true },
  );
  return rating.toJSON();
}

// Aggregate pipeline for average stars and count for a single exercise
export async function getExerciseRating(exerciseId: string) {
  const result = await Rating.aggregate([
    { $match: { exerciseId: new mongoose.Types.ObjectId(exerciseId) } },
    {
      $group: {
        _id: null,
        averageStars: { $avg: '$stars' },
        totalRatings: { $sum: 1 },
      },
    },
  ]);

  if (result.length === 0) {
    return { averageStars: 0, totalRatings: 0 };
  }

  return {
    averageStars: Math.round(result[0].averageStars * 10) / 10,
    totalRatings: result[0].totalRatings,
  };
}

// Bulk aggregate: compute averages for multiple exercises in one query
export async function getExerciseRatings(exerciseIds: string[]) {
  const objectIds = exerciseIds.map((id) => new mongoose.Types.ObjectId(id));

  const results = await Rating.aggregate([
    { $match: { exerciseId: { $in: objectIds } } },
    {
      $group: {
        _id: '$exerciseId',
        averageStars: { $avg: '$stars' },
        totalRatings: { $sum: 1 },
      },
    },
  ]);

  // Build a lookup map keyed by exerciseId with rounded averages
  const map: Record<string, { averageStars: number; totalRatings: number }> = {};
  for (const r of results) {
    map[String(r._id)] = {
      averageStars: Math.round(r.averageStars * 10) / 10,
      totalRatings: r.totalRatings,
    };
  }

  return map;
}

// Fetch the current user's rating for a specific exercise
export async function getUserRating(userId: string, exerciseId: string) {
  const rating = await Rating.findOne({
    userId: new mongoose.Types.ObjectId(userId),
    exerciseId: new mongoose.Types.ObjectId(exerciseId),
  });

  return rating ? rating.toJSON() : null;
}

// Instructor overview: global summary, top 5, and lowest 5 rated exercises
export async function getRatingOverview(cohortId?: string) {
  const match: Record<string, unknown> = {};
  if (cohortId) {
    match.cohortId = new mongoose.Types.ObjectId(cohortId);
  }

  // Run all three aggregation pipelines in parallel
  const [summaryResult, topRated, lowestRated] = await Promise.all([
    Rating.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          averageStars: { $avg: '$stars' },
          totalRatings: { $sum: 1 },
        },
      },
    ]),
    Rating.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$exerciseId',
          averageStars: { $avg: '$stars' },
          totalRatings: { $sum: 1 },
        },
      },
      { $match: { totalRatings: { $gte: 1 } } },
      { $sort: { averageStars: -1, totalRatings: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'exercises',
          localField: '_id',
          foreignField: '_id',
          as: 'exercise',
        },
      },
      { $unwind: '$exercise' },
      {
        $project: {
          exerciseId: { $toString: '$_id' },
          title: '$exercise.title',
          averageStars: { $round: ['$averageStars', 1] },
          totalRatings: 1,
        },
      },
    ]),
    Rating.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$exerciseId',
          averageStars: { $avg: '$stars' },
          totalRatings: { $sum: 1 },
        },
      },
      { $match: { totalRatings: { $gte: 1 } } },
      { $sort: { averageStars: 1, totalRatings: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'exercises',
          localField: '_id',
          foreignField: '_id',
          as: 'exercise',
        },
      },
      { $unwind: '$exercise' },
      {
        $project: {
          exerciseId: { $toString: '$_id' },
          title: '$exercise.title',
          averageStars: { $round: ['$averageStars', 1] },
          totalRatings: 1,
        },
      },
    ]),
  ]);

  const summary = summaryResult[0] || { averageStars: 0, totalRatings: 0 };

  return {
    averageStars: Math.round((summary.averageStars || 0) * 10) / 10,
    totalRatings: summary.totalRatings || 0,
    topRated,
    lowestRated,
  };
}
