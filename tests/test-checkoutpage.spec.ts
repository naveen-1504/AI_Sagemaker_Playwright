import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.setTimeout(120000);

test('Test CheckoutPage methods', async ({ page }) => {
  // Setup: register, login, add product, go to checkout
  const registerPage = new RegisterPage(page);
  await registerPage.navigateToRegister();
  await registerPage.register();
  await registerPage.login();
  
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.selectProductAndAddToCart();
  
  const cartPage = new CartPage(page);
  await cartPage.openCartAndProceed();
  console.log('✓ At checkout page');
  
  // Test CheckoutPage
  const checkoutPage = new CheckoutPage(page);
  
  console.log('Testing verifyLoggedInMessage...');
  const message = await checkoutPage.verifyLoggedInMessage();
  expect(message).toContain('you are already logged in');
  console.log('✓ verifyLoggedInMessage completed');
  
  console.log('Testing proceedToBilling...');
  await checkoutPage.proceedToBilling();
  console.log('✓ proceedToBilling completed');
  
  console.log('Testing enterBillingAddress...');
  await checkoutPage.enterBillingAddress();
  console.log('✓ enterBillingAddress completed');
  
  console.log('Testing selectBankTransfer...');
  await checkoutPage.selectBankTransfer();
  console.log('✓ selectBankTransfer completed');
  
  console.log('Testing enterBankDetailsAndConfirm...');
  await checkoutPage.enterBankDetailsAndConfirm();
  console.log('✓ enterBankDetailsAndConfirm completed');
  
  console.log('Testing verifyInvoice...');
  const invoice = await checkoutPage.verifyInvoice();
  expect(invoice).toBeTruthy();
  console.log('✓ verifyInvoice completed');
  
  console.log('\n✅ ALL CheckoutPage TESTS PASSED!');
});
