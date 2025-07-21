const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test.describe('problem_user UI anomaly', () => {
  test('wrong item appears when adding Fleece Jacket', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    await login.goto();
    await login.login('problem_user', 'secret_sauce');
    await products.addProductByName('Sauce Labs Fleece Jacket');
    await products.openCart();
    const cartItem = await page.textContent('.cart_item .inventory_item_name');
    expect(cartItem).not.toBe('Sauce Labs Fleece Jacket');
  });

  test('bypass glitch to add correct Fleece Jacket', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    await login.goto();
    await login.login('problem_user', 'secret_sauce');
    await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    await products.openCart();
    const names = await page.$$eval(
      '.cart_item .inventory_item_name', els => els.map(e => e.textContent)
    );
    expect(names).toContain('Sauce Labs Fleece Jacket');
  });
});

