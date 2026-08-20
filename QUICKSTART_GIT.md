# 🚀 Quick Start - Git Workflow

## First Time Setup

### 1. Configure Git User (One-time)
```bash
./setup-git.sh
```

Or manually:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Daily Workflow

### 🌿 Start New Feature

```bash
# Option 1: Use automated script
./git-workflow.sh your-feature-name

# Option 2: Manual
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 💻 Make Changes & Commit

```bash
# Check what changed
git status

# Stage changes
git add .

# Commit with message
git commit -m "type: description"

# Push to GitHub
git push origin feature/your-feature-name
```

### 🔄 Create Pull Request

**After pushing, GitHub will show a link to create PR, or:**

1. Go to: https://github.com/naveen-1504/AI_Sagemaker_Playwright
2. Click "Compare & pull request"
3. Fill in the template
4. Click "Create pull request"

### ✅ Merge & Deploy

1. Get PR approved
2. Click "Merge pull request" on GitHub
3. Choose merge strategy (Squash recommended)
4. Delete feature branch
5. Pipeline auto-deploys (if configured)

## 📝 Example: Complete Flow

```bash
# 1. Setup (first time only)
./setup-git.sh

# 2. Create feature branch
./git-workflow.sh add-payment-page

# 3. Make your changes
# ... edit files ...

# 4. Commit changes
git add pages/PaymentPage.ts tests/payment.spec.ts
git commit -m "feat: add payment page with validation"

# 5. Push to GitHub
git push origin feature/add-payment-page

# 6. Create PR on GitHub
# Visit the link shown in terminal

# 7. After approval, merge on GitHub

# 8. Switch back to main
git checkout main
git pull origin main
git branch -d feature/add-payment-page
```

## 🎯 Commit Message Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance

## 🔗 Useful Links

- **Repository:** https://github.com/naveen-1504/AI_Sagemaker_Playwright
- **Full Guide:** [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)
- **Create PR:** https://github.com/naveen-1504/AI_Sagemaker_Playwright/pulls

## 🆘 Common Commands

```bash
# View current branch
git branch

# View all branches
git branch -a

# Switch branch
git checkout branch-name

# Update from main
git checkout feature/your-feature
git merge origin/main

# Undo last commit (keep changes)
git reset --soft HEAD~1

# View commit history
git log --oneline --graph

# Discard local changes
git checkout -- filename
```

## ✨ Current Example Branch

You're currently on: `feature/registration-field-fixes`

**Next steps:**
1. Configure Git user: `./setup-git.sh`
2. Commit workflow files: `git commit -m "docs: add Git workflow"`
3. Push: `git push origin feature/registration-field-fixes`
4. Create PR on GitHub
5. Merge after review

---

**Need help?** Check [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for detailed guide.
