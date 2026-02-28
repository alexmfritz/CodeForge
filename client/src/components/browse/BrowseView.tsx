import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import {
  setSearch,
  toggleTag,
  setTierFilter,
  setCategoryPath,
  clearFilters,
  setStatusSort,
  showToast,
} from '../../features/uiSlice';
import { resetExercise } from '../../features/progressSlice';
import type { Tier, StatusSort } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';
import { getCategoryLabels } from '../../utils/helpers';
import Skeleton from '../shared/Skeleton';
import ExerciseCard from './ExerciseCard';
import TopicCards from './TopicCards';
import CollectionCards from './CollectionCards';
import CollectionBanner from './CollectionBanner';
import SubcategoryNav from './SubcategoryNav';

// Curated subset of tags surfaced in the filter panel for quick one-click filtering
const FEATURED_TAGS = [
  'arrays', 'strings', 'objects', 'loops', 'conditionals', 'functions',
  'oop', 'class', 'higher-order', 'reduce', 'map', 'filter',
  'scope', 'context', 'callbacks', 'math', 'operators', 'searching',
  'composition', 'closure', 'inheritance', 'accumulator', 'state',
  'html', 'css', 'es6', 'methods',
  'algorithms', 'sorting', 'recursion', 'regex', 'dom',
  'two-pointer', 'sliding-window', 'backtracking',
  'tables', 'forms', 'semantics', 'flexbox', 'grid',
  'positioning', 'typography', 'animation', 'responsive', 'accessibility',
] as const;

// Main browse page: search bar, filter panel, topic/collection grids, and exercise list
export default function BrowseView() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const categories = useAppSelector((s) => s.exercises.categories);
  const collections = useAppSelector((s) => s.exercises.collections);
  const progressItems = useAppSelector((s) => s.progress.items);
  const filter = useAppSelector((s) => s.ui.browseFilter);
  const statusSort = useAppSelector((s) => s.ui.statusSort);
  const loading = useAppSelector((s) => s.exercises.loading);

  const [showFilters, setShowFilters] = useState(false);

  // Jump to a random unsolved exercise to encourage exploration
  const handleRandom = () => {
    const unsolved = exercises.filter((ex) => progressItems[ex._id]?.status !== 'completed');
    if (unsolved.length === 0) return;
    const pick = unsolved[Math.floor(Math.random() * unsolved.length)];
    navigate(`/exercises/${pick._id}`);
  };

  // Apply all active filters and sort exercises; memoized to avoid re-filtering on each render
  const filteredExercises = useMemo(() => {
    let result = exercises;

    if (filter.categoryPath.length > 0) {
      result = result.filter((ex) => filter.categoryPath.every((seg, i) => ex.category[i] === seg));
    }
    if (filter.collectionId) {
      if (filter.collectionId === '__in-progress__') {
        result = result.filter((ex) => progressItems[ex._id]?.status === 'in_progress');
      } else {
        const col = collections.find((c) => c._id === filter.collectionId);
        if (col) {
          const ids = new Set(col.exerciseIds);
          result = result.filter((ex) => ids.has(ex._id));
          result = col.exerciseIds.map((id) => result.find((ex) => ex._id === id)!).filter(Boolean);
        }
      }
    }
    if (filter.tier) {
      result = result.filter((ex) => ex.tier === filter.tier);
    }
    if (filter.tags.length > 0) {
      result = result.filter((ex) => filter.tags.some((t) => ex.tags.includes(t)));
    }
    if (filter.search.trim()) {
      const q = filter.search.trim().toLowerCase();
      result = result.filter((ex) =>
        ex.title.toLowerCase().includes(q) ||
        ex.description.toLowerCase().includes(q) ||
        ex.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Skip re-sorting when inside a collection — preserve the curated exercise order
    if (!filter.collectionId || filter.collectionId === '__in-progress__') {
      result = [...result].sort((a, b) => {
        if (statusSort !== 'default') {
          const aStatus = progressItems[a._id]?.status;
          const bStatus = progressItems[b._id]?.status;
          const rank = (s: string | undefined) => {
            switch (statusSort) {
              case 'in-progress-first': return s === 'in_progress' ? 0 : s === 'completed' ? 2 : 1;
              case 'not-started-first': return !s || s === 'not_started' ? 0 : s === 'in_progress' ? 1 : 2;
              case 'completed-first': return s === 'completed' ? 0 : s === 'in_progress' ? 1 : 2;
              default: return 0;
            }
          };
          const diff = rank(aStatus) - rank(bStatus);
          if (diff !== 0) return diff;
        }
        return a.tier - b.tier || a.title.localeCompare(b.title);
      });
    }

    return result;
  }, [exercises, filter, collections, progressItems, statusSort]);

  const hasActiveFilters =
    filter.search || filter.tags.length > 0 || filter.tier || filter.collectionId || filter.categoryPath.length > 0 || statusSort !== 'default';

  const categoryBreadcrumbs = getCategoryLabels(filter.categoryPath, categories);
  const completedCount = exercises.filter((ex) => progressItems[ex._id]?.status === 'completed').length;
  const totalCount = exercises.length;

  if (loading) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-surface)' }}>
          <Skeleton width="280px" height="32px" borderRadius="6px" />
          <Skeleton width="80px" height="32px" borderRadius="6px" />
        </div>
        <div className="px-5 pt-5 pb-2">
          <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} height="80px" borderRadius="8px" />)}
          </div>
        </div>
        <div className="px-5 py-4">
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {Array.from({ length: 8 }, (_, i) => <Skeleton key={i} height="88px" borderRadius="8px" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-surface)' }}>
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={filter.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search exercises, tags…"
            className="w-full text-sm px-3 py-1.5 pl-8 rounded"
            style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'Source Code Pro, monospace' }}
          />
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm"
          style={{ backgroundColor: showFilters ? 'var(--bg-raised)' : 'transparent', border: `1px solid ${showFilters ? 'var(--border-strong)' : 'var(--border)'}`, color: showFilters ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'Lexend, sans-serif' }}
        >
          Filters
          {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />}
        </button>
        {hasActiveFilters && (
          <button onClick={() => dispatch(clearFilters())} className="text-xs px-2 py-1 rounded" style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', cursor: 'pointer', backgroundColor: 'transparent' }}>
            Clear
          </button>
        )}
        <select
          value={statusSort}
          onChange={(e) => dispatch(setStatusSort(e.target.value as StatusSort))}
          className="text-xs px-2 py-1.5 rounded"
          style={{ backgroundColor: 'var(--bg-raised)', border: `1px solid ${statusSort !== 'default' ? 'var(--accent)' : 'var(--border)'}`, color: statusSort !== 'default' ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'Lexend, sans-serif' }}
          aria-label="Sort by status"
        >
          <option value="default">Sort: Default</option>
          <option value="in-progress-first">In Progress First</option>
          <option value="not-started-first">Not Started First</option>
          <option value="completed-first">Completed First</option>
        </select>
        <button
          onClick={handleRandom}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm"
          style={{ backgroundColor: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', cursor: completedCount === totalCount ? 'default' : 'pointer', fontFamily: 'Lexend, sans-serif', opacity: completedCount === totalCount ? 0.4 : 1 }}
          title="Random unsolved exercise"
          disabled={completedCount === totalCount}
        >
          Random
        </button>
        <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>
          {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
          {totalCount > 0 && ` · ${completedCount}/${totalCount} complete`}
        </span>
      </div>

      {showFilters && (
        <div className="flex-shrink-0 px-5 py-3 flex flex-wrap gap-4" style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Lexend, sans-serif' }}>Tier:</span>
            {([1, 2, 3, 4, 5] as Tier[]).map((t) => {
              const meta = TIER_META[t];
              return (
                <button
                  key={t}
                  onClick={() => dispatch(setTierFilter(filter.tier === t ? null : t))}
                  className="tier-badge"
                  style={{ width: 22, height: 22, fontSize: 9, backgroundColor: filter.tier === t ? meta.bgColor : 'var(--bg-raised)', border: `1px solid ${filter.tier === t ? meta.color : 'var(--border)'}`, color: filter.tier === t ? meta.color : 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {meta.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Lexend, sans-serif' }}>Tags:</span>
            {FEATURED_TAGS.map((tag) => {
              const isActive = filter.tags.includes(tag);
              return (
                <button key={tag} onClick={() => dispatch(toggleTag(tag))} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: isActive ? 'var(--accent-bg, rgba(129,140,248,0.15))' : 'var(--bg-raised)', border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`, color: isActive ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'Lexend, sans-serif' }}>
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {categoryBreadcrumbs.length > 0 && (
        <div className="flex-shrink-0 flex items-center gap-1 px-5 py-2 text-xs" style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
          <button onClick={() => dispatch(setCategoryPath([]))} className="hover:underline" style={{ color: 'var(--accent)', cursor: 'pointer', background: 'none', border: 'none' }}>All</button>
          {categoryBreadcrumbs.map((label, i) => (
            <span key={i} className="flex items-center gap-1">
              <span style={{ color: 'var(--text-faint)' }}>›</span>
              <button onClick={() => dispatch(setCategoryPath(filter.categoryPath.slice(0, i + 1)))} className="hover:underline" style={{ color: i === categoryBreadcrumbs.length - 1 ? 'var(--text-primary)' : 'var(--accent)', cursor: 'pointer', background: 'none', border: 'none' }}>
                {label}
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
          {/* Show topic and collection cards only on the unfiltered landing page */}
        {!hasActiveFilters && filter.categoryPath.length === 0 && (
          <>
            <TopicCards />
            <CollectionCards />
          </>
        )}
        {filter.categoryPath.length > 0 && <SubcategoryNav />}
        {filter.collectionId && filter.collectionId !== '__in-progress__' && <CollectionBanner />}
        <div className="px-5 py-4">
          {filteredExercises.length === 0 ? (
            <div className="text-center py-16 text-sm" style={{ color: 'var(--text-muted)' }}>
              No exercises match your filters.
            </div>
          ) : (
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {filteredExercises.map((ex) => (
                <ExerciseCard
                  key={ex._id}
                  exercise={ex}
                  onDismiss={filter.collectionId === '__in-progress__' ? (exerciseId) => {
                    dispatch(resetExercise(exerciseId))
                      .unwrap()
                      .then(() => dispatch(showToast({ message: 'Exercise removed from In Progress', type: 'success' })))
                      .catch(() => dispatch(showToast({ message: 'Failed to remove — server may be offline', type: 'error' })));
                  } : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
