import { test, expect } from '@playwright/test';
import LoginPage from './Pages/login/LoginPage';
import testData from './data/testData.json'
import locators from './Pages/locators.json'


test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.jsp')
    expect(await page.title()).toContain(locators.Home.text.title);
    await page.getByRole('link', { name: locators.Home.text.signIn }).click();
  });
test('Valid Login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.login(process.env.USER, process.env.PASSWORD)
  await expect(page.locator('h1')).toContainText(testData.login.name);

});

test('Invalid Login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.login('username', 'password')
  await expect(page.locator(`[id="${locators.Login.id.mainMessage}"]`)).toContainText(testData.login.errorMessage);
});

test('Log off', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.login(process.env.USER, process.env.PASSWORD)
  await loginPage.logoff()
  await expect(page.getByRole('link', { name: locators.Home.text.signIn })).toBeVisible();
});
});

