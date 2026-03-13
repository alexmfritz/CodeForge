import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login with valid credentials redirects to dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.getByLabel('Username').fill('jsmith');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/\/(dashboard|exercises)/, { timeout: 10000 });
    await expect(page.locator('nav')).toBeVisible({ timeout: 5000 });
  });

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await page.getByLabel('Username').fill('jsmith');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Server returns "Invalid credentials" — displayed in an error div
    await expect(page.getByText('Invalid credentials')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('protected route without auth redirects to login', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => localStorage.clear());

    await page.goto('/exercises');

    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test('logout redirects to login', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Username').fill('jsmith');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/(dashboard|exercises)/, { timeout: 10000 });

    // Hover to open the user dropdown menu (opens via onMouseEnter)
    await page.locator('button[aria-haspopup="menu"]').hover();

    // Click Sign Out in the dropdown menu
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });
});
