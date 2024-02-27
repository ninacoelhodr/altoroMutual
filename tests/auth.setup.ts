import { test as setup, expect } from '@playwright/test';


const authFile = 'playwright/.auth/user.json';

let username = process.env.USER ?? '';
let password = process.env.PASSWORD ?? ''

setup('authenticate', async ({ page }) => {
  await page.goto('https://demo.testfire.net/');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('#uid').fill(username);
  await page.locator('#passw').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('h1')).toContainText('Hello John Smith');
  await page.context().storageState({ path: authFile });
});