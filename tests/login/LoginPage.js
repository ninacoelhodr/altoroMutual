import locators  from "../login/locators.json";

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(locators.input.username);
    this.passwordInput = page.locator(locators.input.password);
    this.loginButton = page.getByRole('button', { name: locators.button.login });
}

async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}
}


