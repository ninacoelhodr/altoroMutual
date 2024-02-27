import { expect } from '@playwright/test';
import testData from '../../data/testData.json';

export default class AccountHistoryPage {
  constructor(page) {
    this.page = page;
}
  async navigateToMyAccount() {
    await this.page.goto('/bank/showAccount?listAccounts=800003');
    await expect(this.page.getByRole('heading')).toContainText(testData.MyAccount.acocuntHistory);
  }

  async verifyValuesInRange(locatorId, min, max) {
    let table = this.page.locator(`div[id=${locatorId}]`).locator("table > tbody");
    await table.scrollIntoViewIfNeeded();
    const rowCount = await table.locator('tr').count();
    const valuePromises = [];

    for (let i = 0; i < rowCount; i++) {
      valuePromises.push(table.locator('tr').nth(i).locator('td').last().innerText());
    }

    const values = await Promise.all(valuePromises);
    values.forEach((value) => {
      expect(parseFloat(value)).toBeGreaterThanOrEqual(min);
      expect(parseFloat(value)).toBeLessThanOrEqual(max);
    });
  }
}
