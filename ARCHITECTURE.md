# Playwright + Cucumber Testing Framework Architecture

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEST EXECUTION LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐      ┌──────────────────────┐       │
│  │   Cucumber BDD       │      │   Playwright Tests   │       │
│  │   (cucumber.js)      │      │   (playwright.config)│       │
│  └──────────────────────┘      └──────────────────────┘       │
│           │                              │                      │
│           ├─── UI Profile                ├─── UI Tests         │
│           └─── API Profile               └─── API Tests        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    TEST FRAMEWORK LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────┐         ┌────────────────────┐        │
│  │  Feature Files     │         │  Step Definitions  │        │
│  ├────────────────────┤         ├────────────────────┤        │
│  │ • checkout.feature │────────▶│ • checkout.steps   │        │
│  │ • api-user.feature │────────▶│ • api-user.steps   │        │
│  └────────────────────┘         └────────────────────┘        │
│                                           │                     │
│  ┌────────────────────┐                  │                     │
│  │  Support/Hooks     │                  │                     │
│  ├────────────────────┤                  │                     │
│  │ • hooks.ts (UI)    │◀─────────────────┘                     │
│  │ • api-hooks.ts     │                                        │
│  └────────────────────┘                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    PAGE OBJECT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ RegisterPage │  │  HomePage    │  │  CartPage    │        │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤        │
│  │ • register() │  │ • navigate() │  │ • openCart() │        │
│  │ • login()    │  │ • addToCart()│  │ • proceed()  │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────────────────────────────────────────┐         │
│  │           CheckoutPage                           │         │
│  ├──────────────────────────────────────────────────┤         │
│  │ • verifyLoggedInMessage()                        │         │
│  │ • proceedToBilling()                             │         │
│  │ • enterBillingAddress()                          │         │
│  │ • selectBankTransfer()                           │         │
│  │ • enterBankDetailsAndConfirm()                   │         │
│  │ • verifyInvoice()                                │         │
│  └──────────────────────────────────────────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐      ┌──────────────────────┐       │
│  │   UI Application     │      │   REST API           │       │
│  │   (Browser)          │      │   (HTTP Requests)    │       │
│  ├──────────────────────┤      ├──────────────────────┤       │
│  │ practicesoftware     │      │ /users/register      │       │
│  │ testing.com          │      │ /users/login         │       │
│  │                      │      │ /users/{id}          │       │
│  │ • Home Page          │      │ PATCH /users/{id}    │       │
│  │ • Cart               │      │ DELETE /users/{id}   │       │
│  │ • Checkout           │      │                      │       │
│  └──────────────────────┘      └──────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Test Flow Architecture

### UI Test Flow (Cucumber + Playwright)
```
┌─────────────────────────────────────────────────────────────────┐
│                      UI TEST EXECUTION                          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
    npm run cucumber:ui
                            ↓
    ┌───────────────────────────────────────┐
    │  cucumber.js (UI Profile)             │
    │  • Uses hooks.ts                      │
    │  • Launches Chromium Browser          │
    │  • Desktop Chrome Device              │
    └───────────────────────────────────────┘
                            ↓
    ┌───────────────────────────────────────┐
    │  checkout.feature                     │
    │  • 12 BDD Steps                       │
    └───────────────────────────────────────┘
                            ↓
    ┌───────────────────────────────────────┐
    │  checkout.steps.ts                    │
    │  • Maps Gherkin to Page Objects       │
    └───────────────────────────────────────┘
                            ↓
    ┌───────────────────────────────────────┐
    │  Page Objects (RegisterPage, etc.)    │
    │  • Interact with Browser              │
    │  • Perform Actions                    │
    │  • Validate Results                   │
    └───────────────────────────────────────┘
                            ↓
    ┌───────────────────────────────────────┐
    │  Browser (Chromium)                   │
    │  • Renders UI                         │
    │  • Executes User Actions              │
    └───────────────────────────────────────┘
```

### API Test Flow (Cucumber + Playwright Request)
```
┌─────────────────────────────────────────────────────────────────┐
│                     API TEST EXECUTION                          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
    npm run cucumber:api
                            ↓
    ┌───────────────────────────────────────┐
    │  cucumber.js (API Profile)            │
    │  • Uses api-hooks.ts                  │
    │  • NO Browser Launch                  │
    │  • Request Context Only               │
    └───────────────────────────────────────┘
                            ↓
    ┌───────────────────────────────────────┐
    │  api-user.feature                     │
    │  • 7 BDD Steps (@api tag)             │
    └───────────────────────────────────────┘
                            ↓
    ┌───────────────────────────────────────┐
    │  api-user.steps.ts                    │
    │  • Direct HTTP Requests               │
    │  • JWT Token Management               │
    └───────────────────────────────────────┘
                            ↓
    ┌───────────────────────────────────────┐
    │  REST API                             │
    │  • POST /users/register               │
    │  • POST /users/login                  │
    │  • GET /users/{id}                    │
    │  • PATCH /users/{id}                  │
    └───────────────────────────────────────┘
```

## 📁 Project Structure

```
playwright-testing/
│
├── 📋 features/                    # BDD Feature Files
│   ├── checkout.feature            # UI E2E Checkout Scenario
│   ├── api-user.feature            # API User Management Scenario
│   │
│   └── step_definitions/           # Step Implementation
│       ├── checkout.steps.ts       # UI Steps → Page Objects
│       └── api-user.steps.ts       # API Steps → HTTP Requests
│
├── 📄 pages/                       # Page Object Model
│   ├── RegisterPage.ts             # Registration & Login
│   ├── HomePage.ts                 # Product Selection
│   ├── CartPage.ts                 # Cart Management
│   └── CheckoutPage.ts             # Checkout & Payment
│
├── 🔧 support/                     # Test Hooks & Setup
│   ├── hooks.ts                    # UI Browser Hooks
│   └── api-hooks.ts                # API Request Hooks
│
├── 🧪 tests/                       # Playwright Tests
│   ├── complete-checkout.spec.ts   # UI E2E Test
│   ├── api-user.spec.ts            # API Test
│   ├── RegisterPage.spec.ts        # Page Object Tests
│   ├── HomePage.spec.ts
│   ├── CartPage.spec.ts
│   └── CheckoutPage.spec.ts
│
├── ⚙️ Configuration Files
│   ├── cucumber.js                 # Cucumber Profiles (UI/API)
│   ├── playwright.config.ts        # Playwright Config
│   ├── tsconfig.json               # TypeScript Config
│   └── package.json                # Dependencies & Scripts
│
└── 📊 Reports/                     # Test Reports
    ├── cucumber-report.html        # Cucumber HTML Report
    └── playwright-report/          # Playwright HTML Report
```

## 🎯 Test Scenarios

### UI E2E Checkout Flow
```
1. Register User
   ↓
2. Login
   ↓
3. Navigate Home
   ↓
4. Add Product (Slip Joint Pliers)
   ↓
5. Open Cart
   ↓
6. Proceed to Checkout
   ↓
7. Verify Logged In
   ↓
8. Proceed to Billing
   ↓
9. Enter Billing Address
   ↓
10. Select Bank Transfer
    ↓
11. Enter Bank Details
    ↓
12. Verify Invoice
```

### API User Management Flow
```
1. Register User (POST)
   ↓
2. Login (POST) → Get JWT Token
   ↓
3. Get User Details (GET)
   ↓
4. Verify User Info
   ↓
5. Update User (PATCH)
   ↓
6. Verify Update
   ↓
7. Attempt Delete (403 Expected)
```

## 🚀 Key Features

### ✅ Dual Testing Approach
- **Cucumber BDD**: Business-readable scenarios
- **Playwright Tests**: Direct test implementation

### ✅ Separation of Concerns
- **UI Profile**: Browser-based tests
- **API Profile**: HTTP request tests (no browser)

### ✅ Page Object Model
- Reusable page components
- Maintainable test code
- Clear abstraction layers

### ✅ Robust Selectors
- Flexible field locators
- Network idle waits
- Error handling

### ✅ Comprehensive Coverage
- E2E checkout flow
- API user lifecycle
- Individual page object validation

## 🛠️ Technology Stack

```
┌─────────────────────────────────────────┐
│  Testing Framework                      │
│  • Playwright (Browser Automation)      │
│  • Cucumber (BDD Framework)             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Language & Runtime                     │
│  • TypeScript                           │
│  • Node.js                              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Browser                                │
│  • Chromium (Desktop Chrome)            │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Reporting                              │
│  • Cucumber HTML Reporter               │
│  • Playwright HTML Reporter             │
│  • Pretty Formatter (Console)           │
└─────────────────────────────────────────┘
```

## 📊 Demo Commands

```bash
# Run All UI Tests (Cucumber)
npm run cucumber:ui

# Run All API Tests (Cucumber)
npm run cucumber:api

# Run Playwright UI Test
npx playwright test complete-checkout

# Run Playwright API Test
npx playwright test api-user

# View Reports
npm run cucumber:report    # Cucumber Report
npm run report             # Playwright Report

# Run with UI Visible
npm run test:headed
DISPLAY=:99 npx playwright test --headed
```

## 🎓 Architecture Highlights for Demo

1. **Clean Separation**: UI and API tests completely isolated
2. **Reusability**: Page objects used across Cucumber and Playwright
3. **Scalability**: Easy to add new features and scenarios
4. **Maintainability**: Single source of truth for page interactions
5. **Flexibility**: Run tests individually or as suites
6. **Reporting**: Multiple report formats for different audiences
