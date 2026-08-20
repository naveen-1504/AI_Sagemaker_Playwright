import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

let homePage: HomePage;
let cartPage: CartPage;
let registerPage: RegisterPage;
let checkoutPage: CheckoutPage;

Given('I navigate to registration page', async function () {
  registerPage = new RegisterPage(this.page);
  await registerPage.navigateToRegister();
});

When('I register a new account', async function () {
  await registerPage.register();
});

When('I sign in with registered credentials', async function () {
  await registerPage.login();
});

When('I navigate to home page', async function () {
  homePage = new HomePage(this.page);
  await homePage.navigate();
});

When('I select a product and add to cart', async function () {
  await homePage.selectProductAndAddToCart();
});

When('I open cart and proceed to checkout', async function () {
  cartPage = new CartPage(this.page);
  await cartPage.openCartAndProceed();
});

Then('I should see logged in message', async function () {
  checkoutPage = new CheckoutPage(this.page);
  const message = await checkoutPage.verifyLoggedInMessage();
  expect(message).toContain('you are already logged in');
});

When('I proceed to billing address', async function () {
  await checkoutPage.proceedToBilling();
});

When('I enter billing address details', async function () {
  await checkoutPage.enterBillingAddress();
});

When('I select bank transfer payment', async function () {
  await checkoutPage.selectBankTransfer();
});

When('I enter bank details and confirm', async function () {
  await checkoutPage.enterBankDetailsAndConfirm();
});

Then('I should see invoice generated', async function () {
  const invoice = await checkoutPage.verifyInvoice();
  expect(invoice).toBeTruthy();
});
