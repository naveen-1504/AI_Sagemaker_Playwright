import { Page } from '@playwright/test';

export class RegisterPage {
  private email: string = '';
  private password: string = '';

  constructor(private page: Page) {}

  async navigateToRegister() {
    await this.page.goto('https://practicesoftwaretesting.com/#/', { waitUntil: 'networkidle', timeout: 90000 });
    await this.page.waitForTimeout(5000);
    await this.page.click('[data-test="nav-sign-in"]');
    await this.page.waitForTimeout(3000);
    await this.page.click('[data-test="register-link"]');
    await this.page.waitForTimeout(5000);
  }

  async register() {
    const timestamp = Date.now();
    this.email = `test${timestamp}@test.com`;
    this.password = `Test@${timestamp}!Secure`;
    
    await this.page.waitForSelector('[data-test="first-name"]', { timeout: 10000 });
    await this.page.fill('[data-test="first-name"]', 'Test');
    await this.page.fill('[data-test="last-name"]', 'User');
    await this.page.fill('[data-test="dob"]', '1990-01-01');
    await this.page.fill('[data-test="postal_code"]', '12345');
    await this.page.fill('[data-test="house_number"]', '42');
    await this.page.fill('[data-test="street"]', 'Test Street');
    await this.page.fill('[data-test="city"]', 'Test City');
    await this.page.fill('[data-test="state"]', 'Test State');
    await this.page.selectOption('[data-test="country"]', 'US');
    await this.page.fill('[data-test="phone"]', '1234567890');
    await this.page.fill('[data-test="email"]', this.email);
    await this.page.fill('[data-test="password"]', this.password);
    await this.page.click('[data-test="register-submit"]');
    await this.page.waitForLoadState('networkidle', { timeout: 90000 });
    await this.page.waitForTimeout(10000);
  }

  async login() {
    await this.page.goto('https://practicesoftwaretesting.com/#/', { waitUntil: 'networkidle', timeout: 90000 });
    await this.page.waitForTimeout(5000);
    await this.page.click('[data-test="nav-sign-in"]');
    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector('[data-test="email"]', { timeout: 15000 });
    await this.page.fill('[data-test="email"]', this.email);
    await this.page.fill('[data-test="password"]', this.password);
    await this.page.click('[data-test="login-submit"]');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
  }

  getCredentials() {
    return { email: this.email, password: this.password };
  }
}
