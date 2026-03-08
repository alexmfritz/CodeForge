import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login with valid credentials redirects to dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="username"]', 'auser');
    await page.fill('input[name="password"]', '000000');
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/(dashboard|exercises)/, { timeout: 10000 });

    // Should show user info or navigation
    await expect(page.locator('nav, [data-testid="app-shell"]')).toBeVisible({ timeout: 5000 });
  });

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="username"]', 'auser');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show an error message on the login page
    await expect(page.locator('text=/invalid|incorrect|failed|error/i')).toBeVisible({ timeout: 5000 });

    // Should still be on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('protected route without auth redirects to login', async ({ page }) => {
    // Clear any existing auth state
    await page.goto('/login');
    await page.evaluate(() => localStorage.clear());

    // Try to access protected route
    await page.goto('/exercises');

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test('logout redirects to login', async ({ page }) => {
    // First login
    await page.goto('/login');
    await page.fill('input[name="username"]', 'auser');
    await page.fill('input[name="password"]', '000000');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/(dashboard|exercises)/, { timeout: 10000 });

    // Find and click logout
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Log out"), [aria-label="Logout"]');
    if (await logoutButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await logoutButton.click();
      await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
    } else {
      // Logout may be in a menu — try clicking user menu first
      const userMenu = page.locator('[data-testid="user-menu"], button:has-text("auser")');
      if (await userMenu.isVisible({ timeout: 2000 }).catch(() => false)) {
        await userMenu.click();
        await page.locator('text=/logout|log out/i').click();
        await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
      }
    }
  });
});
