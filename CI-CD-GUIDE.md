# CI/CD Pipeline Guide

## 🚀 Available Pipelines

### 1. GitHub Actions (`.github/workflows/ci.yml`)
### 2. GitLab CI (`.gitlab-ci.yml`)
### 3. Jenkins (`Jenkinsfile`)
### 4. Docker (`Dockerfile` + `docker-compose.yml`)

---

## 📊 Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CI/CD PIPELINE                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────────────────────┐
        │   Trigger (Push/PR/Schedule)      │
        └───────────────────────────────────┘
                            ↓
        ┌───────────────────────────────────┐
        │   Install Dependencies            │
        │   • npm ci                        │
        │   • playwright install            │
        └───────────────────────────────────┘
                            ↓
        ┌───────────────────────────────────┐
        │   Parallel Test Execution         │
        ├───────────────────────────────────┤
        │  ┌─────────────────────────────┐  │
        │  │   API Tests                 │  │
        │  │   • Cucumber API            │  │
        │  │   • Playwright API          │  │
        │  └─────────────────────────────┘  │
        │  ┌─────────────────────────────┐  │
        │  │   UI Tests                  │  │
        │  │   • Cucumber UI             │  │
        │  │   • Playwright UI           │  │
        │  └─────────────────────────────┘  │
        │  ┌─────────────────────────────┐  │
        │  │   Page Object Tests         │  │
        │  │   • All Page Objects        │  │
        │  └─────────────────────────────┘  │
        └───────────────────────────────────┘
                            ↓
        ┌───────────────────────────────────┐
        │   Generate Reports                │
        │   • Cucumber HTML                 │
        │   • Playwright HTML               │
        │   • Test Videos (on failure)      │
        └───────────────────────────────────┘
                            ↓
        ┌───────────────────────────────────┐
        │   Publish Artifacts               │
        │   • Upload to CI Platform         │
        │   • Deploy to GitHub Pages        │
        │   • Archive Reports               │
        └───────────────────────────────────┘
```

---

## 🔧 Setup Instructions

### GitHub Actions

1. **Enable GitHub Actions**
   ```bash
   # File is already created at .github/workflows/ci.yml
   git add .github/workflows/ci.yml
   git commit -m "Add CI/CD pipeline"
   git push
   ```

2. **Enable GitHub Pages (Optional)**
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Reports will be available at: `https://yourusername.github.io/playwright-testing/reports/`

3. **View Results**
   - Go to Actions tab in your repository
   - Click on latest workflow run
   - Download artifacts or view logs

### GitLab CI

1. **Push Configuration**
   ```bash
   git add .gitlab-ci.yml
   git commit -m "Add GitLab CI pipeline"
   git push
   ```

2. **View Results**
   - Go to CI/CD → Pipelines
   - Click on pipeline to see stages
   - Download artifacts from job page

3. **GitLab Pages**
   - Reports automatically published to: `https://yourusername.gitlab.io/playwright-testing/`

### Jenkins

1. **Prerequisites**
   - Install NodeJS plugin
   - Install HTML Publisher plugin
   - Configure NodeJS 18 in Global Tool Configuration

2. **Create Pipeline**
   - New Item → Pipeline
   - Pipeline → Definition: Pipeline script from SCM
   - SCM: Git
   - Script Path: `Jenkinsfile`

3. **View Reports**
   - Reports available in build artifacts
   - HTML reports in sidebar links

### Docker (Local Testing)

1. **Build and Run**
   ```bash
   # Run all tests
   docker-compose up

   # Run specific service
   docker-compose up api-tests
   docker-compose up ui-tests

   # Build image
   docker build -t playwright-tests .

   # Run container
   docker run -v $(pwd)/playwright-report:/app/playwright-report playwright-tests
   ```

---

## 📋 Pipeline Features

### ✅ Parallel Execution
- API, UI, and Page Object tests run simultaneously
- Faster feedback (3-5 minutes total)

### ✅ Automatic Retries
- Failed tests retry automatically
- Reduces flaky test failures

### ✅ Artifact Management
- Test reports stored for 30 days
- Videos stored for 7 days (failures only)

### ✅ Scheduled Runs
- Daily execution at 2 AM
- Catches environment issues early

### ✅ Multiple Triggers
- Push to main/develop
- Pull requests
- Manual dispatch
- Scheduled (cron)

---

## 🎯 Pipeline Jobs

### Job 1: API Tests (Fast - ~30s)
```bash
npm run cucumber:api
npx playwright test api-user
```
- No browser required
- Quick feedback
- Tests REST API endpoints

### Job 2: UI Tests (Medium - ~2m)
```bash
npm run cucumber:ui
npx playwright test complete-checkout
```
- Full browser automation
- E2E checkout flow
- Captures videos on failure

### Job 3: Page Object Tests (Medium - ~1m)
```bash
npx playwright test RegisterPage HomePage CartPage CheckoutPage
```
- Individual page validation
- Ensures page objects work independently

---

## 📊 Reports & Artifacts

### Generated Reports
```
playwright-testing/
├── cucumber-report.html      # Cucumber BDD Report
├── playwright-report/        # Playwright HTML Report
│   └── index.html
└── test-results/             # Videos & Traces
    └── [test-name]/
        ├── video.webm
        └── trace.zip
```

### Accessing Reports

**GitHub Actions:**
- Actions → Workflow Run → Artifacts
- Download zip files

**GitLab CI:**
- CI/CD → Pipelines → Job → Browse
- Or visit GitLab Pages URL

**Jenkins:**
- Build → Artifacts
- Or click report links in sidebar

**Docker:**
- Reports in mounted volumes
- Check local directories

---

## 🔔 Notifications

### GitHub Actions
- Email notifications via GitHub settings
- Slack integration via webhooks

### GitLab CI
- Email notifications in project settings
- Slack/Teams integration available

### Jenkins
- Email Extension plugin configured
- Sends email on failure

---

## 🛠️ Customization

### Change Test Execution
Edit pipeline files to modify:
- Test commands
- Parallel execution
- Timeout values
- Retry attempts

### Add Environment Variables
```yaml
# GitHub Actions
env:
  BASE_URL: https://practicesoftwaretesting.com
  API_URL: https://api.practicesoftwaretesting.com

# GitLab CI
variables:
  BASE_URL: https://practicesoftwaretesting.com

# Jenkins
environment {
  BASE_URL = 'https://practicesoftwaretesting.com'
}
```

### Add Secrets
- GitHub: Settings → Secrets → Actions
- GitLab: Settings → CI/CD → Variables
- Jenkins: Credentials → Add Credentials

---

## 🚦 Status Badges

### GitHub Actions
```markdown
![CI](https://github.com/username/playwright-testing/workflows/Playwright%20Testing%20CI%2FCD/badge.svg)
```

### GitLab CI
```markdown
![pipeline](https://gitlab.com/username/playwright-testing/badges/main/pipeline.svg)
```

---

## 📈 Best Practices

1. **Run API tests first** - Fast feedback
2. **Parallel execution** - Faster pipelines
3. **Retry flaky tests** - Reduce false failures
4. **Archive reports** - Historical tracking
5. **Schedule nightly runs** - Catch issues early
6. **Use caching** - Faster dependency installation
7. **Fail fast** - Stop on critical failures

---

## 🐛 Troubleshooting

### Tests fail in CI but pass locally
- Check browser versions
- Verify environment variables
- Review timeout settings

### Browser installation fails
```bash
npx playwright install --with-deps chromium
```

### Out of memory errors
- Increase worker count in playwright.config.ts
- Run tests sequentially

### Slow pipeline
- Enable caching
- Use parallel execution
- Optimize test data

---

## 📞 Support

For issues:
1. Check pipeline logs
2. Review test reports
3. Check artifact downloads
4. Verify configuration files
