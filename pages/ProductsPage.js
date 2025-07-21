class ProductsPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  /**
   * Adds a product by visible name and ensures the button toggles.
   * @param {string} name Exact product name text.
   * @returns {import('@playwright/test').Locator} The button locator after click.
   */
  async addProduct(name) {
    const item = this.items.filter({ hasText: name }).first();
    const button = item.locator('button');
    await button.click();
    await this.page.waitForSelector(`.inventory_item:has-text("${name}") >> button:text("Remove")`);
    return button;
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { ProductsPage };
