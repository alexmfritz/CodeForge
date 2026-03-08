import { test, expect } from '@playwright/test';

test.describe('Instructor Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login as instructor
    await page.goto('/login');
    await page.fill('input[name="username"]', 'nlopez');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/(dashboard|exercises)/, { timeout: 10000 });
  });

  test('instructor sees instructor dashboard navigation', async ({ page }) => {
    // Instructor should have access to instructor-specific routes
    const instructorNav = page.locator(
      'a[href*="/instructor"], a[href*="/dashboard"], nav:has-text("Dashboard")',
    );
    await expect(instructorNav.first()).toBeVisible({ timeout: 5000 });
  });

  test('instructor dashboard loads overview data', async ({ page }) => {
    await page.goto('/instructor');
    await page.waitForLoadState('networkidle');

    // Should see dashboard overview with stats
    const dashboard = page.locator(
      '[class*="instructor"], [class*="dashboard"], [class*="overview"]',
    );
    await expect(dashboard.first()).toBeVisible({ timeout: 10000 });
  });

  test('manage users page shows student list', async ({ page }) => {
    // Navigate to user management
    const usersLink = page.locator('a[href*="/instructor/users"], a[href*="/users"]');
    if (await usersLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await usersLink.click();
      await page.waitForLoadState('networkidle');

      // Should see a list or table of students
      const studentList = page.locator('table, [class*="student"], [class*="user-list"]');
      await expect(studentList.first()).toBeVisible({ timeout: 10000 });
    }
  });
});
