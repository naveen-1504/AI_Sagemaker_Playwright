import { test } from '@playwright/test';

test('Inspect registration form fields', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/#/');
  await page.waitForTimeout(5000);
  
  // Navigate to register
  await page.click('[data-test="nav-sign-in"]');
  await page.waitForTimeout(2000);
  await page.click('[data-test="register-link"]');
  await page.waitForTimeout(3000);
  
  // Get all input fields
  const inputs = await page.locator('input').all();
  console.log(`\nFound ${inputs.length} input fields:\n`);
  
  for (let i = 0; i < inputs.length; i++) {
    const id = await inputs[i].getAttribute('id');
    const name = await inputs[i].getAttribute('name');
    const type = await inputs[i].getAttribute('type');
    const dataTest = await inputs[i].getAttribute('data-test');
    const placeholder = await inputs[i].getAttribute('placeholder');
    
    console.log(`Field ${i + 1}:`);
    console.log(`  ID: ${id}`);
    console.log(`  Name: ${name}`);
    console.log(`  Type: ${type}`);
    console.log(`  Data-test: ${dataTest}`);
    console.log(`  Placeholder: ${placeholder}`);
    console.log('---');
  }
  
  // Get all select fields
  const selects = await page.locator('select').all();
  console.log(`\nFound ${selects.length} select fields:\n`);
  
  for (let i = 0; i < selects.length; i++) {
    const id = await selects[i].getAttribute('id');
    const name = await selects[i].getAttribute('name');
    const dataTest = await selects[i].getAttribute('data-test');
    
    console.log(`Select ${i + 1}:`);
    console.log(`  ID: ${id}`);
    console.log(`  Name: ${name}`);
    console.log(`  Data-test: ${dataTest}`);
    console.log('---');
  }
  
  await page.screenshot({ path: 'registration-form.png', fullPage: true });
  console.log('\nScreenshot saved as registration-form.png');
});
