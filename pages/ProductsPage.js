class ProductsPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProduct(name) {
    const item = this.items.filter({ hasText: name }).first();
    const addButton = item.locator('button:has-text("Add to cart")');
    await addButton.click();
    return item.locator('button:has-text("Remove")');
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
module.exports = { ProductsPage };
