import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { dismissAchievementToast, selectPendingToast } from '../../features/achievementsSlice';

export default function AchievementToast() {
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPendingToast);
  const [visible, setVisible] = useState(false);

  // Handle toast visibility lifecycle—fade in, auto-dismiss after 4s, fade out
  useEffect(() => {
    if (pending) {
      requestAnimationFrame(() => setVisible(true));
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => dispatch(dismissAchievementToast()), 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [pending, dispatch]);

  if (!pending) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        pointerEvents: 'auto',
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      {/* Animated toast card that slides in from right */}
      <div
        className="rounded-xl p-4 flex items-center gap-3 shadow-lg"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '2px solid var(--accent)',
          minWidth: '280px',
          maxWidth: '360px',
        }}
      >
        {/* Achievement icon emoji */}
        <div className="text-3xl select-none flex-shrink-0">{pending.icon}</div>
        <div className="flex-1 min-w-0">
          <div
            className="text-xs font-medium uppercase tracking-wider mb-0.5"
            style={{ color: 'var(--accent)' }}
          >
            Achievement Unlocked
          </div>
          <div
            className="font-heading font-semibold text-sm truncate"
            style={{ color: 'var(--text-primary)' }}
          >
            {pending.name}
          </div>
          <div
            className="text-xs truncate"
            style={{ color: 'var(--text-muted)' }}
          >
            {pending.description}
          </div>
        </div>
        {/* Manual dismiss button */}
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => dispatch(dismissAchievementToast()), 300);
          }}
          className="flex-shrink-0 text-sm leading-none"
          style={{
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
