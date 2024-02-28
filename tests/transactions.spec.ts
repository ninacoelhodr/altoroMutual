import { test } from '@playwright/test';
import TransactionPage from './Pages/transaction/TransactionPage';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Transactions', () => {
  let transactionPage;

  test.beforeEach(async ({ page }) => {
    transactionPage = new TransactionPage(page);
    await transactionPage.navigateToTransfer();
  });

  test('Sucessfull Transaction', async () => {
    await transactionPage.performTransaction('800003', 10);
    await transactionPage.verifyTransactionSuccess(10, '800003', '800002');

  });

  test('Negative Number', async () => {
    await transactionPage.performTransaction('800003', -2);
    await transactionPage.expectDialogWithMessage("Transfer Amount must be a number greater than 0.");
  });

  test('Zero', async () => {
    await transactionPage.performTransaction('800003', -2);
    await transactionPage.expectDialogWithMessage("Transfer Amount must be a number greater than 0.");
  });

  test('Same account', async () => {
    await transactionPage.performTransaction('800002', -2);
    await transactionPage.expectDialogWithMessage("From Account and To Account fields cannot be the same.");
  });

  test('High Value Transaction', async () => {
    await transactionPage.performTransaction('800003', 9999999);
    await transactionPage.verifyTransactionSuccess(9999999, '800003', '800002');
  });

  test('Non-Numeric Transaction Value', async () => {
    await transactionPage.performTransaction('800003', 'abc');
    await transactionPage.expectDialogWithMessage("Transfer Amount must be a number greater than 0.");
  });

  test('Empty Value Transaction', async () => {
    await transactionPage.performTransaction('800003', '');
    await transactionPage.expectDialogWithMessage("Transfer Amount must be a number greater than 0.");
  });
});

