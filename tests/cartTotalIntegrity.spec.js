const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test('cart total integrity for dynamic items', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
  for (const item of items) await products.addProductByName(item);
  await products.openCart();

  await cart.checkout();
  await cart.fillShippingInfo('QA', 'Engineer', '54321');

  const prices = await cart.getCartPrices();
  const expected = prices.reduce((a, b) => a + b, 0);
  const displayed = await cart.getItemTotal();
  expect(displayed).toBeCloseTo(expected, 2);
});
