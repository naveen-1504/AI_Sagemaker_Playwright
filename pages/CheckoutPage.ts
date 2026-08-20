import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async verifyLoggedInMessage() {
    const message = await this.page.locator('text=/Hello.*you are already logged in.*proceed to checkout/i').textContent({ timeout: 10000 });
    return message || '';
  }

  async proceedToBilling() {
    await this.page.click('[data-test="proceed-2"]');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async enterBillingAddress() {
    await this.page.fill('[data-test="postal_code"]', '54321');
    await this.page.fill('[data-test="house_number"]', '456');
    await this.page.fill('[data-test="street"]', 'Billing Street');
    await this.page.fill('[data-test="city"]', 'Billing City');
    await this.page.fill('[data-test="state"]', 'Billing State');
    await this.page.selectOption('[data-test="country"]', 'US');
    await this.page.click('[data-test="proceed-3"]');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async selectBankTransfer() {
    await this.page.waitForSelector('[data-test="payment-method"]', { timeout: 10000 });
    await this.page.selectOption('[data-test="payment-method"]', 'Bank Transfer');
    await this.page.waitForTimeout(2000);
  }

  async enterBankDetailsAndConfirm() {
    await this.page.waitForSelector('input[id*="bank"], input[id*="account"]', { timeout: 10000 });
    const bankNameField = await this.page.locator('input[id*="bank"]').first();
    const accountNameField = await this.page.locator('input[id*="account"]').nth(0);
    const accountNumberField = await this.page.locator('input[id*="account"]').nth(1);
    
    await bankNameField.fill('Test Bank');
    await accountNameField.fill('Test User');
    await accountNumberField.fill('123456789');
    
    await this.page.click('[data-test="finish"]');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
  }

  async verifyInvoice() {
    await this.page.waitForTimeout(2000);
    const invoiceText = await this.page.locator('text=/payment was successful|INV-|invoice/i').first().textContent({ timeout: 10000 });
    return invoiceText;
  }
}
