import { test, expect } from '@playwright/test';
import LoginPage from './LoginPage';
import testData from '../data/testData.json'
import locators from './locators.json'

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.testfire.net/');
    expect(await page.title()).toContain('Altoro Mutual');
    await page.getByRole('link', { name: 'Sign In' }).click();
  });
test('Valid Login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.login(process.env.USER, process.env.PASSWORD)
  await expect(page.locator('h1')).toContainText(testData.login.name);

});

test('Invalid Login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.login('username', 'password')
  await expect(page.locator(`[id="${locators.id.mainMessage}"]`)).toContainText(testData.login.errorMessage);
});
});

