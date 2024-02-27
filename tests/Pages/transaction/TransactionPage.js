import locators from '../locators.json'
import { expect } from '@playwright/test';
export default class TransactionPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToTransfer() {
        await this.page.goto('/bank/transfer.jsp');
    }

    async navigateToMyAccount() {
        await this.page.getByRole('link', { name: `${locators.NavBar.link.myAccount}` }).click();
        await this.page.getByRole('link', { name: 'Transfer Funds' }).click();
    }

    async performTransaction(toAccount, amount) {
        await this.page.locator('#toAccount').selectOption(toAccount);
        await this.page.locator('#transferAmount').fill(amount.toString());
        await this.page.getByRole('button', { name: 'Transfer Money' }).click();
    }

    async verifyTransactionSuccess(amount, toAccount, fromAccount) {
        await expect(this.page.locator('[id="_ctl0__ctl0_Content_Main_postResp"]'))
            .toContainText(`${amount.toFixed(1)} was successfully transferred from Account ${fromAccount} into Account ${toAccount}`);
    }

    async expectDialogWithMessage(expectedMessage) {
        let message = "";
        this.page.once('dialog', dialog => {
            message = dialog.message();
            dialog.dismiss().catch(() => {});
        });
        await this.page.getByRole('button', { name: 'Transfer Money' }).click();
        expect(message).toContain(expectedMessage);
    }
}