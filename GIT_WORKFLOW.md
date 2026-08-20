# 🔄 Git Workflow Guide - Safe Code Integration

## Overview
This guide follows the **Feature Branch Workflow** for safe code integration and deployment.

## 📋 Workflow Steps

### 1️⃣ Create Feature Branch from Main

```bash
# Update main branch
git checkout main
git pull origin main

# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Or use the automated script
chmod +x git-workflow.sh
./git-workflow.sh your-feature-name
```

**Branch Naming Convention:**
- `feature/` - New features (e.g., `feature/add-payment-page`)
- `bugfix/` - Bug fixes (e.g., `bugfix/fix-registration-fields`)
- `hotfix/` - Urgent production fixes
- `docs/` - Documentation updates
- `test/` - Test improvements

### 2️⃣ Develop and Commit Changes

```bash
# Check status
git status

# Stage changes
git add .
# Or stage specific files
git add pages/RegisterPage.ts tests/complete-checkout.spec.ts

# Commit with descriptive message
git commit -m "fix: correct registration form field locators

- Update postal_code field (was postcode)
- Add house_number field
- Update street field (was address)
- Add proper waits after navigation"

# Push to remote
git push origin feature/your-feature-name
```

**Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance

### 3️⃣ Open Pull Request

**Option A: Via GitHub CLI**
```bash
# Install GitHub CLI (if not installed)
# https://cli.github.com/

# Create PR
gh pr create --title "Fix registration form field locators" \
             --body "Updates registration form to use correct field names" \
             --base main \
             --head feature/your-feature-name
```

**Option B: Via GitHub Web**
1. Go to: https://github.com/naveen-1504/AI_Sagemaker_Playwright
2. Click "Compare & pull request" button
3. Fill in PR template:
   - Title: Clear, descriptive title
   - Description: What changed and why
   - Link related issues
4. Click "Create pull request"

### 4️⃣ Review and Discuss

**As Author:**
- Respond to review comments
- Make requested changes on the same branch
- Push updates (they'll automatically appear in PR)

```bash
# Make changes based on feedback
git add .
git commit -m "refactor: address PR review comments"
git push origin feature/your-feature-name
```

**As Reviewer:**
- Review code changes
- Test locally if needed:
```bash
git fetch origin
git checkout feature/your-feature-name
npm install
npm test
```
- Leave comments or approve

### 5️⃣ Merge to Main

**Before Merging:**
```bash
# Ensure tests pass
npm test
npm run cucumber

# Update from main (resolve conflicts if any)
git checkout feature/your-feature-name
git fetch origin
git merge origin/main
# Resolve conflicts if any
git push origin feature/your-feature-name
```

**Merge Options:**

**A. Squash and Merge (Recommended)**
- Combines all commits into one
- Keeps main branch history clean
- Use for: Multiple small commits

**B. Merge Commit**
- Preserves all commits
- Shows full feature history
- Use for: Large features with logical commits

**C. Rebase and Merge**
- Linear history
- No merge commit
- Use for: Clean, well-organized commits

**Via GitHub:**
1. Click "Merge pull request"
2. Choose merge strategy
3. Confirm merge
4. Delete feature branch

**Via Command Line:**
```bash
git checkout main
git pull origin main
git merge --no-ff feature/your-feature-name
git push origin main
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

### 6️⃣ Deploy

**Automatic Deployment (if CI/CD configured):**
- Merge to main triggers pipeline
- Tests run automatically
- Deploys on success

**Manual Deployment:**
```bash
# Pull latest main
git checkout main
git pull origin main

# Run tests
npm test
npm run cucumber

# Deploy (based on your setup)
# Example: Deploy to server, Docker, etc.
```

## 🛡️ Branch Protection Rules

**Recommended Settings (GitHub):**
1. Go to: Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require approvals (1+)
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Require conversation resolution
   - ✅ Do not allow bypassing

## 🚀 Quick Reference Commands

```bash
# Start new feature
./git-workflow.sh feature-name

# Check status
git status

# Stage and commit
git add .
git commit -m "type: description"

# Push feature branch
git push origin feature/feature-name

# Update from main
git checkout feature/feature-name
git merge origin/main

# Delete local branch
git branch -d feature/feature-name

# Delete remote branch
git push origin --delete feature/feature-name

# View branches
git branch -a

# View commit history
git log --oneline --graph --all
```

## 📊 Example Workflow

```bash
# 1. Create feature branch
git checkout main
git pull origin main
git checkout -b feature/add-payment-validation

# 2. Make changes
# ... edit files ...

# 3. Commit changes
git add pages/PaymentPage.ts tests/payment.spec.ts
git commit -m "feat: add payment form validation

- Add credit card validation
- Add expiry date validation
- Add CVV validation
- Add corresponding tests"

# 4. Push to remote
git push origin feature/add-payment-validation

# 5. Create PR on GitHub
# ... create PR via web interface ...

# 6. Address review comments
# ... make changes ...
git add .
git commit -m "refactor: improve validation error messages"
git push origin feature/add-payment-validation

# 7. Merge via GitHub UI
# ... merge PR ...

# 8. Clean up
git checkout main
git pull origin main
git branch -d feature/add-payment-validation
```

## 🔧 Troubleshooting

**Merge Conflicts:**
```bash
# Update from main
git checkout feature/your-feature
git fetch origin
git merge origin/main

# Resolve conflicts in files
# ... edit conflicted files ...

git add .
git commit -m "merge: resolve conflicts with main"
git push origin feature/your-feature
```

**Undo Last Commit (not pushed):**
```bash
git reset --soft HEAD~1  # Keep changes
git reset --hard HEAD~1  # Discard changes
```

**Amend Last Commit:**
```bash
git add .
git commit --amend --no-edit
git push origin feature/your-feature --force
```

## 📚 Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Branching Strategy](https://nvie.com/posts/a-successful-git-branching-model/)

---

**Repository:** https://github.com/naveen-1504/AI_Sagemaker_Playwright
