// Thin wrapper — delegates to the shared scoring formula so client preview stays consistent
import { calculateScore } from '@codeforge/shared/constants';
import type { Tier } from '@codeforge/shared';

export function computeScore(
  tier: Tier,
  uniqueAttempts: number,
  solutionViewed: boolean,
  basePointsOverride?: number,
): number {
  return calculateScore(tier, uniqueAttempts, solutionViewed, basePointsOverride);
}
