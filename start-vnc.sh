#!/bin/bash

# VNC Server Setup for Playwright Headed Mode
# This script starts Xvfb, x11vnc, and fluxbox window manager

echo "🚀 Starting VNC Server for Playwright..."
echo "=========================================="

# Kill any existing processes
pkill -9 Xvfb 2>/dev/null
pkill -9 x11vnc 2>/dev/null
pkill -9 fluxbox 2>/dev/null

# Set display
export DISPLAY=:99

# Start Xvfb (Virtual Framebuffer)
echo "📺 Starting Xvfb on display :99..."
Xvfb :99 -screen 0 1920x1080x24 -ac +extension GLX +render -noreset &
XVFB_PID=$!
sleep 2

# Start fluxbox window manager
echo "🪟 Starting Fluxbox window manager..."
DISPLAY=:99 fluxbox &
FLUXBOX_PID=$!
sleep 1

# Start x11vnc server
echo "🔗 Starting x11vnc server on port 5900..."
x11vnc -display :99 -forever -shared -rfbport 5900 -nopw &
X11VNC_PID=$!
sleep 2

echo ""
echo "✅ VNC Server Started Successfully!"
echo ""
echo "📋 Connection Details:"
echo "   Display: :99"
echo "   VNC Port: 5900"
echo "   Resolution: 1920x1080"
echo ""
echo "🔗 To connect from your laptop:"
echo "   1. Port forward: ssh -L 5900:localhost:5900 user@sagemaker-host"
echo "   2. Connect VNC client to: localhost:5900"
echo ""
echo "   Or use SageMaker port forwarding:"
echo "   - In SageMaker Studio, go to 'Running Terminals and Kernels'"
echo "   - Forward port 5900"
echo "   - Connect VNC to forwarded port"
echo ""
echo "🧪 Run tests with:"
echo "   DISPLAY=:99 npm test"
echo "   DISPLAY=:99 npm run cucumber:ui"
echo ""
echo "🛑 To stop VNC server:"
echo "   ./stop-vnc.sh"
echo ""
echo "Process IDs:"
echo "   Xvfb: $XVFB_PID"
echo "   Fluxbox: $FLUXBOX_PID"
echo "   x11vnc: $X11VNC_PID"
echo ""

# Save PIDs for stop script
echo "$XVFB_PID" > /tmp/xvfb.pid
echo "$FLUXBOX_PID" > /tmp/fluxbox.pid
echo "$X11VNC_PID" > /tmp/x11vnc.pid
