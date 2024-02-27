import { test as setup, expect } from '@playwright/test';
import LoginPage from './Pages/login/LoginPage';
import testData from './data/testData.json'


const authFile = 'playwright/.auth/user.json';
setup.use({ storageState: { cookies: [], origins: [] } });

setup('authenticate', async ({ page }) => {
  await page.goto('/login.jsp')
  const loginPage = new LoginPage(page)
  await loginPage.login(process.env.USER, process.env.PASSWORD)
  await expect(page.locator('h1')).toContainText(testData.login.name);
  await page.context().storageState({ path: authFile });
});