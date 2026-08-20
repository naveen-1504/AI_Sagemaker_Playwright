#!/bin/bash

# Git Configuration Setup Script

echo "🔧 Git Configuration Setup"
echo "=========================="
echo ""

# Check if git user is already configured
GIT_USER_NAME=$(git config user.name)
GIT_USER_EMAIL=$(git config user.email)

if [ -z "$GIT_USER_NAME" ] || [ -z "$GIT_USER_EMAIL" ]; then
    echo "⚠️  Git user not configured. Let's set it up!"
    echo ""
    
    read -p "Enter your name: " USER_NAME
    read -p "Enter your email: " USER_EMAIL
    
    git config --global user.name "$USER_NAME"
    git config --global user.email "$USER_EMAIL"
    
    echo ""
    echo "✅ Git user configured successfully!"
else
    echo "✅ Git user already configured:"
fi

echo ""
echo "Current Git Configuration:"
echo "  Name:  $(git config user.name)"
echo "  Email: $(git config user.email)"
echo ""

# Configure helpful Git settings
echo "🔧 Configuring additional Git settings..."
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global core.editor "nano"

echo "✅ Git configuration complete!"
