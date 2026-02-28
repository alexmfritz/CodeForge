import type { TestResult, TestCase } from '@codeforge/shared';
import { runHtmlTests } from './htmlRunner';
import { runCssTests } from './cssRunner';

export async function runHtmlCssTests(
  htmlCode: string,
  cssCode: string,
  testCases: TestCase[],
): Promise<{ results: TestResult[]; cleanup: () => void }> {
  const sourceTests = testCases.filter((tc) =>
    ['sourceContains', 'sourceMatch'].includes(tc.assertion),
  );
  const domTests = testCases.filter((tc) =>
    ['exists', 'textContains', 'countAtLeast', 'hasId', 'hasClass'].includes(tc.assertion),
  );
  const styleTests = testCases.filter(
    (tc) => ['equals', 'oneOf', 'contains'].includes(tc.assertion) && tc.property,
  );

  const combinedSource = htmlCode + '\n' + cssCode;
  const sourceResults = runHtmlTests(combinedSource, sourceTests);
  const domResults = runHtmlTests(htmlCode, domTests);
  const { results: cssResults, cleanup } = await runCssTests(cssCode, htmlCode, styleTests);

  return {
    results: [...sourceResults, ...domResults, ...cssResults],
    cleanup,
  };
}
