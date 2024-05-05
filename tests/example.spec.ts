import { expect, test } from '@playwright/test';
import { cleandb } from './cleandb';

test.beforeEach(async () => {
  await cleandb();
});

test('has title', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Sign up').click();
  await page.getByPlaceholder('Your Name').fill('Alice');
  await page.getByPlaceholder('Email').fill('alice@example.com');
  await page.getByPlaceholder('Password').fill('123456789');
  await page.getByRole('button', { name: /Sign up/i }).click();

  await expect(
    page.getByRole('button', { name: /Alice1's Articles/i }),
  ).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible();
});
