class LoginPage {
    constructor(page) {
      this.page = page;
      this.username = page.locator('#user-name');
      this.password = page.locator('#password');
      this.loginBtn = page.locator('#login-button');
    }
  
    async navigate() {
      await this.page.goto('/');
    }
  
    async loginAs(username, password) {
      await this.username.fill(username);
      await this.password.fill(password);
      await this.loginBtn.click();
    }
  }
  
  module.exports = { LoginPage };