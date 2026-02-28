import { useAppSelector } from '../../features/store';

export default function CollectionBanner() {
  const collectionId = useAppSelector((s) => s.ui.browseFilter.collectionId);
  const collection = useAppSelector((s) =>
    s.exercises.collections.find((c) => c._id === collectionId),
  );

  if (!collection) return null;

  return (
    <div
      className="px-5 py-3"
      style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}
    >
      <h3 className="font-heading font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
        {collection.name}
      </h3>
      {collection.description && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{collection.description}</p>
      )}
      {collection.source && (
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          Source: {collection.source}
          {collection.attribution && ` — ${collection.attribution}`}
        </p>
      )}
    </div>
  );
}
