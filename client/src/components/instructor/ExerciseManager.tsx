import { useState, useMemo } from 'react';
import { useAppSelector } from '../../features/store';
import type { Exercise, ExerciseType, Tier } from '@codeforge/shared';
import { TIER_META, TYPE_META } from '@codeforge/shared/constants';
import TierBadge from '../shared/TierBadge';
import TypeBadge from '../shared/TypeBadge';
import ExerciseWizard from './ExerciseWizard';

interface ExerciseManagerProps {
  cohortId?: string;
}

export default function ExerciseManager({ cohortId: _cohortId }: ExerciseManagerProps) {
  const { exercises, collections } = useAppSelector((s) => s.exercises);

  const [showWizard, setShowWizard] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<ExerciseType | ''>('');
  const [filterTier, setFilterTier] = useState<Tier | ''>('');
  const [filterCollection, setFilterCollection] = useState('');

  const filteredExercises = useMemo(() => {
    let result = exercises;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (ex) =>
          ex.title.toLowerCase().includes(q) ||
          ex.description.toLowerCase().includes(q) ||
          ex.category.some((c) => c.toLowerCase().includes(q)) ||
          ex.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filterType) {
      result = result.filter((ex) => ex.type === filterType);
    }

    if (filterTier) {
      result = result.filter((ex) => ex.tier === filterTier);
    }

    if (filterCollection) {
      result = result.filter((ex) => ex.collectionId === filterCollection);
    }

    return result;
  }, [exercises, search, filterType, filterTier, filterCollection]);

  const getCollectionName = (collectionId?: string) => {
    if (!collectionId) return '';
    return collections.find((c) => c._id === collectionId)?.name || '';
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const handleOpenCreate = () => {
    setEditingExercise(undefined);
    setShowWizard(true);
  };

  const handleOpenEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setShowWizard(true);
  };

  const handleWizardClose = () => {
    setShowWizard(false);
    setEditingExercise(undefined);
  };

  const handleWizardCreated = () => {
    setShowWizard(false);
    setEditingExercise(undefined);
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-root)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
  };

  if (showWizard) {
    return (
      <ExerciseWizard
        onClose={handleWizardClose}
        onCreated={handleWizardCreated}
        editExercise={editingExercise}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
        </span>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-root)',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Create Exercise
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded text-sm"
          style={inputStyle}
          placeholder="Search exercises..."
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as ExerciseType | '')}
          className="px-3 py-2 rounded text-sm"
          style={inputStyle}
        >
          <option value="">All Types</option>
          {(Object.keys(TYPE_META) as ExerciseType[]).map((t) => (
            <option key={t} value={t}>
              {TYPE_META[t].label}
            </option>
          ))}
        </select>

        <select
          value={filterTier as string}
          onChange={(e) => setFilterTier(e.target.value ? (Number(e.target.value) as Tier) : '')}
          className="px-3 py-2 rounded text-sm"
          style={inputStyle}
        >
          <option value="">All Tiers</option>
          {([1, 2, 3, 4, 5] as Tier[]).map((t) => (
            <option key={t} value={t}>
              T{t} - {TIER_META[t].name}
            </option>
          ))}
        </select>

        <select
          value={filterCollection}
          onChange={(e) => setFilterCollection(e.target.value)}
          className="px-3 py-2 rounded text-sm"
          style={inputStyle}
        >
          <option value="">All Collections</option>
          {collections.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Exercise List */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: '1px solid var(--border)' }}
      >
        {/* Table Header */}
        <div
          className="grid items-center gap-3 px-4 py-2 text-xs font-medium"
          style={{
            gridTemplateColumns: '1fr 80px 60px 140px 100px',
            backgroundColor: 'var(--bg-raised)',
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span>Title</span>
          <span>Tier</span>
          <span>Type</span>
          <span>Collection</span>
          <span>Created</span>
        </div>

        {/* Rows */}
        {filteredExercises.length === 0 ? (
          <div
            className="px-4 py-8 text-center text-sm"
            style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-surface)' }}
          >
            {exercises.length === 0 ? 'No exercises yet. Create your first one!' : 'No exercises match your filters.'}
          </div>
        ) : (
          filteredExercises.map((exercise) => (
            <button
              key={exercise._id}
              type="button"
              onClick={() => handleOpenEdit(exercise)}
              className="grid items-center gap-3 px-4 py-3 text-sm w-full text-left transition-colors"
              style={{
                gridTemplateColumns: '1fr 80px 60px 140px 100px',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                border: 'none',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
                borderBottomColor: 'var(--border)',
              }}
            >
              <span className="truncate font-medium" style={{ color: 'var(--text-primary)' }}>
                {exercise.title}
              </span>
              <span>
                <TierBadge tier={exercise.tier} showName />
              </span>
              <span>
                <TypeBadge type={exercise.type} />
              </span>
              <span className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                {getCollectionName(exercise.collectionId)}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {formatDate(exercise.createdAt)}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
