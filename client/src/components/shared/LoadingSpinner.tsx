export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--border-strong)', borderTopColor: 'transparent' }}
      />
    </div>
  );
}
