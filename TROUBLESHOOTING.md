# TypeMaster Troubleshooting Guide

## 📋 Table of Contents
- [Common Issues](#common-issues)
- [Sound Issues](#sound-issues)
- [Authentication Issues](#authentication-issues)
- [Performance Issues](#performance-issues)
- [Display Issues](#display-issues)
- [Browser-Specific Issues](#browser-specific-issues)
- [Mobile Issues](#mobile-issues)
- [Data & Sync Issues](#data--sync-issues)
- [Error Messages](#error-messages)
- [Getting Help](#getting-help)

---

## 🔧 Common Issues

### Test Won't Start

**Symptoms**: Clicking "Start" button does nothing

**Solutions**:
1. **Refresh the page** (Ctrl+F5 or Cmd+Shift+R)
2. **Clear browser cache**:
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Options → Privacy → Clear Data
3. **Check console for errors**:
   - Press F12 → Console tab
   - Look for red error messages
4. **Try a different browser**
5. **Disable browser extensions** that might interfere

---

### Words Not Appearing

**Symptoms**: Word container is empty

**Solutions**:
1. **Check JavaScript is enabled** in browser settings
2. **Verify internet connection** (for Firebase features)
3. **Refresh the page**
4. **Check browser console** for errors
5. **Try different game mode**

---

### Input Field Not Working

**Symptoms**: Can't type in the input field

**Solutions**:
1. **Click directly on the input field**
2. **Check if test is running** (start it first)
3. **Verify input field is not disabled**
4. **Close any open modals**
5. **Refresh the page**

---

### Stats Not Updating

**Symptoms**: WPM, accuracy, etc. stay at 0

**Solutions**:
1. **Ensure test has started** (timer is counting down)
2. **Type complete words** (press Space after each word)
3. **Check if you're typing correct words**
4. **Refresh and try again**
5. **Check console for JavaScript errors**

---

## 🔊 Sound Issues

### No Sound Playing

**Symptoms**: Keyboard sounds don't play when typing

**Solutions**:
1. **Check sound is not set to "None"**:
   - Settings → Keyboard Sound → Select any sound except "None"

2. **Check volume is not at 0%**:
   - Settings → Sound Volume → Drag slider above 0%

3. **Unmute browser tab**:
   - Right-click tab → Unmute site

4. **Check system volume**:
   - Ensure computer/device volume is up
   - Check if headphones are connected properly

5. **Click on page first**:
   - Some browsers require user interaction before playing audio
   - Click anywhere on the page, then try typing

6. **Check browser permissions**:
   - Allow audio playback in browser settings

7. **Try different sound type**:
   - Some sounds may work better than others

8. **Disable browser extensions**:
   - Ad blockers or privacy extensions might block audio

---

### Sound Cutting Out

**Symptoms**: Sounds play intermittently or stop

**Solutions**:
1. **Reduce typing speed** temporarily
2. **Lower volume** to 50-70%
3. **Try different sound type** (Soft or Silent)
4. **Close other tabs** using audio
5. **Check CPU usage** (close unnecessary programs)
6. **Update browser** to latest version

---

### Sound Too Loud/Quiet

**Symptoms**: Volume is uncomfortable

**Solutions**:
1. **Adjust volume slider** in settings (0-100%)
2. **Try different sound type**:
   - Loud: Mechanical, Typewriter, Clicky
   - Quiet: Soft, Silent, ASMR
3. **Adjust system volume**
4. **Use headphones** for better control

---

### Sound Distorted

**Symptoms**: Crackling, popping, or distorted audio

**Solutions**:
1. **Lower volume** to 50% or below
2. **Try different sound type**
3. **Close other audio applications**
4. **Update audio drivers** (desktop)
5. **Restart browser**
6. **Check for browser updates**

---

## 🔐 Authentication Issues

### Can't Sign Up

**Symptoms**: Sign up button doesn't work or shows error

**Solutions**:
1. **Check password requirements**:
   - At least 8 characters
   - One uppercase letter
   - One lowercase letter
   - One number

2. **Verify email format**:
   - Must be valid email (user@example.com)
   - No spaces or special characters

3. **Check username**:
   - Must be unique
   - 3-20 characters
   - Letters, numbers, underscores only

4. **Check internet connection**

5. **Try Google Sign-In** instead

6. **Clear browser cache** and try again

---

### Can't Log In

**Symptoms**: Login fails with error message

**Solutions**:
1. **Verify email and password** are correct
2. **Check Caps Lock** is off
3. **Reset password** if forgotten (feature coming soon)
4. **Try Google Sign-In** instead
5. **Check internet connection**
6. **Clear browser cookies**
7. **Try different browser**

---

### Google Sign-In Not Working

**Symptoms**: Google popup doesn't appear or fails

**Solutions**:
1. **Allow popups** for the site:
   - Browser settings → Site settings → Popups → Allow

2. **Check if logged into Google**:
   - Log into Google account first

3. **Clear browser cache and cookies**

4. **Disable popup blockers**

5. **Try incognito/private mode**

6. **Check browser extensions**:
   - Disable privacy/security extensions temporarily

7. **Use different browser**

---

### Not Staying Logged In

**Symptoms**: Logged out after refresh

**Solutions**:
1. **Enable cookies** in browser settings
2. **Don't use incognito/private mode**
3. **Check "Remember me"** (if available)
4. **Allow third-party cookies** for Firebase
5. **Clear cache but keep cookies**

---

## ⚡ Performance Issues

### Slow Loading

**Symptoms**: Page takes long to load

**Solutions**:
1. **Check internet speed**:
   - Run speed test at speedtest.net
   - Minimum 1 Mbps recommended

2. **Clear browser cache**

3. **Disable browser extensions**

4. **Close unnecessary tabs**

5. **Update browser** to latest version

6. **Try different browser**

7. **Restart computer/device**

---

### Laggy Typing

**Symptoms**: Delay between typing and display

**Solutions**:
1. **Disable keyboard sounds** (set to "None")
2. **Close other applications**
3. **Disable browser extensions**
4. **Clear browser cache**
5. **Use simpler theme** (Light theme)
6. **Reduce browser zoom** to 100%
7. **Update graphics drivers** (desktop)
8. **Try different browser**

---

### High CPU Usage

**Symptoms**: Computer slows down, fan runs loud

**Solutions**:
1. **Disable keyboard sounds**
2. **Close other tabs and applications**
3. **Disable animations** (use Simple theme)
4. **Reduce test duration** (use 30s instead of 5min)
5. **Update browser**
6. **Restart browser**

---

## 🖥️ Display Issues

### Layout Broken

**Symptoms**: Elements overlapping or misaligned

**Solutions**:
1. **Refresh page** (Ctrl+F5)
2. **Reset browser zoom** to 100% (Ctrl+0)
3. **Clear browser cache**
4. **Try different browser**
5. **Update browser** to latest version
6. **Disable browser extensions**
7. **Check screen resolution** (minimum 1024x768)

---

### Text Too Small/Large

**Symptoms**: Uncomfortable text size

**Solutions**:
1. **Adjust browser zoom**:
   - Zoom in: Ctrl/Cmd + Plus
   - Zoom out: Ctrl/Cmd + Minus
   - Reset: Ctrl/Cmd + 0

2. **Try different font**:
   - Settings → Font Selector → Choose preferred font

3. **Adjust system display scaling** (Windows/Mac settings)

---

### Colors Look Wrong

**Symptoms**: Colors appear washed out or incorrect

**Solutions**:
1. **Try different theme**:
   - Settings → Theme Selector → Choose theme

2. **Check monitor settings**:
   - Adjust brightness, contrast, color temperature

3. **Disable browser color filters**

4. **Update graphics drivers**

5. **Try different browser**

---

### Theme Not Changing

**Symptoms**: Clicking theme circles doesn't change colors

**Solutions**:
1. **Refresh page** after selecting theme
2. **Clear browser cache**
3. **Check JavaScript is enabled**
4. **Try different browser**
5. **Check console for errors**

---

## 🌐 Browser-Specific Issues

### Chrome Issues

**Common Problems**:
- Sound not playing → Allow audio in site settings
- Slow performance → Disable hardware acceleration
- Login issues → Clear cookies for the site

**Solutions**:
1. Update Chrome to latest version
2. Settings → Privacy → Clear browsing data
3. Settings → Site settings → Check permissions
4. Disable extensions in incognito mode to test

---

### Firefox Issues

**Common Problems**:
- Sound cutting out → Adjust autoplay settings
- Layout issues → Disable tracking protection for site
- Firebase errors → Allow third-party cookies

**Solutions**:
1. Update Firefox to latest version
2. Options → Privacy → Clear Data
3. Options → Permissions → Allow audio
4. Try Firefox Developer Edition

---

### Safari Issues

**Common Problems**:
- Audio requires interaction → Click page before typing
- Firebase issues → Enable cross-site tracking for site
- Layout differences → Update Safari

**Solutions**:
1. Update Safari to latest version
2. Preferences → Privacy → Manage Website Data
3. Preferences → Websites → Auto-Play → Allow
4. Try Safari Technology Preview

---

### Edge Issues

**Common Problems**:
- Similar to Chrome (Chromium-based)
- Tracking prevention → Disable for site

**Solutions**:
1. Update Edge to latest version
2. Settings → Privacy → Clear browsing data
3. Settings → Site permissions → Check settings
4. Disable tracking prevention for site

---

## 📱 Mobile Issues

### Touch Typing Difficult

**Symptoms**: Hard to type on mobile keyboard

**Solutions**:
1. **Use landscape mode** for larger keyboard
2. **Enable autocorrect** in keyboard settings
3. **Increase text size** (browser zoom)
4. **Use external Bluetooth keyboard**
5. **Try tablet instead of phone**

---

### Layout Issues on Mobile

**Symptoms**: Elements don't fit screen

**Solutions**:
1. **Rotate to landscape mode**
2. **Zoom out** (pinch gesture)
3. **Use full-screen mode** (browser option)
4. **Update mobile browser**
5. **Try different mobile browser**

---

### Sounds Not Working on Mobile

**Symptoms**: No audio on phone/tablet

**Solutions**:
1. **Unmute device** (check silent switch on iPhone)
2. **Increase volume**
3. **Tap screen** before typing (iOS requirement)
4. **Allow audio** in browser settings
5. **Try different browser** (Chrome, Safari, Firefox)
6. **Restart device**

---

## 💾 Data & Sync Issues

### Progress Not Saving

**Symptoms**: Stats reset after refresh

**Solutions**:
1. **Create an account** (progress only saves when logged in)
2. **Check internet connection**
3. **Verify logged in** (check user avatar in header)
4. **Enable cookies** in browser
5. **Check Firebase status** (firebase.google.com/support/status)

---

### Can't See Past Tests

**Symptoms**: Test history is empty

**Solutions**:
1. **Ensure logged in** with same account
2. **Complete at least one test** while logged in
3. **Check internet connection**
4. **Refresh page**
5. **Try different browser** with same login

---

### Achievements Not Unlocking

**Symptoms**: Completed requirements but no achievement

**Solutions**:
1. **Ensure logged in** (achievements only save when logged in)
2. **Complete test fully** (don't stop early)
3. **Check achievement requirements** carefully
4. **Refresh page** and try again
5. **Check console** for errors

---

## ⚠️ Error Messages

### "Firebase Error: Permission Denied"

**Cause**: Not logged in or insufficient permissions

**Solutions**:
1. Log in to your account
2. Refresh page after logging in
3. Check internet connection
4. Try logging out and back in

---

### "Network Error"

**Cause**: No internet connection or Firebase down

**Solutions**:
1. Check internet connection
2. Try different network (WiFi vs mobile data)
3. Check Firebase status page
4. Wait a few minutes and try again
5. Restart router/modem

---

### "Audio Context Error"

**Cause**: Browser audio API issue

**Solutions**:
1. Refresh page
2. Click on page before typing
3. Update browser
4. Try different browser
5. Disable sound (set to "None")

---

### "Invalid Email or Password"

**Cause**: Incorrect login credentials

**Solutions**:
1. Double-check email and password
2. Check Caps Lock is off
3. Reset password (feature coming soon)
4. Try Google Sign-In instead
5. Create new account if needed

---

## 🆘 Getting Help

### Before Asking for Help

1. **Try solutions above** for your specific issue
2. **Check console** for error messages (F12 → Console)
3. **Try different browser**
4. **Clear cache and cookies**
5. **Update browser** to latest version

### How to Report Issues

When reporting a bug, include:
1. **Detailed description** of the problem
2. **Steps to reproduce** the issue
3. **Browser and version** (e.g., Chrome 120)
4. **Operating system** (e.g., Windows 11)
5. **Screenshots** if applicable
6. **Console errors** (F12 → Console → screenshot)
7. **What you've tried** already

### Contact Options

- **GitHub Issues**: [Repository URL]/issues
- **Email**: [your-email@example.com]
- **Discussions**: [Repository URL]/discussions
- **Discord**: [Coming soon]

### Emergency Workarounds

If nothing works:
1. **Use different browser** (Chrome, Firefox, Safari, Edge)
2. **Try different device** (desktop, laptop, tablet, phone)
3. **Use incognito/private mode**
4. **Disable all browser extensions**
5. **Try on different network**

---

## 📚 Additional Resources

- **User Guide**: See USER_GUIDE.md for detailed instructions
- **FAQ**: Common questions answered in USER_GUIDE.md
- **Developer Guide**: DEVELOPER_GUIDE.md for technical details
- **GitHub Issues**: Check existing issues for solutions

---

## 🔄 Still Having Issues?

If you've tried everything and still experiencing problems:

1. **Create a GitHub Issue** with detailed information
2. **Email support** with screenshots and error messages
3. **Join community Discord** for real-time help (coming soon)
4. **Check for updates** - newer version may fix your issue

---

*Last Updated: September 30, 2025*

*Most issues can be resolved by refreshing the page, clearing cache, or updating your browser!*
