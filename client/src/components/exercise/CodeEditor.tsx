import { useEffect, useRef } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { defaultKeymap, historyKeymap, history, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { autocompletion } from '@codemirror/autocomplete';
import type { ExerciseType, Theme } from '@codeforge/shared';
import { useAppSelector } from '../../features/store';

interface CodeEditorProps {
  value: string;
  onChange: (code: string) => void;
  onRun?: () => void;
  language: ExerciseType | 'css-only';
  readOnly?: boolean;
  minHeight?: string;
}

const lightTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#f8f9fb', color: '#1e293b' },
    '.cm-scroller': { fontFamily: '"Source Code Pro", monospace' },
    '.cm-gutters': { backgroundColor: '#f1f5f9', color: '#94a3b8', border: 'none', borderRight: '1px solid #e2e8f0' },
    '.cm-activeLineGutter': { backgroundColor: '#e2e8f0' },
    '.cm-activeLine': { backgroundColor: '#eef2ff' },
    '.cm-cursor': { borderLeftColor: '#6366f1' },
    '.cm-selectionBackground': { backgroundColor: '#c7d2fe' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: '#c7d2fe' },
  },
  { dark: false },
);

const highContrastTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#000000', color: '#ffffff' },
    '.cm-scroller': { fontFamily: '"Source Code Pro", monospace' },
    '.cm-gutters': { backgroundColor: '#0a0a0a', color: '#b0b0b0', border: 'none', borderRight: '1px solid #444444' },
    '.cm-activeLineGutter': { backgroundColor: '#1a1a1a' },
    '.cm-activeLine': { backgroundColor: '#1a1a1a' },
    '.cm-cursor': { borderLeftColor: '#a5b4fc', borderLeftWidth: '3px' },
    '.cm-selectionBackground': { backgroundColor: '#334155' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: '#334155' },
  },
  { dark: true },
);

const monokaiTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#272822', color: '#f8f8f2' },
    '.cm-scroller': { fontFamily: '"Source Code Pro", monospace' },
    '.cm-gutters': { backgroundColor: '#272822', color: '#75715e', border: 'none', borderRight: '1px solid #3e3d32' },
    '.cm-activeLineGutter': { backgroundColor: '#3e3d32' },
    '.cm-activeLine': { backgroundColor: '#3e3d3244' },
    '.cm-cursor': { borderLeftColor: '#a6e22e' },
    '.cm-selectionBackground': { backgroundColor: '#49483e' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: '#49483e' },
  },
  { dark: true },
);

const solarizedDarkTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#002b36', color: '#839496' },
    '.cm-scroller': { fontFamily: '"Source Code Pro", monospace' },
    '.cm-gutters': { backgroundColor: '#002b36', color: '#586e75', border: 'none', borderRight: '1px solid #073642' },
    '.cm-activeLineGutter': { backgroundColor: '#073642' },
    '.cm-activeLine': { backgroundColor: '#073642' },
    '.cm-cursor': { borderLeftColor: '#268bd2' },
    '.cm-selectionBackground': { backgroundColor: '#073642' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: '#073642' },
  },
  { dark: true },
);

const solarizedLightTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#fdf6e3', color: '#657b83' },
    '.cm-scroller': { fontFamily: '"Source Code Pro", monospace' },
    '.cm-gutters': { backgroundColor: '#eee8d5', color: '#93a1a1', border: 'none', borderRight: '1px solid #eee8d5' },
    '.cm-activeLineGutter': { backgroundColor: '#eee8d5' },
    '.cm-activeLine': { backgroundColor: '#eee8d5' },
    '.cm-cursor': { borderLeftColor: '#268bd2' },
    '.cm-selectionBackground': { backgroundColor: '#eee8d5' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: '#eee8d5' },
  },
  { dark: false },
);

const nordTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#2e3440', color: '#d8dee9' },
    '.cm-scroller': { fontFamily: '"Source Code Pro", monospace' },
    '.cm-gutters': { backgroundColor: '#2e3440', color: '#4c566a', border: 'none', borderRight: '1px solid #3b4252' },
    '.cm-activeLineGutter': { backgroundColor: '#3b4252' },
    '.cm-activeLine': { backgroundColor: '#3b425244' },
    '.cm-cursor': { borderLeftColor: '#88c0d0' },
    '.cm-selectionBackground': { backgroundColor: '#434c5e' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: '#434c5e' },
  },
  { dark: true },
);

const draculaTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#282a36', color: '#f8f8f2' },
    '.cm-scroller': { fontFamily: '"Source Code Pro", monospace' },
    '.cm-gutters': { backgroundColor: '#282a36', color: '#6272a4', border: 'none', borderRight: '1px solid #44475a' },
    '.cm-activeLineGutter': { backgroundColor: '#44475a' },
    '.cm-activeLine': { backgroundColor: '#44475a44' },
    '.cm-cursor': { borderLeftColor: '#bd93f9' },
    '.cm-selectionBackground': { backgroundColor: '#44475a' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: '#44475a' },
  },
  { dark: true },
);

function getLanguageExtension(lang: ExerciseType | 'css-only') {
  switch (lang) {
    case 'js': return javascript({ jsx: false, typescript: false });
    case 'html':
    case 'html-css': return html();
    case 'css':
    case 'css-only': return css();
    default: return javascript();
  }
}

function getThemeExtension(theme: Theme) {
  switch (theme) {
    case 'daylight': return lightTheme;
    case 'high-contrast': return highContrastTheme;
    case 'monokai': return monokaiTheme;
    case 'solarized-dark': return solarizedDarkTheme;
    case 'solarized-light': return solarizedLightTheme;
    case 'nord': return nordTheme;
    case 'dracula': return draculaTheme;
    case 'midnight':
    default: return oneDark;
  }
}

function getEditorBg(theme: Theme): string {
  switch (theme) {
    case 'daylight': return '#f8f9fb';
    case 'high-contrast': return '#000000';
    case 'monokai': return '#272822';
    case 'solarized-dark': return '#002b36';
    case 'solarized-light': return '#fdf6e3';
    case 'nord': return '#2e3440';
    case 'dracula': return '#282a36';
    case 'midnight':
    default: return '#080a0f';
  }
}

export default function CodeEditor({
  value,
  onChange,
  onRun,
  language,
  readOnly = false,
  minHeight = '300px',
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const theme = useAppSelector((s) => s.ui.theme);
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);

  const themeCompartment = useRef(new Compartment());
  const languageCompartment = useRef(new Compartment());
  const readOnlyCompartment = useRef(new Compartment());

  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => { onRunRef.current = onRun; }, [onRun]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString());
      }
    });

    const runKeymap = keymap.of([
      { key: 'Ctrl-Enter', run: () => { onRunRef.current?.(); return true; } },
      { key: 'Mod-Enter', run: () => { onRunRef.current?.(); return true; } },
    ]);

    const state = EditorState.create({
      doc: value,
      extensions: [
        history(),
        lineNumbers(),
        highlightActiveLine(),
        bracketMatching(),
        autocompletion(),
        languageCompartment.current.of(getLanguageExtension(language)),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
        runKeymap,
        updateListener,
        themeCompartment.current.of(getThemeExtension(theme)),
        EditorView.theme({
          '&': { minHeight, height: '100%' },
          '.cm-scroller': {
            fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
            fontSize: '13px',
            lineHeight: '1.6',
          },
        }),
        readOnlyCompartment.current.of(EditorState.readOnly.of(readOnly)),
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: themeCompartment.current.reconfigure(getThemeExtension(theme)) });
  }, [theme]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: languageCompartment.current.reconfigure(getLanguageExtension(language)) });
  }, [language]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: readOnlyCompartment.current.reconfigure(EditorState.readOnly.of(readOnly)) });
  }, [readOnly]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({ changes: { from: 0, to: current.length, insert: value } });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-hidden"
      style={{ backgroundColor: getEditorBg(theme), borderRadius: '0' }}
      aria-label="Code editor"
      data-testid="code-editor"
    />
  );
}
