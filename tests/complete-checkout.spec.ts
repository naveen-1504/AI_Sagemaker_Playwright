import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test('Complete checkout flow - Register, Login, Add Product, Checkout', async ({ page }) => {
  const timestamp = Date.now();
  const email = `test${timestamp}@test.com`;
  const password = `Test@${timestamp}!Secure`;
  
  // 1. Register new user
  await page.goto('https://practicesoftwaretesting.com/#/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  await page.click('[data-test="nav-sign-in"]');
  await page.waitForTimeout(3000);
  await page.click('[data-test="register-link"]');
  await page.waitForTimeout(5000);
  console.log('✓ Navigated to registration page');
  
  await page.waitForSelector('[data-test="first-name"]', { timeout: 10000 });
  await page.fill('[data-test="first-name"]', 'Test');
  await page.fill('[data-test="last-name"]', 'User');
  await page.fill('[data-test="dob"]', '1990-01-01');
  await page.fill('[data-test="postal_code"]', '12345');
  await page.fill('[data-test="house_number"]', '42');
  await page.fill('[data-test="street"]', 'Test Street');
  await page.fill('[data-test="city"]', 'Test City');
  await page.fill('[data-test="state"]', 'Test State');
  await page.selectOption('[data-test="country"]', 'US');
  await page.fill('[data-test="phone"]', '1234567890');
  await page.fill('[data-test="email"]', email);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="register-submit"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(10000);
  console.log(`✓ Registered user: ${email}`);
  
  // 2. Navigate to home first to bypass Cloudflare, then go to login
  await page.goto('https://practicesoftwaretesting.com/#/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  await page.click('[data-test="nav-sign-in"]');
  await page.waitForTimeout(3000);
  await page.waitForSelector('[data-test="email"]', { timeout: 15000 });
  await page.fill('[data-test="email"]', email);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-submit"]');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  console.log('✓ Signed in successfully');
  
  // 3. Navigate to home page
  await page.goto('https://practicesoftwaretesting.com/#/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  console.log('✓ Navigated to home page');
  
  // 4. Select and click product (Slip Joint Pliers)
  await page.locator('text=Slip Joint Pliers').first().click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  console.log('✓ Selected Slip Joint Pliers product');
  
  // 5. Add to cart
  await page.click('[data-test="add-to-cart"]');
  await page.waitForTimeout(2000);
  console.log('✓ Added product to cart');
  
  // 6. Click cart icon
  await page.click('[data-test="nav-cart"]');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  console.log('✓ Opened cart');
  
  // 7. Proceed to checkout
  await page.click('[data-test="proceed-1"]');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  console.log('✓ Proceeded to checkout');
  
  // 8. Verify logged-in message
  const loggedInMessage = await page.locator('text=/Hello.*you are already logged in.*proceed to checkout/i').textContent({ timeout: 10000 });
  expect(loggedInMessage).toContain('you are already logged in');
  console.log(`✓ Verified message: ${loggedInMessage}`);
  
  // 9. Click proceed to checkout button
  await page.click('[data-test="proceed-2"]');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  console.log('✓ Proceeded to billing address');
  
  // 10. Enter billing address
  await page.fill('[data-test="postal_code"]', '54321');
  await page.fill('[data-test="house_number"]', '456');
  await page.fill('[data-test="street"]', 'Billing Street');
  await page.fill('[data-test="city"]', 'Billing City');
  await page.fill('[data-test="state"]', 'Billing State');
  await page.selectOption('[data-test="country"]', 'US');
  await page.click('[data-test="proceed-3"]');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  console.log('✓ Entered billing address and proceeded');
  
  // 11. Select Bank Transfer payment method
  await page.waitForSelector('[data-test="payment-method"]', { timeout: 10000 });
  await page.selectOption('[data-test="payment-method"]', 'Bank Transfer');
  await page.waitForTimeout(2000);
  console.log('✓ Selected Bank Transfer');
  
  // 12. Enter bank details - wait for fields to appear
  await page.waitForSelector('input[id*="bank"], input[id*="account"]', { timeout: 10000 });
  const bankNameField = await page.locator('input[id*="bank"]').first();
  const accountNameField = await page.locator('input[id*="account"]').nth(0);
  const accountNumberField = await page.locator('input[id*="account"]').nth(1);
  
  await bankNameField.fill('Test Bank');
  await accountNameField.fill('Test User');
  await accountNumberField.fill('123456789');
  console.log('✓ Entered bank details');
  
  // 13. Confirm order
  await page.click('[data-test="finish"]');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  console.log('✓ Confirmed order');
  
  // 14. Verify invoice generation
  await page.waitForTimeout(2000);
  const invoiceText = await page.locator('text=/payment was successful|INV-|invoice/i').first().textContent({ timeout: 10000 });
  console.log(`✓ Invoice generated: ${invoiceText}`);
  expect(invoiceText).toBeTruthy();
  
  console.log('\n✅ ALL STEPS COMPLETED SUCCESSFULLY!');
});
