import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import {
  fetchDefinitions,
  fetchMyAchievements,
  selectEarnedMap,
} from '../../features/achievementsSlice';
import AchievementCard from './AchievementCard';
import Skeleton from '../shared/Skeleton';

export default function AchievementGrid() {
  const dispatch = useAppDispatch();
  const { definitions, loading } = useAppSelector((s) => s.achievements);
  const earnedMap = useAppSelector(selectEarnedMap);

  useEffect(() => {
    dispatch(fetchDefinitions());
    dispatch(fetchMyAchievements());
  }, [dispatch]);

  if (loading && definitions.length === 0) {
    return (
      <div
        className="rounded-lg p-5"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
          Achievements
        </h3>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="140px" borderRadius="8px" />
          ))}
        </div>
      </div>
    );
  }

  if (definitions.length === 0) {
    return (
      <div
        className="rounded-lg p-5"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
          Achievements
        </h3>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          No achievements available yet.
        </p>
      </div>
    );
  }

  const earnedCount = Object.keys(earnedMap).length;

  const sorted = [...definitions].sort((a, b) => {
    const aEarned = !!earnedMap[a._id];
    const bEarned = !!earnedMap[b._id];
    if (aEarned && !bEarned) return -1;
    if (!aEarned && bEarned) return 1;
    return 0;
  });

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Achievements
        </h3>
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {earnedCount} / {definitions.length}
        </span>
      </div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
      >
        {sorted.map((def) => {
          const instance = earnedMap[def._id];
          return (
            <AchievementCard
              key={def._id}
              definition={def}
              earned={!!instance}
              earnedAt={instance?.earnedAt}
            />
          );
        })}
      </div>
    </div>
  );
}
