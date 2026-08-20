import { test, expect } from '@playwright/test';

test('Verify Slip Joint Pliers product flow', async ({ page }) => {
  // Navigate to home page
  await page.goto('https://practicesoftwaretesting.com/#/');
  await page.waitForTimeout(10000);
  
  // Take screenshot
  await page.screenshot({ path: 'homepage.png' });
  
  // Try to find and click product
  try {
    await page.click('[data-test="product-01JJHPZHTDGV8WBKE11XKJ6M7C"]', { timeout: 5000 });
  } catch {
    console.log('Product selector not found, trying text selector');
    await page.locator('text=Slip Joint Pliers').first().click({ timeout: 10000 });
  }
  
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'product-page.png' });
  
  // Add to cart
  await page.click('[data-test="add-to-cart"]');
  await page.waitForTimeout(2000);
  
  // Go to cart
  await page.click('[data-test="nav-cart"]');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: 'cart-page.png' });
  
  console.log('Test completed successfully');
});
