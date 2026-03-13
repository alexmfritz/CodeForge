import { test, expect } from '@playwright/test';

test.describe('Exercise Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Username').fill('jsmith');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/(dashboard|exercises)/, { timeout: 10000 });
  });

  test('browse exercises page loads with exercise grid', async ({ page }) => {
    // Click Exercises in nav (scoped to nav to avoid matching "Browse Exercises" button)
    await page.getByRole('navigation').getByRole('button', { name: 'Exercises' }).click();
    await page.waitForLoadState('networkidle');

    // Exercise page shows a grid of exercise cards
    await expect(page.locator('[role="grid"]')).toBeVisible({ timeout: 10000 });
  });

  test('clicking a topic shows exercise list', async ({ page }) => {
    await page.getByRole('navigation').getByRole('button', { name: 'Exercises' }).click();
    await page.waitForLoadState('networkidle');

    // Click the JS Fundamentals topic
    await page.getByRole('button', { name: 'JS Fundamentals' }).click();

    // Should show exercise cards (article elements with role="button")
    await expect(page.locator('[role="grid"] [role="button"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('exercise view has code editor and run button', async ({ page }) => {
    // Navigate to exercises via nav
    await page.getByRole('navigation').getByRole('button', { name: 'Exercises' }).click();
    await page.waitForLoadState('networkidle');

    // Click into a topic then click the first exercise card
    await page.getByRole('button', { name: 'JS Fundamentals' }).click();
    const firstExercise = page.locator('[role="grid"] [role="button"]').first();
    await firstExercise.waitFor({ timeout: 10000 });
    await firstExercise.click();

    // Should see a code editor (CodeMirror)
    await expect(page.locator('.cm-editor').first()).toBeVisible({ timeout: 10000 });

    // Should see a run/test button
    const runButton = page.locator('button:has-text("Run"), button:has-text("Test"), button:has-text("Submit")');
    await expect(runButton.first()).toBeVisible({ timeout: 5000 });
  });
});
