# 🖥️ VNC Setup Complete - Watch Playwright Tests in Browser!

## ✅ What's Installed

- ✅ Xvfb (Virtual Display)
- ✅ x11vnc (VNC Server)
- ✅ Fluxbox (Window Manager)
- ✅ Playwright configured for headed mode

## 🚀 Quick Start

### Step 1: Start VNC Server
```bash
./start-vnc.sh
```

### Step 2: Connect from Your Laptop

#### Option A: SSH Port Forwarding (Recommended)
```bash
# On your laptop terminal:
ssh -L 5900:localhost:5900 sagemaker-user@your-sagemaker-host

# Then connect VNC client to:
localhost:5900
```

#### Option B: SageMaker Port Forwarding
1. In SageMaker Code Editor, open Command Palette (Cmd/Ctrl + Shift + P)
2. Type "Forward a Port"
3. Enter port: `5900`
4. Connect VNC client to the forwarded address

### Step 3: Run Tests and Watch!
```bash
# Run Playwright tests
DISPLAY=:99 npm test

# Run Cucumber UI tests
DISPLAY=:99 npm run cucumber:ui

# Run specific test
DISPLAY=:99 npx playwright test tests/complete-checkout.spec.ts
```

## 🔗 VNC Clients

### macOS
- **Built-in Screen Sharing**: `vnc://localhost:5900`
- **RealVNC Viewer**: https://www.realvnc.com/download/viewer/

### Windows
- **TightVNC**: https://www.tightvnc.com/download.php
- **RealVNC Viewer**: https://www.realvnc.com/download/viewer/

### Linux
- **Remmina**: `sudo apt install remmina`
- **TigerVNC**: `sudo apt install tigervnc-viewer`

## 📋 Connection Details

- **Display**: :99
- **VNC Port**: 5900
- **Resolution**: 1920x1080x24
- **Password**: None (no password required)

## 🎯 Test Commands

### Headed Mode (Visible in VNC)
```bash
# All tests
DISPLAY=:99 npm test

# Specific test
DISPLAY=:99 npx playwright test tests/complete-checkout.spec.ts

# Cucumber UI tests
DISPLAY=:99 npm run cucumber:ui

# With slower execution
DISPLAY=:99 npx playwright test --headed
```

### Headless Mode (No VNC needed)
```bash
# Just run normally
npm test
npm run cucumber
```

## 🛠️ Management Commands

```bash
# Start VNC server
./start-vnc.sh

# Stop VNC server
./stop-vnc.sh

# Check if VNC is running
ps aux | grep -E "Xvfb|x11vnc|fluxbox"

# Check VNC port
netstat -tuln | grep 5900
```

## 🔍 Troubleshooting

### VNC Connection Refused
```bash
# Check if x11vnc is running
ps aux | grep x11vnc

# Restart VNC server
./stop-vnc.sh
./start-vnc.sh
```

### Can't See Browser Window
```bash
# Verify DISPLAY is set
echo $DISPLAY  # Should show :99

# Run with explicit display
DISPLAY=:99 npm test
```

### Port 5900 Already in Use
```bash
# Kill existing VNC
pkill -9 x11vnc

# Or use different port
x11vnc -display :99 -rfbport 5901
```

### Browser Crashes
```bash
# Install missing dependencies
npx playwright install-deps chromium

# Check Xvfb is running
ps aux | grep Xvfb
```

## 📊 Architecture

```
Your Laptop
     ↓
VNC Client (port 5900)
     ↓
SSH Tunnel / Port Forward
     ↓
SageMaker Code Editor
     ↓
x11vnc (VNC Server)
     ↓
Xvfb (Virtual Display :99)
     ↓
Fluxbox (Window Manager)
     ↓
Playwright (headed mode)
     ↓
Chromium Browser (visible!)
```

## 🎓 What You'll See

When you connect via VNC, you'll see:
1. **Fluxbox desktop** - Gray background with right-click menu
2. **Chromium browser** - Opens when tests run
3. **Test execution** - Watch Playwright automate the browser
4. **Real-time actions** - See clicks, typing, navigation
5. **Slow motion** - Actions slowed down (500ms) for visibility

## 🔧 Configuration Files

### playwright.config.ts
```typescript
use: {
  headless: false,  // Visible browser
  slowMo: 500,      // Slow down actions
}
```

### start-vnc.sh
- Starts Xvfb on display :99
- Starts Fluxbox window manager
- Starts x11vnc on port 5900

## 📝 Example Session

```bash
# 1. Start VNC server
./start-vnc.sh

# 2. On your laptop, forward port
ssh -L 5900:localhost:5900 user@sagemaker

# 3. Connect VNC client to localhost:5900

# 4. Run tests and watch!
DISPLAY=:99 npm test
```

## 🎯 Tips

1. **Slow Motion**: Adjust `slowMo` in playwright.config.ts (500-2000ms)
2. **Resolution**: Change in start-vnc.sh (1920x1080x24)
3. **Multiple Displays**: Use :100, :101 for parallel tests
4. **Screenshots**: Playwright still captures screenshots/videos
5. **Debugging**: Use `page.pause()` to stop and inspect

## 🚀 Advanced Usage

### Run Multiple Tests in Parallel
```bash
# Terminal 1
DISPLAY=:99 npx playwright test tests/test1.spec.ts

# Terminal 2 (different display)
DISPLAY=:100 npx playwright test tests/test2.spec.ts
```

### Record Session
```bash
# Install ffmpeg
sudo apt install ffmpeg

# Record VNC session
ffmpeg -f x11grab -video_size 1920x1080 -i :99 -codec:v libx264 output.mp4
```

### Debug Mode
```bash
# Run with Playwright Inspector
DISPLAY=:99 PWDEBUG=1 npx playwright test
```

## ✅ Verification

After setup, verify everything works:

```bash
# 1. Check VNC server is running
ps aux | grep x11vnc
# Should show: x11vnc -display :99 -forever...

# 2. Check Xvfb is running
ps aux | grep Xvfb
# Should show: Xvfb :99 -screen 0 1920x1080x24...

# 3. Test VNC connection
# Connect VNC client to localhost:5900

# 4. Run a test
DISPLAY=:99 npx playwright test tests/api-user.spec.ts

# 5. Watch the browser in VNC viewer!
```

## 🎉 Success!

You can now:
- ✅ Run Playwright tests in headed mode
- ✅ Watch browser automation in real-time
- ✅ Debug tests visually
- ✅ Record test execution
- ✅ Demo your tests to others

---

**Need help?** Check the troubleshooting section or restart VNC with `./stop-vnc.sh && ./start-vnc.sh`
