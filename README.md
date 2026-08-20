# Playwright + Cucumber Testing Framework for PracticeSoftwareTesting.com

## Structure
```
playwright-testing/
├── features/
│   ├── step_definitions/
│   │   └── checkout.steps.ts
│   └── checkout.feature
├── pages/
│   ├── HomePage.ts
│   ├── CartPage.ts
│   ├── RegisterPage.ts
│   └── CheckoutPage.ts
├── support/
│   └── hooks.ts
├── tests/
│   └── APImethod.spec.ts
├── utils/
│   └── testData.ts
├── cucumber.js
├── tsconfig.json
└── playwright.config.ts
```

## Run Tests

### Cucumber BDD Tests
```bash
npm run cucumber          # Run Cucumber tests
npm run cucumber:report   # View Cucumber report
```

### Playwright Tests
```bash
npm test                # Run Playwright tests
npm run test:headed     # Run with browser visible
npm run test:ui         # Run with Playwright UI
npm run report          # Show test report
```

## Test Scenario
The framework tests a complete e-commerce checkout flow:
1. Navigate to home page
2. Add product to cart
3. Proceed to cart
4. Proceed to checkout
5. Register new account
6. Complete checkout
7. Validate order confirmation

## VNC Setup (View Browser Remotely)

### Start VNC Server
```bash
./start-vnc.sh
```

### Connect to VNC
1. **Port Forward** (from your local machine):
   ```bash
   ssh -L 5900:localhost:5900 user@your-server
   ```

2. **Connect VNC Client** to `localhost:5900`
   - macOS: Use Screen Sharing or VNC Viewer
   - Windows: Use TightVNC or RealVNC
   - Linux: Use Remmina or Vinagre

### Run Tests with Visible Browser
```bash
DISPLAY=:99 npx playwright test --headed
```
