import { test, expect } from '@playwright/test';

test.describe('Instructor Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login as instructor (env: INSTRUCTOR_NAME="Nelson Lopez" → nlopez, DOC_NUMBER=123456)
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Username').fill('nlopez');
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/(dashboard|instructor)/, { timeout: 10000 });
  });

  test('instructor sees instructor dashboard with tabs', async ({ page }) => {
    // Instructor dashboard should show the heading
    await expect(page.getByRole('heading', { name: 'Instructor Dashboard' })).toBeVisible({ timeout: 10000 });

    // Should see instructor-specific tab buttons
    await expect(page.getByRole('button', { name: 'Overview' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: 'Students' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: 'Cohorts' })).toBeVisible({ timeout: 5000 });
  });

  test('instructor dashboard overview shows stats', async ({ page }) => {
    // Overview tab loads by default with stats
    await expect(page.getByText('Total Students')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Exercises Completed')).toBeVisible({ timeout: 10000 });
  });

  test('students tab shows student list', async ({ page }) => {
    // Click Students tab button
    await page.getByRole('button', { name: 'Students' }).click();
    await page.waitForLoadState('networkidle');

    // Should see a table with student data
    await expect(page.locator('table')).toBeVisible({ timeout: 10000 });
  });
});
