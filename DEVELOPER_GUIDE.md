# TypeMaster Developer Guide

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [State Management](#state-management)
5. [Firebase Integration](#firebase-integration)
6. [Sound System](#sound-system)
7. [Adding New Features](#adding-new-features)
8. [Code Style Guide](#code-style-guide)
9. [Testing](#testing)
10. [Deployment](#deployment)

---

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend**: Firebase (Authentication, Firestore)
- **Libraries**: Chart.js, Font Awesome
- **APIs**: Web Audio API

### Design Patterns
- **Module Pattern**: Encapsulated functionality
- **Event-Driven**: DOM event handling
- **State Management**: Centralized state object
- **Component-Based**: Reusable UI components

### Application Flow
```
User Opens App
    ↓
Initialize App (init())
    ↓
Load User Preferences
    ↓
Check Auth State
    ↓
Generate Initial Words
    ↓
Wait for User Input
    ↓
Handle Typing Input
    ↓
Update Stats Real-time
    ↓
End Test
    ↓
Show Results & Analysis
    ↓
Save to Firebase (if logged in)
```

---

## 📁 Project Structure

```
TypeMaster/
├── index.html              # Main HTML structure
├── styles.css              # All styling and themes
├── script.js               # Core application logic
│
├── Documentation/
│   ├── README.md           # Project overview
│   ├── FEATURES.md         # Feature documentation
│   ├── USER_GUIDE.md       # User instructions
│   ├── DEVELOPER_GUIDE.md  # This file
│   ├── API_REFERENCE.md    # Code API reference
│   ├── CHANGELOG.md        # Version history
│   ├── CONTRIBUTING.md     # Contribution guidelines
│   ├── LICENSE.md          # License information
│   └── TROUBLESHOOTING.md  # Common issues
│
└── Assets/ (optional)
    ├── images/             # Images and icons
    ├── sounds/             # Sound files (if using)
    └── fonts/              # Custom fonts
```

---

## 🔧 Core Components

### 1. DOM Elements Object
```javascript
const elements = {
  // Mode buttons
  modeButtons: document.querySelectorAll(".game-mode-btn"),
  
  // Settings
  timeSelect: document.getElementById("time-select"),
  difficultySelect: document.getElementById("difficulty-select"),
  
  // Test area
  wordsContainer: document.getElementById("words-container"),
  typingInput: document.getElementById("typing-input"),
  
  // Stats
  wpm: document.getElementById("wpm"),
  accuracy: document.getElementById("accuracy"),
  
  // ... more elements
};
```

**Purpose**: Centralized DOM element references
**Benefits**: 
- Single source of truth
- Easy to maintain
- Performance optimization (query once)

### 2. State Object
```javascript
const state = {
  // Game state
  currentMode: "timed",
  isRunning: false,
  isPaused: false,
  
  // Test data
  words: [],
  currentWordIndex: 0,
  correctWords: 0,
  incorrectWords: 0,
  
  // User data
  user: null,
  userData: null,
  
  // Settings
  soundEnabled: true,
  soundType: "mechanical",
  soundVolume: 0.7,
  currentTheme: "light",
  
  // ... more state
};
```

**Purpose**: Centralized application state
**Benefits**:
- Single source of truth
- Easy debugging
- State persistence

### 3. Initialization
```javascript
function init() {
  setupEventListeners();
  generateKeyboard();
  loadUserPreferences();
  checkAuthState();
  showTutorial();
  loadCurriculum();
  loadAchievements();
  generateHeatmap();
  generateWords();
  updateWordHighlighting();
}

// Call on page load
document.addEventListener('DOMContentLoaded', init);
```

---

## 🎮 State Management

### State Updates
Always update state before UI:
```javascript
// ✅ Good
state.correctWords++;
elements.correctWords.textContent = state.correctWords;

// ❌ Bad
elements.correctWords.textContent = parseInt(elements.correctWords.textContent) + 1;
```

### State Persistence
```javascript
// Save to localStorage
function saveUserPreferences() {
  localStorage.setItem('typemaster-prefs', JSON.stringify({
    theme: state.currentTheme,
    font: state.currentFont,
    soundType: state.soundType,
    soundVolume: state.soundVolume
  }));
}

// Load from localStorage
function loadUserPreferences() {
  const prefs = JSON.parse(localStorage.getItem('typemaster-prefs'));
  if (prefs) {
    state.currentTheme = prefs.theme || 'light';
    state.currentFont = prefs.font || 'default';
    // Apply preferences
    changeTheme(state.currentTheme);
    changeFont(state.currentFont);
  }
}
```

---

## 🔥 Firebase Integration

### Configuration
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
```

### Authentication
```javascript
// Email/Password Sign Up
async function handleSignup() {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email, 
      password
    );
    await saveUserProfile(userCredential.user);
  } catch (error) {
    handleAuthError(error);
  }
}

// Google Sign In
async function handleGoogleSignup() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    await saveUserProfile(result.user);
  } catch (error) {
    handleAuthError(error);
  }
}
```

### Firestore Operations
```javascript
// Save test result
async function saveTestResult(result) {
  if (!state.user) return;
  
  try {
    await db.collection('users')
      .doc(state.user.uid)
      .collection('tests')
      .add({
        ...result,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  } catch (error) {
    console.error('Error saving test:', error);
  }
}

// Load user data
async function loadUserData() {
  if (!state.user) return;
  
  try {
    const doc = await db.collection('users')
      .doc(state.user.uid)
      .get();
    
    if (doc.exists) {
      state.userData = doc.data();
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
}
```

---

## 🔊 Sound System

### Architecture
```javascript
// Audio Context (singleton)
let audioContext = null;

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}
```

### Sound Generation
```javascript
function playKeySound() {
  if (!state.soundEnabled || state.soundType === "none") return;
  
  try {
    const ctx = initAudioContext();
    
    switch (state.soundType) {
      case "mechanical":
        playMechanicalSound(ctx);
        break;
      case "typewriter":
        playTypewriterSound(ctx);
        break;
      // ... more cases
    }
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}
```

### Creating New Sounds
```javascript
function playCustomSound(ctx) {
  const now = ctx.currentTime;
  
  // Create oscillator
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  // Configure sound
  oscillator.type = "sine"; // sine, square, sawtooth, triangle
  oscillator.frequency.setValueAtTime(440, now); // Frequency in Hz
  oscillator.frequency.exponentialRampToValueAtTime(220, now + 0.1);
  
  // Configure volume (apply user volume)
  gainNode.gain.setValueAtTime(0.3 * state.soundVolume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  
  // Play sound
  oscillator.start(now);
  oscillator.stop(now + 0.1); // Duration
}
```

---

## ➕ Adding New Features

### Adding a New Game Mode

#### Step 1: Add HTML
```html
<div class="game-mode-btn" data-mode="newmode" tabindex="-1">
  New Mode
</div>

<div class="mode-settings" id="newmode-settings">
  <div class="settings-grid">
    <!-- Mode-specific settings -->
  </div>
</div>
```

#### Step 2: Update JavaScript
```javascript
// Add to switchMode function
function switchMode(mode) {
  state.currentMode = mode;
  
  // Update button text
  if (mode === "newmode") {
    elements.startBtn.textContent = "Start New Mode";
  }
  
  // ... rest of function
}

// Add generation function
function generateNewModeContent() {
  // Generate content specific to this mode
  state.words = [...]; // Your word generation logic
  
  // Update UI
  elements.wordsContainer.innerHTML = "";
  state.words.forEach(word => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
}

// Add to startTest function
function startTest() {
  // ... existing code
  
  if (state.currentMode === "newmode") {
    generateNewModeContent();
  }
  
  // ... rest of function
}
```

### Adding a New Theme

#### Step 1: Add CSS Variables
```css
.newtheme-theme {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
  --text-color: #your-color;
  --bg-color: #your-color;
  --card-bg: #your-color;
  --border-color: #your-color;
}
```

#### Step 2: Add Theme Selector
```html
<div class="theme-option" 
     style="background: #your-color" 
     data-theme="newtheme" 
     tabindex="-1">
</div>
```

#### Step 3: Update JavaScript
```javascript
function changeTheme(theme) {
  // Remove all theme classes
  document.body.classList.remove(
    'light-theme', 
    'dark-theme', 
    'blue-theme', 
    'pink-theme', 
    'green-theme',
    'newtheme-theme' // Add your theme
  );
  
  // Add selected theme
  if (theme !== 'light') {
    document.body.classList.add(`${theme}-theme`);
  }
  
  state.currentTheme = theme;
  saveUserPreferences();
}
```

### Adding a New Achievement

```javascript
// Define achievement
const achievements = {
  newAchievement: {
    id: "new_achievement",
    name: "Achievement Name",
    description: "Achievement description",
    icon: "🏆",
    condition: (wpm, accuracy, time) => {
      // Return true if unlocked
      return wpm >= 100 && accuracy >= 95;
    }
  }
};

// Check in endTest function
function checkAchievements(wpm, accuracy, timeElapsed) {
  Object.values(achievements).forEach(achievement => {
    if (!hasAchievement(achievement.id) && 
        achievement.condition(wpm, accuracy, timeElapsed)) {
      unlockAchievement(achievement);
    }
  });
}

// Unlock achievement
function unlockAchievement(achievement) {
  state.achievements.push(achievement);
  showAchievementNotification(achievement);
  playConfetti();
  
  // Save to Firebase
  if (state.user) {
    db.collection('users')
      .doc(state.user.uid)
      .update({
        achievements: firebase.firestore.FieldValue.arrayUnion(achievement)
      });
  }
}
```

---

## 📝 Code Style Guide

### Naming Conventions
```javascript
// Variables: camelCase
let currentWordIndex = 0;
let isTestRunning = false;

// Constants: UPPER_SNAKE_CASE
const MAX_WORD_COUNT = 100;
const DEFAULT_TIME = 60;

// Functions: camelCase, verb-first
function startTest() { }
function calculateWPM() { }
function updateStats() { }

// Classes: PascalCase (if using)
class TestManager { }

// DOM elements: camelCase with element suffix
const startBtn = document.getElementById('start-btn');
const wordsContainer = document.getElementById('words-container');
```

### Function Structure
```javascript
/**
 * Brief description of function
 * @param {type} paramName - Parameter description
 * @returns {type} Return value description
 */
function functionName(paramName) {
  // Validate inputs
  if (!paramName) return;
  
  // Main logic
  const result = doSomething(paramName);
  
  // Update state
  state.someValue = result;
  
  // Update UI
  updateUI();
  
  // Return if needed
  return result;
}
```

### Error Handling
```javascript
// Always use try-catch for async operations
async function saveData() {
  try {
    await db.collection('data').add({ /* data */ });
  } catch (error) {
    console.error('Error saving data:', error);
    showErrorNotification('Failed to save data');
  }
}

// Validate inputs
function processInput(input) {
  if (!input || typeof input !== 'string') {
    console.warn('Invalid input provided');
    return null;
  }
  
  // Process input
  return input.trim().toLowerCase();
}
```

### Comments
```javascript
// Single-line comments for brief explanations
const wpm = calculateWPM(); // Words per minute

/**
 * Multi-line comments for complex logic
 * Explain the why, not the what
 */
function complexFunction() {
  // Implementation
}

// TODO: Add feature X
// FIXME: Bug in calculation
// HACK: Temporary workaround
// NOTE: Important information
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Core Functionality
- [ ] All game modes start correctly
- [ ] Timer counts down properly
- [ ] Words generate correctly
- [ ] Input validation works
- [ ] Stats update in real-time
- [ ] Test ends at correct time
- [ ] Results modal displays correctly

#### User Authentication
- [ ] Sign up with email/password
- [ ] Sign up with Google
- [ ] Login with email/password
- [ ] Login with Google
- [ ] Logout functionality
- [ ] Password validation
- [ ] Error messages display

#### Sound System
- [ ] All 6 sounds play correctly
- [ ] Volume control works
- [ ] Preview sounds on change
- [ ] Sounds play during typing
- [ ] Mute functionality works

#### Themes & Customization
- [ ] All 5 themes apply correctly
- [ ] All 4 fonts apply correctly
- [ ] Settings persist after refresh
- [ ] Responsive design works

#### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Debugging Tips

```javascript
// Enable debug mode
const DEBUG = true;

function debugLog(message, data) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data);
  }
}

// Use in code
debugLog('Current state:', state);
debugLog('WPM calculation:', { correctWords, timeElapsed, wpm });

// Performance monitoring
console.time('generateWords');
generateWords();
console.timeEnd('generateWords');

// State inspection
console.table(state); // Display state as table
```

---

## 🚀 Deployment

### Preparation
1. **Remove debug code**
   ```javascript
   // Remove all console.log statements
   // Remove DEBUG flags
   // Remove test data
   ```

2. **Minify files** (optional)
   - Use tools like UglifyJS for JavaScript
   - Use cssnano for CSS

3. **Update Firebase config**
   - Use production Firebase project
   - Update security rules

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### GitHub Pages

```bash
# Push to GitHub
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# Enable GitHub Pages in repository settings
# Select main branch
# Site will be available at: https://username.github.io/typemaster
```

### Netlify

1. Connect GitHub repository
2. Configure build settings:
   - Build command: (none)
   - Publish directory: /
3. Deploy

### Custom Domain

1. Purchase domain
2. Configure DNS:
   ```
   A Record: @ → Your hosting IP
   CNAME: www → your-site.netlify.app
   ```
3. Enable HTTPS

---

## 🔒 Security Best Practices

### Firebase Security Rules

```javascript
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Public read for leaderboards
      match /public/{document=**} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### Input Validation

```javascript
// Sanitize user input
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .substring(0, 100); // Limit length
}

// Validate email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

### API Key Protection

```javascript
// Never commit API keys to public repositories
// Use environment variables or Firebase config

// For public projects, use Firebase security rules
// to restrict API access
```

---

## 📚 Additional Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Chart.js Documentation](https://www.chartjs.org/docs/)

### Tools
- [VS Code](https://code.visualstudio.com/) - Code editor
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging
- [Firebase Console](https://console.firebase.google.com/) - Backend management
- [Git](https://git-scm.com/) - Version control

---

*Happy Coding! 🚀*
