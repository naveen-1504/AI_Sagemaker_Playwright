import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

let apiContext: any;
let accessToken: string;
let userId: string;
let userEmail: string;
let userPassword: string;

Given('I register a new user via API', async function () {
  const timestamp = Date.now();
  userEmail = `apitest${timestamp}@test.com`;
  userPassword = `SecurePass@${timestamp}!123`;
  
  apiContext = await this.page.request;
  
  const response = await apiContext.post('https://api.practicesoftwaretesting.com/users/register', {
    data: {
      first_name: 'API',
      last_name: 'Test',
      address: ['123 API Street'],
      city: 'API City',
      state: 'API State',
      country: 'US',
      postcode: '12345',
      phone: '1234567890',
      dob: '1990-01-01',
      email: userEmail,
      password: userPassword
    }
  });
  
  expect(response.status()).toBe(201);
  const data = await response.json();
  userId = data.id;
  console.log(`✓ User registered: ${userEmail}, ID: ${userId}`);
});

When('I login with valid credentials via API', async function () {
  const response = await apiContext.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: userEmail,
      password: userPassword
    }
  });
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  accessToken = data.access_token;
  console.log('✓ Login successful, token received');
});

Then('I should receive an access token', async function () {
  expect(accessToken).toBeTruthy();
  expect(accessToken).toContain('eyJ');
  console.log('✓ Access token validated');
});

When('I get user details via API', async function () {
  const response = await apiContext.get(`https://api.practicesoftwaretesting.com/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.email).toBe(userEmail);
  console.log(`✓ User details retrieved: ${data.first_name} ${data.last_name}`);
});

Then('I should see the user information', async function () {
  const response = await apiContext.get(`https://api.practicesoftwaretesting.com/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  const data = await response.json();
  expect(data.first_name).toBe('API');
  expect(data.last_name).toBe('Test');
  console.log('✓ User information verified');
});

When('I update user details via API', async function () {
  const response = await apiContext.patch(`https://api.practicesoftwaretesting.com/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    data: {
      first_name: 'Updated',
      last_name: 'User'
    }
  });
  
  expect(response.status()).toBe(200);
  console.log('✓ User details updated');
});

Then('the user details should be updated', async function () {
  const response = await apiContext.get(`https://api.practicesoftwaretesting.com/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  const data = await response.json();
  expect(data.first_name).toBe('Updated');
  expect(data.last_name).toBe('User');
  console.log('✓ Updated details verified');
});
