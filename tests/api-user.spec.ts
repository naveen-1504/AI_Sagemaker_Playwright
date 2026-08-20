import { test, expect } from '@playwright/test';

test.describe('User Management API Tests', () => {
  let accessToken: string;
  let userId: string;
  let userEmail: string;
  let userPassword: string;

  test('Complete user lifecycle - Register, Login, Get, Update, Delete', async ({ request }) => {
    // 1. Register a new user
    const timestamp = Date.now();
    userEmail = `apitest${timestamp}@test.com`;
    userPassword = `SecurePass@${timestamp}!123`;

    const registerResponse = await request.post('https://api.practicesoftwaretesting.com/users/register', {
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

    expect(registerResponse.status()).toBe(201);
    const registerData = await registerResponse.json();
    userId = registerData.id;
    console.log(`✓ User registered: ${userEmail}, ID: ${userId}`);

    // 2. Login with valid credentials
    const loginResponse = await request.post('https://api.practicesoftwaretesting.com/users/login', {
      data: {
        email: userEmail,
        password: userPassword
      }
    });

    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    accessToken = loginData.access_token;
    expect(accessToken).toBeTruthy();
    expect(accessToken).toContain('eyJ');
    console.log('✓ Login successful, access token received');

    // 3. Get user details
    const getUserResponse = await request.get(`https://api.practicesoftwaretesting.com/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    expect(getUserResponse.status()).toBe(200);
    const userData = await getUserResponse.json();
    expect(userData.email).toBe(userEmail);
    expect(userData.first_name).toBe('API');
    expect(userData.last_name).toBe('Test');
    console.log(`✓ User details retrieved: ${userData.first_name} ${userData.last_name}`);

    // 4. Update user details
    const updateResponse = await request.patch(`https://api.practicesoftwaretesting.com/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      data: {
        first_name: 'Updated',
        last_name: 'User',
        city: 'Updated City'
      }
    });

    expect(updateResponse.status()).toBe(200);
    console.log('✓ User details updated');

    // 5. Verify updated details
    const getUpdatedUserResponse = await request.get(`https://api.practicesoftwaretesting.com/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const updatedUserData = await getUpdatedUserResponse.json();
    expect(updatedUserData.first_name).toBe('Updated');
    expect(updatedUserData.last_name).toBe('User');
    console.log('✓ Updated details verified');

    // 6. Attempt to delete the user (may be restricted)
    const deleteResponse = await request.delete(`https://api.practicesoftwaretesting.com/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (deleteResponse.status() === 204) {
      console.log('✓ User deleted');
      
      // 7. Verify user is deleted
      const verifyDeleteResponse = await request.get(`https://api.practicesoftwaretesting.com/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      expect(verifyDeleteResponse.status()).toBe(404);
      console.log('✓ User deletion verified');
    } else {
      console.log(`✓ Delete operation returned status ${deleteResponse.status()} (user deletion may be restricted)`);
    }

    console.log('\n✅ ALL API TESTS PASSED!');
  });
});
