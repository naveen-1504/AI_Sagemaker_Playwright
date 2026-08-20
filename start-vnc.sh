#!/bin/bash

# Kill existing processes
pkill -f "Xvfb :99" 2>/dev/null
pkill x11vnc 2>/dev/null
rm -f /tmp/.X99-lock 2>/dev/null

sleep 1

# Start Xvfb on display :99
Xvfb :99 -screen 0 1920x1080x24 -ac &
export DISPLAY=:99

# Wait for Xvfb to start
sleep 2

# Start x11vnc on port 5900 without password
x11vnc -display :99 -forever -shared -rfbport 5900 -nopw &

echo "VNC Server started on port 5900"
echo "Connect using: localhost:5900"
echo ""
echo "To run tests with visible browser:"
echo "  DISPLAY=:99 npx playwright test --headed"
echo ""
echo "Press Ctrl+C to stop"

# Keep script running
wait
