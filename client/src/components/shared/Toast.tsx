import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../features/store';
import { dismissToast } from '../../features/uiSlice';

export default function Toast() {
  const toast = useAppSelector((s) => s.ui.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(dismissToast()), toast.type === 'celebration' ? 4000 : 3000);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  const colors: Record<string, { bg: string; border: string; text: string }> = {
    success: { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.4)', text: 'var(--success)' },
    error: { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.4)', text: 'var(--error)' },
    warning: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', text: '#f59e0b' },
    celebration: { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.4)', text: 'var(--success)' },
  };
  const c = colors[toast.type] ?? colors.success;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg text-sm font-medium animate-fade-in"
      style={{
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
      }}
      role="alert"
    >
      {toast.message}
    </div>
  );
}
