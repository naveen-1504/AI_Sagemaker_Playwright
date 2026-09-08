#!/bin/bash

# Stop VNC Server

echo "🛑 Stopping VNC Server..."
echo "========================="

# Kill processes
if [ -f /tmp/x11vnc.pid ]; then
    X11VNC_PID=$(cat /tmp/x11vnc.pid)
    kill $X11VNC_PID 2>/dev/null && echo "✓ Stopped x11vnc (PID: $X11VNC_PID)"
    rm /tmp/x11vnc.pid
fi

if [ -f /tmp/fluxbox.pid ]; then
    FLUXBOX_PID=$(cat /tmp/fluxbox.pid)
    kill $FLUXBOX_PID 2>/dev/null && echo "✓ Stopped fluxbox (PID: $FLUXBOX_PID)"
    rm /tmp/fluxbox.pid
fi

if [ -f /tmp/xvfb.pid ]; then
    XVFB_PID=$(cat /tmp/xvfb.pid)
    kill $XVFB_PID 2>/dev/null && echo "✓ Stopped Xvfb (PID: $XVFB_PID)"
    rm /tmp/xvfb.pid
fi

# Force kill any remaining processes
pkill -9 x11vnc 2>/dev/null
pkill -9 fluxbox 2>/dev/null
pkill -9 Xvfb 2>/dev/null

echo ""
echo "✅ VNC Server stopped"
