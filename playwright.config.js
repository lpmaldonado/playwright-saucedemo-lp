const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  timeout: 20_000,               
  expect: {
    timeout: 5_000              
  },
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 5_000,        
    navigationTimeout: 5_000,    
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});