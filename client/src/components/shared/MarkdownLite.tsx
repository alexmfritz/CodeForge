interface MarkdownLiteProps {
  text: string;
}

export default function MarkdownLite({ text }: MarkdownLiteProps) {
  const blocks = text.split(/\n\n+/);

  return (
    <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const code = lines.slice(1, lines[lines.length - 1] === '```' ? -1 : undefined).join('\n');
          return (
            <pre
              key={i}
              className="px-3 py-2 rounded text-xs overflow-x-auto font-code"
              style={{
                backgroundColor: 'var(--bg-editor)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              {code}
            </pre>
          );
        }

        if (trimmed.startsWith('  ') || trimmed.includes(' → ')) {
          return (
            <pre
              key={i}
              className="px-3 py-2 rounded text-xs overflow-x-auto font-code"
              style={{
                backgroundColor: 'var(--bg-editor)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              {trimmed}
            </pre>
          );
        }

        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed) }} />
        );
      })}
    </div>
  );
}

function inlineFormat(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code style="background:var(--bg-raised);padding:1px 4px;border-radius:3px;font-size:0.85em;color:var(--text-primary)">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>')
    .replace(/\n/g, '<br/>');
}
