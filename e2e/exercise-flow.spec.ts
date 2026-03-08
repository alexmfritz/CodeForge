import { test, expect } from '@playwright/test';

test.describe('Exercise Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as a student
    await page.goto('/login');
    await page.fill('input[name="username"]', 'auser');
    await page.fill('input[name="password"]', '000000');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/(dashboard|exercises)/, { timeout: 10000 });
  });

  test('browse exercises page loads with exercise cards', async ({ page }) => {
    await page.goto('/exercises');
    await page.waitForLoadState('networkidle');

    // Should see exercise cards or list items
    const exercises = page.locator('[data-testid="exercise-card"], .exercise-card, [class*="exercise"]');
    await expect(exercises.first()).toBeVisible({ timeout: 10000 });
  });

  test('clicking an exercise navigates to exercise view', async ({ page }) => {
    await page.goto('/exercises');
    await page.waitForLoadState('networkidle');

    // Click the first exercise link/card
    const firstExercise = page.locator('a[href*="/exercises/"], [data-testid="exercise-card"] a').first();
    await firstExercise.waitFor({ timeout: 10000 });
    await firstExercise.click();

    // Should navigate to an exercise detail page
    await expect(page).toHaveURL(/\/exercises\//, { timeout: 5000 });

    // Should see exercise content (instructions, editor, or similar)
    const content = page.locator('[class*="instruction"], [class*="editor"], [class*="exercise"]');
    await expect(content.first()).toBeVisible({ timeout: 5000 });
  });

  test('exercise view has code editor and test runner', async ({ page }) => {
    await page.goto('/exercises');
    await page.waitForLoadState('networkidle');

    // Navigate to first exercise
    const firstExercise = page.locator('a[href*="/exercises/"]').first();
    await firstExercise.waitFor({ timeout: 10000 });
    await firstExercise.click();
    await expect(page).toHaveURL(/\/exercises\//, { timeout: 5000 });

    // Should see a code editor (CodeMirror)
    const editor = page.locator('.cm-editor, [class*="CodeMirror"], [class*="editor"]');
    await expect(editor.first()).toBeVisible({ timeout: 10000 });

    // Should see a run/submit button
    const runButton = page.locator('button:has-text("Run"), button:has-text("Test"), button:has-text("Submit")');
    await expect(runButton.first()).toBeVisible({ timeout: 5000 });
  });
});
