import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.setTimeout(120000);

test('Test RegisterPage methods', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  
  // Test navigateToRegister
  console.log('Testing navigateToRegister...');
  await registerPage.navigateToRegister();
  console.log('✓ navigateToRegister completed');
  
  // Test register
  console.log('Testing register...');
  await registerPage.register();
  console.log('✓ register completed');
  
  // Test login
  console.log('Testing login...');
  await registerPage.login();
  console.log('✓ login completed');
  
  const credentials = registerPage.getCredentials();
  console.log(`✓ Credentials: ${credentials.email}`);
  
  console.log('\n✅ ALL RegisterPage TESTS PASSED!');
});
