import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { RegisterPage } from '../pages/RegisterPage';

test.setTimeout(120000);

test('Test CartPage methods', async ({ page }) => {
  // Setup: register, login, add product
  const registerPage = new RegisterPage(page);
  await registerPage.navigateToRegister();
  await registerPage.register();
  await registerPage.login();
  
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.selectProductAndAddToCart();
  console.log('✓ Product added to cart');
  
  // Test CartPage
  const cartPage = new CartPage(page);
  
  console.log('Testing openCartAndProceed...');
  await cartPage.openCartAndProceed();
  console.log('✓ openCartAndProceed completed');
  
  console.log('\n✅ ALL CartPage TESTS PASSED!');
});
