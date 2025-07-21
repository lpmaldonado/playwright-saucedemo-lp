const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Data Integrity of Cart Totals', () => {
  test('standard_user subtotal matches sum of selected item prices', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    // 1. Login as standard_user
    await login.navigate();
    await login.loginAs('standard_user', 'secret_sauce');

    // 2. Define items to add
    const selectedItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    let expectedTotal = 0;

    // 3. On products page: capture each price and add to cart
    for (const name of selectedItems) {
      const priceLocator = page.locator(`.inventory_item:has-text("${name}") .inventory_item_price`);
      const priceText = await priceLocator.textContent();
      expectedTotal += parseFloat(priceText.replace('$', ''));

      const addBtn = await products.addProduct(name);
      await expect(addBtn).toHaveText('Remove');
    }

    // 4. Proceed to checkout
    await products.goToCart();
    await cart.checkoutInformation('QA', 'Engineer', '54321');

    // 5. Validate displayed subtotal matches expected
    const displayedTotal = await cart.getSubtotal();
    expect(displayedTotal).toBeCloseTo(expectedTotal, 2);

    // 6. Complete order for cleanup
    await cart.finishOrder();
    await expect(cart.completeContainer).toBeVisible();
  });
});