import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';

test.setTimeout(120000);

test('Test HomePage methods', async ({ page }) => {
  // First register and login
  const registerPage = new RegisterPage(page);
  await registerPage.navigateToRegister();
  await registerPage.register();
  await registerPage.login();
  console.log('✓ Logged in');
  
  // Test HomePage
  const homePage = new HomePage(page);
  
  console.log('Testing navigate...');
  await homePage.navigate();
  console.log('✓ navigate completed');
  
  console.log('Testing selectProductAndAddToCart...');
  await homePage.selectProductAndAddToCart();
  console.log('✓ selectProductAndAddToCart completed');
  
  console.log('\n✅ ALL HomePage TESTS PASSED!');
});
