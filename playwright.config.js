const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
