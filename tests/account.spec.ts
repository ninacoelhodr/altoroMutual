import { test } from '@playwright/test';
import AccountHistoryPage from './Pages/account/Account';
import locators from './Pages/locators.json'

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Account History', () => {
  let accountHistoryPage;

  test.beforeEach(async ({ page }) => {
    accountHistoryPage = new AccountHistoryPage(page);
    await accountHistoryPage.navigateToMyAccount();
  });

  test('Verify Credits Values Within Expected Range', async () => {
    await accountHistoryPage.verifyValuesInRange(locators.Transaction.id.credits, 0.01, 99999999.99);
  });

  test('Verify Debits Values Within Expected Range', async () => {
    await accountHistoryPage.verifyValuesInRange(locators.Transaction.id.debits, 0.01, 99999990.99);
  });
});