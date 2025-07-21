const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Successful Transaction Validation', () => {
  test('standard_user can complete purchase end-to-end', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    // 1. Login
    await login.navigate();
    await login.loginAs('standard_user', 'secret_sauce');

    // 2. Add specific products
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];
    for (const name of productsToAdd) {
      const btn = await products.addProduct(name);
      await expect(btn).toHaveText('Remove');
    }

    // 3. Validate cart contents
    await products.goToCart();
    const items = await cart.getCartItems();
    expect(items).toEqual(productsToAdd);
    expect(await cart.getCartCount()).toBe(productsToAdd.length);

    // 4. Checkout flow
    await cart.checkoutInformation('QA', 'Engineer', '54321');

    // 5. Price validation
    const expectedTotal = await cart.sumPrices();
    const displayedTotal = await cart.getSubtotal();
    expect(displayedTotal).toBeCloseTo(expectedTotal, 2);

    // 6. Finish order and verify completion
    await cart.finishOrder();
    await expect(cart.completeContainer).toBeVisible();
  });
});
