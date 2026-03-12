import { Review } from '../models/Review.js';
import { Progress } from '../models/Progress.js';
import { REVIEW_INTERVAL, REVIEW_COOLDOWN_DAYS } from '@codeforge/shared/constants';

/**
 * Called after every new exercise completion.
 * If the completion count is a multiple of REVIEW_INTERVAL and no pending
 * review exists, picks a random completed exercise and queues it for review.
 */
export async function maybeQueueReview(
  userId: string,
  cohortId: string,
): Promise<InstanceType<typeof Review> | null> {
  // 1. Don't queue if there's already a pending review
  const existing = await Review.findOne({ userId, status: 'pending' });
  if (existing) return null;

  // 2. Count completed exercises (reviews don't count)
  const completedCount = await Progress.countDocuments({ userId, status: 'completed' });
  if (completedCount === 0 || completedCount % REVIEW_INTERVAL !== 0) return null;

  // 3. Find eligible exercises: completed > REVIEW_COOLDOWN_DAYS ago
  const cooldownDate = new Date();
  cooldownDate.setDate(cooldownDate.getDate() - REVIEW_COOLDOWN_DAYS);

  const eligible = await Progress.find({
    userId,
    status: 'completed',
    completedAt: { $lt: cooldownDate },
  }).select('exerciseId');

  if (eligible.length === 0) return null;

  // 4. Pick a random exercise from the pool
  const randomIndex = Math.floor(Math.random() * eligible.length);
  const chosenExerciseId = eligible[randomIndex].exerciseId;

  // 5. Create the pending review
  return Review.create({
    userId,
    exerciseId: chosenExerciseId,
    cohortId,
    status: 'pending',
  });
}

export async function getPendingReview(
  userId: string,
): Promise<InstanceType<typeof Review> | null> {
  return Review.findOne({ userId, status: 'pending' });
}

export async function completeReview(
  reviewId: string,
  userId: string,
): Promise<InstanceType<typeof Review>> {
  const review = await Review.findOne({ _id: reviewId, userId });
  if (!review) throw new Error('Review not found');
  if (review.status !== 'pending') throw new Error('Review is not pending');

  review.status = 'completed';
  review.completedAt = new Date();
  await review.save();
  return review;
}

export async function skipReview(
  reviewId: string,
  userId: string,
): Promise<InstanceType<typeof Review>> {
  const review = await Review.findOne({ _id: reviewId, userId });
  if (!review) throw new Error('Review not found');
  if (review.status !== 'pending') throw new Error('Review is not pending');

  review.status = 'skipped';
  review.skippedAt = new Date();
  await review.save();
  return review;
}
