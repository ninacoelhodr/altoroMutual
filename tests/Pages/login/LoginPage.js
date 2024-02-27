import locators  from "../locators.json"

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(locators.Login.input.username);
    this.passwordInput = page.locator(locators.Login.input.password);
    this.loginButton = page.getByRole('button', { name: locators.Login.button.login });
    this.logoffButton =  page.getByRole('link', { name: locators.Home.text.sigOff });

}

async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async logoff() {
  await this.logoffButton.click();
}
}


