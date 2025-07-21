class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item .inventory_item_name');
    this.checkoutBtn = page.locator('#checkout');
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
    this.subtotal = page.locator('.summary_subtotal_label');
    this.prices = page.locator('.cart_item .inventory_item_price');
    this.completeContainer = page.locator('[data-test="checkout-complete-container"]');
  }

  async getCartItems() {
    return this.cartItems.allTextContents();
  }

  async getCartCount() {
    return this.cartItems.count();
  }

  async checkoutInformation(first, last, zip) {
    await this.checkoutBtn.click();
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueBtn.click();
  }

  async sumPrices() {
    const values = await this.prices.allTextContents();
    return values.map(v => parseFloat(v.replace('$', ''))).reduce((sum, p) => sum + p, 0);
  }

  async getSubtotal() {
    const text = await this.subtotal.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async finishOrder() {
    await this.finishBtn.click();
  }

  async isOrderComplete() {
    return this.completeContainer.isVisible();
  }
}

module.exports = { CartPage };