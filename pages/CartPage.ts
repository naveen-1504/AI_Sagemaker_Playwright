import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async openCartAndProceed() {
    await this.page.click('[data-test="nav-cart"]');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.page.click('[data-test="proceed-1"]');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }
}
