#!/bin/bash

# Git Workflow Script for Safe Code Integration
# Usage: ./git-workflow.sh <feature-name>

set -e

FEATURE_NAME=${1:-"registration-fixes"}
BRANCH_NAME="feature/${FEATURE_NAME}"

echo "🚀 Starting Git Workflow for: ${BRANCH_NAME}"
echo "================================================"

# Step 1: Ensure we're on main and up to date
echo "📥 Step 1: Updating main branch..."
git checkout main
git pull origin main

# Step 2: Create feature branch
echo "🌿 Step 2: Creating feature branch: ${BRANCH_NAME}..."
git checkout -b ${BRANCH_NAME}

echo ""
echo "✅ Feature branch created successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Make your code changes"
echo "   2. Run: git add ."
echo "   3. Run: git commit -m 'Your commit message'"
echo "   4. Run: git push origin ${BRANCH_NAME}"
echo "   5. Open Pull Request on GitHub"
echo ""
echo "🔗 After pushing, create PR at:"
echo "   https://github.com/naveen-1504/AI_Sagemaker_Playwright/compare/${BRANCH_NAME}?expand=1"
