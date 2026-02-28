import type { TestResult } from '@codeforge/shared';

// Hard ceiling so infinite loops don't hang the UI
const TIMEOUT_MS = 5000;

// Detect if the test runner touches the DOM so we route it to an iframe instead of a Worker
function needsDOM(testRunnerStr: string): boolean {
  return (
    /\bdocument\.createElement\b/.test(testRunnerStr) ||
    /\bdispatchEvent\b/.test(testRunnerStr) ||
    /\bwindow\./.test(testRunnerStr)
  );
}

// Entry point: picks the best sandbox strategy based on environment and test content
export async function runJsTests(code: string, testRunnerStr: string): Promise<TestResult[]> {
  if (!testRunnerStr.trim()) {
    return [{ pass: false, description: 'No test runner defined', got: undefined }];
  }

  // Fallback for environments without Worker support (e.g. older DOC lab machines)
  if (typeof Worker === 'undefined') {
    return runDirect(code, testRunnerStr);
  }

  if (needsDOM(testRunnerStr)) {
    return runInIframeSandbox(code, testRunnerStr);
  }

  return runInWorker(code, testRunnerStr);
}

// Main-thread evaluation — no isolation, used only as a last resort
async function runDirect(code: string, testRunnerStr: string): Promise<TestResult[]> {
  try {
    const runner = new Function(`return (${testRunnerStr})`)() as (
      code: string,
    ) => TestResult[] | Promise<TestResult[]>;
    const results = await runner(code);
    return results.map((r) => ({
      pass: Boolean(r.pass),
      description: r.description,
      got: r.got,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return [{ pass: false, description: `Runtime error: ${message}`, got: undefined }];
  }
}

// Preferred path: runs student code in an isolated Worker thread with a timeout safety net
function runInWorker(code: string, testRunnerStr: string): Promise<TestResult[]> {
  return new Promise((resolve) => {
    let settled = false;

    const worker = new Worker(new URL('./testWorker.ts', import.meta.url), { type: 'module' });

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        worker.terminate();
        resolve([
          {
            pass: false,
            description: `Test timed out after ${TIMEOUT_MS / 1000}s — your code may contain an infinite loop`,
          },
        ]);
      }
    }, TIMEOUT_MS);

    worker.onmessage = (e: MessageEvent<{ results?: TestResult[]; error?: string }>) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();

      if (e.data.error) {
        resolve([{ pass: false, description: `Runtime error: ${e.data.error}`, got: undefined }]);
      } else {
        resolve(e.data.results ?? []);
      }
    };

    worker.onerror = (e) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      resolve([{ pass: false, description: `Worker error: ${e.message}`, got: undefined }]);
    };

    worker.postMessage({ code, testRunnerStr });
  });
}

// Used when tests need DOM APIs — sandboxed iframe provides a real document/window
function runInIframeSandbox(code: string, testRunnerStr: string): Promise<TestResult[]> {
  return new Promise((resolve) => {
    let settled = false;

    const iframe = document.createElement('iframe');
    // allow-scripts only — no allow-same-origin to prevent escaping the sandbox
    iframe.sandbox.add('allow-scripts');
    iframe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:0;height:0;';
    document.body.appendChild(iframe);

    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        cleanup();
        resolve([
          {
            pass: false,
            description: `Test timed out after ${TIMEOUT_MS / 1000}s — your code may contain an infinite loop`,
          },
        ]);
      }
    }, TIMEOUT_MS);

    const handleMessage = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow) return;
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cleanup();

      const data = e.data as { results?: TestResult[]; error?: string };
      if (data.error) {
        resolve([{ pass: false, description: `Runtime error: ${data.error}`, got: undefined }]);
      } else {
        resolve(data.results ?? []);
      }
    };

    window.addEventListener('message', handleMessage);

    const script = `
      <script>
        (async () => {
          try {
            const runner = new Function('return (' + ${JSON.stringify(testRunnerStr)} + ')')();
            const results = await runner(${JSON.stringify(code)});
            parent.postMessage({
              results: results.map(r => ({
                pass: Boolean(r.pass),
                description: r.description,
                got: r.got,
              })),
            }, '*');
          } catch (err) {
            parent.postMessage({
              error: err instanceof Error ? err.message : String(err),
            }, '*');
          }
        })();
      ${'<'}/script>
    `;

    const doc = iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`<!DOCTYPE html><html><body>${script}</body></html>`);
      doc.close();
    } else {
      iframe.srcdoc = `<!DOCTYPE html><html><body>${script}</body></html>`;
    }
  });
}
