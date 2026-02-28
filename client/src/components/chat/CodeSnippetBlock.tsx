import type { CodeSnippetData } from '@codeforge/shared';

export default function CodeSnippetBlock({ data }: { data: CodeSnippetData }) {
  return (
    <div className="mt-1 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <div
        className="flex items-center justify-between px-3 py-1"
        style={{ backgroundColor: 'var(--bg-raised)', borderBottom: '1px solid var(--border)' }}
      >
        <span className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-muted)' }}>
          {data.language}
        </span>
      </div>
      <pre
        className="px-3 py-2 text-xs overflow-x-auto"
        style={{
          backgroundColor: 'var(--bg-root)',
          color: 'var(--text-primary)',
          maxHeight: 200,
          margin: 0,
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        }}
      >
        <code>{data.code}</code>
      </pre>
    </div>
  );
}
