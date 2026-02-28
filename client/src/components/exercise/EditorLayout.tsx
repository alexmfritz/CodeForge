import type { ExerciseType } from '@codeforge/shared';
import CodeEditor from './CodeEditor';

interface EditorLayoutProps {
  exerciseType: ExerciseType;
  code: string;
  cssCode: string;
  onCodeChange: (code: string) => void;
  onCssChange: (css: string) => void;
  onRun: () => void;
}

// Renders a single editor pane or side-by-side HTML+CSS panes depending on exercise type
export default function EditorLayout({
  exerciseType,
  code,
  cssCode,
  onCodeChange,
  onCssChange,
  onRun,
}: EditorLayoutProps) {
  // Dual-editor layout: HTML on the left, CSS on the right with labeled headers
  if (exerciseType === 'html-css') {
    return (
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            className="flex-shrink-0 px-3 py-1 text-xs"
            style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', fontFamily: 'Lexend, sans-serif' }}
          >
            HTML
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={code} onChange={onCodeChange} onRun={onRun} language="html" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden" style={{ borderLeft: '1px solid var(--border)' }}>
          <div
            className="flex-shrink-0 px-3 py-1 text-xs"
            style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', fontFamily: 'Lexend, sans-serif' }}
          >
            CSS
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={cssCode} onChange={onCssChange} onRun={onRun} language="css-only" />
          </div>
        </div>
      </div>
    );
  }

  if (exerciseType === 'css') {
    return (
      <div className="flex-1 overflow-hidden">
        <CodeEditor value={code} onChange={onCodeChange} onRun={onRun} language="css" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <CodeEditor value={code} onChange={onCodeChange} onRun={onRun} language={exerciseType} />
    </div>
  );
}
