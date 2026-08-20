import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://practicesoftwaretesting.com/#/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
  }

  async selectProductAndAddToCart() {
    await this.page.locator('text=Slip Joint Pliers').first().click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    await this.page.click('[data-test="add-to-cart"]');
    await this.page.waitForTimeout(2000);
  }
}
