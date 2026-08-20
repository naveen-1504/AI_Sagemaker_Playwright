#!/bin/bash

# Complete Git Workflow - Push Current Feature Branch
# This script helps you complete the current workflow example

set -e

echo "🚀 Git Workflow - Complete Feature Branch Push"
echo "================================================"
echo ""

# Check if git user is configured
GIT_USER_NAME=$(git config user.name 2>/dev/null || echo "")
GIT_USER_EMAIL=$(git config user.email 2>/dev/null || echo "")

if [ -z "$GIT_USER_NAME" ] || [ -z "$GIT_USER_EMAIL" ]; then
    echo "⚠️  Git user not configured!"
    echo ""
    echo "Please run: ./setup-git.sh"
    echo ""
    exit 1
fi

echo "✅ Git user configured:"
echo "   Name:  $GIT_USER_NAME"
echo "   Email: $GIT_USER_EMAIL"
echo ""

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"
echo ""

# Show status
echo "📋 Current changes:"
git status --short
echo ""

# Confirm
read -p "Do you want to commit and push these changes? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted."
    exit 0
fi

# Stage all changes
echo "📦 Staging all changes..."
git add .

# Commit
echo ""
echo "💬 Enter commit message (or press Enter for default):"
read -p "Message: " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="docs: add Git workflow automation and guidelines

- Add git-workflow.sh script for automated feature branch creation
- Add comprehensive GIT_WORKFLOW.md guide
- Add QUICKSTART_GIT.md for quick reference
- Add setup-git.sh for Git configuration
- Add pull request template for consistent PRs
- Include branch naming conventions and commit standards"
fi

echo ""
echo "📝 Committing with message:"
echo "   $COMMIT_MSG"
echo ""

git commit -m "$COMMIT_MSG"

# Push
echo ""
echo "🚀 Pushing to origin/$CURRENT_BRANCH..."
git push origin "$CURRENT_BRANCH"

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "🔗 Next steps:"
echo "   1. Create Pull Request at:"
echo "      https://github.com/naveen-1504/AI_Sagemaker_Playwright/compare/${CURRENT_BRANCH}?expand=1"
echo ""
echo "   2. Fill in the PR template"
echo "   3. Request review"
echo "   4. Merge after approval"
echo ""
