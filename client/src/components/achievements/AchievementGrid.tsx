import { useEffect, useMemo, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import {
  fetchDefinitions,
  fetchMyAchievements,
  selectEarnedMap,
  selectEarnedIds,
} from '../../features/achievementsSlice';
import AchievementCard from './AchievementCard';
import Skeleton from '../shared/Skeleton';
import { computeAchievementProgress } from '../../utils/achievementProgress';
import type { AchievementDefinition } from '@codeforge/shared';

// ─── Category configuration ────────────────────────────────────────────────

const ACHIEVEMENT_CATEGORIES = [
  {
    key: 'milestones',
    label: 'Milestones',
    icon: '\uD83C\uDFD4\uFE0F',
    criteriaTypes: ['exercises_completed', 'all_exercises'],
  },
  {
    key: 'tier-mastery',
    label: 'Tier Mastery',
    icon: '\uD83C\uDFAF',
    criteriaTypes: ['tier_completed', 'all_tiers'],
  },
  {
    key: 'type-breadth',
    label: 'Type Breadth',
    icon: '\uD83C\uDF10',
    criteriaTypes: ['type_completed', 'all_types'],
  },
  {
    key: 'quality',
    label: 'Quality & Skill',
    icon: '\uD83C\uDFC5',
    criteriaTypes: ['perfect_score', 'streak'],
  },
  {
    key: 'score',
    label: 'Score',
    icon: '\uD83D\uDCCA',
    criteriaTypes: ['score_reached'],
  },
  {
    key: 'collections',
    label: 'Collections',
    icon: '\uD83D\uDCE6',
    criteriaTypes: ['collection_completed', 'collections_count'],
  },
  {
    key: 'engagement',
    label: 'Engagement',
    icon: '\uD83D\uDCAC',
    criteriaTypes: ['categories_explored', 'daily_completed', 'chat_messages'],
  },
];

// ─── Section Component ──────────────────────────────────────────────────────

interface SectionData {
  key: string;
  label: string;
  icon: string;
  definitions: AchievementDefinition[];
  earnedCount: number;
  total: number;
}

function AchievementSection({
  section,
  collapsed,
  onToggle,
  earnedMap,
  progressMap,
}: {
  section: SectionData;
  collapsed: boolean;
  onToggle: () => void;
  earnedMap: Record<string, { earnedAt: string }>;
  progressMap: Map<string, { current: number; target: number }>;
}) {
  const allComplete = section.earnedCount === section.total;

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 py-2 px-1 rounded-md transition-colors duration-150"
        style={{ color: 'var(--text-primary)' }}
        aria-expanded={!collapsed}
      >
        <span className="text-lg select-none" aria-hidden="true">{section.icon}</span>
        <span className="font-heading font-semibold text-sm">{section.label}</span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full ml-1"
          style={{
            backgroundColor: allComplete
              ? 'color-mix(in srgb, var(--success) 15%, transparent)'
              : 'color-mix(in srgb, var(--accent) 15%, transparent)',
            color: allComplete ? 'var(--success)' : 'var(--accent)',
          }}
        >
          {section.earnedCount}/{section.total}
        </span>
        <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
          {collapsed ? '\u25BC' : '\u25B2'}
        </span>
      </button>

      <div
        style={{
          maxHeight: collapsed ? '0px' : '2000px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div
          className="grid gap-3 pt-2 pb-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
        >
          {section.definitions.map((def) => {
            const instance = earnedMap[def._id];
            const progress = progressMap.get(def._id);
            return (
              <AchievementCard
                key={def._id}
                definition={def}
                earned={!!instance}
                earnedAt={instance?.earnedAt}
                progress={progress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Grid Component ────────────────────────────────────────────────────

export default function AchievementGrid() {
  const dispatch = useAppDispatch();
  const { definitions, loading } = useAppSelector((s) => s.achievements);
  const earnedMap = useAppSelector(selectEarnedMap);
  const earnedIdSet = useAppSelector(selectEarnedIds);
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const progressItems = useAppSelector((s) => s.progress.items);
  const collections = useAppSelector((s) => s.exercises.collections);

  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  useEffect(() => {
    dispatch(fetchDefinitions());
    dispatch(fetchMyAchievements());
  }, [dispatch]);

  // ── Progress computation ──────────────────────────────────────────────
  const progressMap = useMemo(
    () => computeAchievementProgress(definitions, earnedIdSet, exercises, progressItems, collections),
    [definitions, earnedIdSet, exercises, progressItems, collections],
  );

  // ── Grouped sections ──────────────────────────────────────────────────
  const sections = useMemo(() => {
    const criteriaTypeToCategory = new Map<string, string>();
    for (const cat of ACHIEVEMENT_CATEGORIES) {
      for (const ct of cat.criteriaTypes) {
        criteriaTypeToCategory.set(ct, cat.key);
      }
    }

    const groups = new Map<string, AchievementDefinition[]>();
    for (const def of definitions) {
      const catKey = criteriaTypeToCategory.get(def.criteriaType) ?? 'engagement';
      const list = groups.get(catKey) ?? [];
      list.push(def);
      groups.set(catKey, list);
    }

    return ACHIEVEMENT_CATEGORIES
      .map((cat) => {
        const defs = groups.get(cat.key) ?? [];
        if (defs.length === 0) return null;

        // Sort: earned first, then by progress % descending
        const sorted = [...defs].sort((a, b) => {
          const aEarned = earnedIdSet.has(a._id);
          const bEarned = earnedIdSet.has(b._id);
          if (aEarned && !bEarned) return -1;
          if (!aEarned && bEarned) return 1;
          if (!aEarned && !bEarned) {
            const aP = progressMap.get(a._id);
            const bP = progressMap.get(b._id);
            const aPct = aP ? aP.current / aP.target : 0;
            const bPct = bP ? bP.current / bP.target : 0;
            return bPct - aPct;
          }
          return 0;
        });

        const earnedCount = sorted.filter((d) => earnedIdSet.has(d._id)).length;

        return {
          ...cat,
          definitions: sorted,
          earnedCount,
          total: sorted.length,
        } as SectionData;
      })
      .filter(Boolean) as SectionData[];
  }, [definitions, earnedIdSet, progressMap]);

  const toggleSection = useCallback((key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // ── Loading state ─────────────────────────────────────────────────────
  if (loading && definitions.length === 0) {
    return (
      <div
        className="rounded-lg p-5"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
          Achievements
        </h3>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {Array.from({ length: 8 }).map((_, i) => (
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

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Achievements
        </h3>
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {earnedCount} / {definitions.length}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {sections.map((section) => (
          <AchievementSection
            key={section.key}
            section={section}
            collapsed={collapsed.has(section.key)}
            onToggle={() => toggleSection(section.key)}
            earnedMap={earnedMap}
            progressMap={progressMap}
          />
        ))}
      </div>
    </div>
  );
}
