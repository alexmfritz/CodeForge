import { useAppSelector } from '../../features/store';

export default function SaveIndicator() {
  const saveStatus = useAppSelector((s) => s.ui.saveStatus);

  if (saveStatus === 'idle') return null;

  return (
    <span
      className="text-xs"
      style={{
        color: saveStatus === 'saving' ? 'var(--text-muted)' : 'var(--success)',
        fontFamily: 'Lexend, sans-serif',
      }}
    >
      {saveStatus === 'saving' ? 'Saving…' : 'Saved ✔'}
    </span>
  );
}
