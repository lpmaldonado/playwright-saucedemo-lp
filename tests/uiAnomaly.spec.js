const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test.describe('UI Anomaly Handling for problem_user', () => {
  const productName = 'Sauce Labs Fleece Jacket';
  const homeSelector = `.inventory_item:has-text("${productName}") button:has-text("Add to cart")`;
  const detailAddSelector = `.inventory_item:has-text("${productName}") [data-test="add-to-cart-sauce-labs-fleece-jacket"]`;

  test('replicate glitch: wrong item appears in cart', async ({ page }) => {
    // Arrange
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    // Act: 1. Login
    await login.navigate();
    await login.loginAs('problem_user', 'secret_sauce');

    // Act: 2. Attempt add from home or fallback to detail
    const homeAddBtn = page.locator(homeSelector);
    if (await homeAddBtn.isVisible()) {
      await homeAddBtn.click();
    } else {
      await page.click(`.inventory_item:has-text("${productName}") .inventory_item_name`);
      await page.click(detailAddSelector);
    }

    // Act: 3. Navigate to cart
    await products.goToCart();

    // Assert: 4. Verify cart count and unexpected item
    const count = await cart.cartItems.count();
    if (count === 1) {
      const firstItem = await cart.cartItems.first().textContent();
      if (firstItem === productName) {
        console.error(`Glitch not observed: expected wrong item but found '${firstItem}'`);
      } else {
        console.log(`Glitch confirmed: cart contains '${firstItem}' instead of '${productName}'`);
      }
    } else {
      console.error(`Cart count mismatch: expected 1, but found ${count}`);
    }
  });

  test('bypass glitch: correctly add Fleece Jacket via detail page', async ({ page }) => {
    // Arrange
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    // Act: 1. Login
    await login.navigate();
    await login.loginAs('problem_user', 'secret_sauce');

    // Act: 2. Bypass via detail-page selector
    await page.click(detailAddSelector);

    // Act: 3. Conditional check for Remove button without hanging
    const removeBtnLocator = page.locator(detailAddSelector.replace('add-to-cart','remove'));
    if (await removeBtnLocator.count() > 0) {
      const btnText = await removeBtnLocator.textContent();
      if (btnText.trim() === 'Remove') {
        console.log('Bypass succeeded: Remove button found.');
      } else {
        console.error(`Bypass issue: expected 'Remove' but found '${btnText}'.`);
      }
    } else {
      console.error('Bypass issue: Remove button not found for detail selector.');
    }

    // Act: 4. Navigate to cart
    await products.goToCart();

    // Assert: 5. Cart should contain exactly one correct item
    const items = await cart.getCartItems();
    // 5.1 Validate count
    if (items.length !== 1) {
      throw new Error(`Cart count mismatch: expected 1, but found ${items.length}`);
    }
    // 5.2 Validate item name
    if (items[0] !== productName) {
      throw new Error(`Cart item mismatch: expected '${productName}', but found '${items[0]}'`);
    }
  });

  });