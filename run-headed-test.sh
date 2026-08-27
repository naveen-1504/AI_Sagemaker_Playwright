#!/bin/bash

# Run Playwright tests in VISIBLE headed mode on VNC

export DISPLAY=:99

echo "🎬 Running Playwright test in HEADED mode..."
echo "=============================================="
echo ""
echo "✅ VNC Server: localhost:5900"
echo "✅ Display: :99"
echo "✅ Browser will be VISIBLE in VNC viewer"
echo ""
echo "Connect your VNC client to see the browser!"
echo ""

# Run with explicit headed flag
npx playwright test "$@" \
  --headed \
  --project=chromium \
  --workers=1

echo ""
echo "✅ Test completed!"
