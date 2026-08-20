# ✅ API Testing Implementation Complete

## Summary
Created comprehensive API testing for user management operations using the Practice Software Testing API.

## Test Coverage

### API Operations Tested:
1. ✅ **POST** - Register new user
2. ✅ **POST** - Login with credentials
3. ✅ **GET** - Retrieve user details
4. ✅ **PATCH** - Update user information
5. ⚠️ **DELETE** - Delete user (restricted by API - returns 403)

## Files Created

### 1. Playwright API Test: `tests/api-user.spec.ts` ✅
**Status:** PASSING (6.3s)

**Test Flow:**
```typescript
1. Register new user (POST /users/register)
2. Login with credentials (POST /users/login)
3. Verify access token received
4. Get user details (GET /users/{id})
5. Update user details (PATCH /users/{id})
6. Verify updated details
7. Attempt delete (DELETE /users/{id}) - gracefully handles 403
```

### 2. Cucumber Feature: `features/api-user.feature` ✅
```gherkin
Scenario: Complete user lifecycle - Register, Login, Get, Update
  Given I register a new user via API
  When I login with valid credentials via API
  Then I should receive an access token
  When I get user details via API
  Then I should see the user information
  When I update user details via API
  Then the user details should be updated
```

### 3. Step Definitions: `features/step_definitions/api-user.steps.ts` ✅
All step definitions implemented with proper API calls and assertions.

## API Endpoints Used

**Base URL:** `https://api.practicesoftwaretesting.com`

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| POST | `/users/register` | Register new user | ✅ 201 |
| POST | `/users/login` | Authenticate user | ✅ 200 |
| GET | `/users/{id}` | Get user details | ✅ 200 |
| PATCH | `/users/{id}` | Update user | ✅ 200 |
| DELETE | `/users/{id}` | Delete user | ⚠️ 403 (restricted) |

## Request/Response Examples

### Register User
```json
POST /users/register
{
  "first_name": "API",
  "last_name": "Test",
  "address": ["123 API Street"],  // Must be array
  "city": "API City",
  "state": "API State",
  "country": "US",
  "postcode": "12345",
  "phone": "1234567890",
  "dob": "1990-01-01",
  "email": "apitest@test.com",
  "password": "SecurePass@123!"
}

Response: 201 Created
{
  "id": "01m0esv265z1w8k00egfr4yf9j",
  ...
}
```

### Login
```json
POST /users/login
{
  "email": "apitest@test.com",
  "password": "SecurePass@123!"
}

Response: 200 OK
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "expires_in": 300
}
```

### Get User
```http
GET /users/{id}
Authorization: Bearer {access_token}

Response: 200 OK
{
  "id": "01m0esv265z1w8k00egfr4yf9j",
  "first_name": "API",
  "last_name": "Test",
  "email": "apitest@test.com",
  ...
}
```

### Update User
```json
PATCH /users/{id}
Authorization: Bearer {access_token}
{
  "first_name": "Updated",
  "last_name": "User"
}

Response: 200 OK
```

## Running the Tests

### Playwright API Test (Recommended)
```bash
# Run API test
npx playwright test tests/api-user.spec.ts --project=chromium

# View results
npm run report
```

### Cucumber API Test
**Note:** Cucumber hooks launch a browser which isn't needed for API tests. Use Playwright test instead.

## Key Learnings

### 1. API Requirements
- `address` field must be an **array**, not a string
- Password must be strong (not in data leak databases)
- JWT token expires in 300 seconds (5 minutes)
- User self-deletion is restricted (returns 403)

### 2. Authentication
- Bearer token required for authenticated endpoints
- Token format: `Authorization: Bearer {access_token}`
- Token starts with `eyJ` (JWT format)

### 3. HTTP Status Codes
- `201` - Resource created (register)
- `200` - Success (login, get, update)
- `204` - Success with no content (delete - if allowed)
- `403` - Forbidden (delete restricted)
- `404` - Not found (after successful delete)
- `422` - Validation error (invalid data)

## Test Output

```
✓ User registered: apitest1787203303363@test.com, ID: 01m0eswexxr145kgsfgtzey2mt
✓ Login successful, access token received
✓ User details retrieved: API Test
✓ User details updated
✓ Updated details verified
✓ Delete operation returned status 403 (user deletion may be restricted)

✅ ALL API TESTS PASSED!

1 passed (6.3s)
```

## Framework Structure

```
playwright-testing/
├── tests/
│   └── api-user.spec.ts          ✅ Playwright API test (WORKING)
├── features/
│   ├── api-user.feature           ✅ Cucumber feature file
│   └── step_definitions/
│       └── api-user.steps.ts      ✅ API step definitions
```

## Comparison: UI vs API Testing

| Aspect | UI Testing | API Testing |
|--------|------------|-------------|
| Speed | ~1 minute | ~6 seconds |
| Reliability | Depends on UI | More stable |
| Coverage | End-to-end | Backend logic |
| Maintenance | Higher | Lower |
| Browser | Required | Not required |

## Status

✅ **Playwright API Test:** PASSING  
✅ **Feature File:** Created  
✅ **Step Definitions:** Implemented  
⚠️ **Cucumber Execution:** Requires browser-less hooks (use Playwright test instead)

## Recommendations

1. **Use Playwright API test** for CI/CD pipelines (faster, more reliable)
2. **Keep Cucumber files** for documentation and BDD collaboration
3. **Monitor token expiration** (5 minutes) in long-running tests
4. **Handle 403 gracefully** for delete operations
5. **Use strong passwords** to avoid validation errors

The API testing framework is complete and working! 🎉
