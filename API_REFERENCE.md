# TypeMaster API Reference

## 📋 Table of Contents
1. [Core Functions](#core-functions)
2. [Game Mode Functions](#game-mode-functions)
3. [UI Update Functions](#ui-update-functions)
4. [Sound Functions](#sound-functions)
5. [Firebase Functions](#firebase-functions)
6. [Utility Functions](#utility-functions)
7. [Event Handlers](#event-handlers)
8. [State Object](#state-object)
9. [DOM Elements](#dom-elements)

---

## 🎯 Core Functions

### `init()`
Initializes the application on page load.

**Parameters**: None

**Returns**: `void`

**Description**: Sets up event listeners, generates keyboard, loads preferences, checks auth state, shows tutorial, and initializes the UI.

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
```

---

### `startTest()`
Starts a new typing test.

**Parameters**: None

**Returns**: `void`

**Description**: Initializes test state, generates words based on mode, starts timer, and enables input.

```javascript
function startTest() {
  if (state.isRunning) return;
  
  state.isRunning = true;
  state.startTime = new Date();
  state.currentWordIndex = 0;
  state.correctWords = 0;
  state.incorrectWords = 0;
  
  // Generate words and start timer
  generateWords();
  startTimer(timeInSeconds);
  
  elements.typingInput.focus();
}
```

---

### `resetTest()`
Resets the current test to initial state.

**Parameters**: None

**Returns**: `void`

**Description**: Stops timer, clears input, resets stats, and regenerates words.

```javascript
function resetTest() {
  state.isRunning = false;
  clearInterval(state.timerInterval);
  
  elements.typingInput.value = "";
  elements.typingInput.disabled = false;
  
  generateWords();
  updateStats();
}
```

---

### `endTest()`
Ends the current test and shows results.

**Parameters**: None

**Returns**: `void`

**Description**: Calculates final stats, checks achievements, saves results, and displays results modal.

```javascript
function endTest() {
  state.isRunning = false;
  clearInterval(state.timerInterval);
  
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();
  
  showResults(wpm, accuracy);
  checkAchievements(wpm, accuracy);
  
  if (state.user) {
    saveTestResult({ wpm, accuracy, /* ... */ });
  }
}
```

---

## 🎮 Game Mode Functions

### `switchMode(mode)`
Switches between different game modes.

**Parameters**:
- `mode` (string): Mode identifier ("timed", "survival", "practice", etc.)

**Returns**: `void`

```javascript
function switchMode(mode) {
  state.currentMode = mode;
  
  // Update UI
  elements.modeButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  
  // Show mode settings
  elements.modeSettings.forEach(settings => {
    settings.classList.toggle("active", settings.id === `${mode}-settings`);
  });
  
  resetTest();
}
```

---

### `generateWords()`
Generates words for the typing test.

**Parameters**: None

**Returns**: `void`

**Description**: Creates word array based on difficulty, language, and mode settings.

```javascript
function generateWords() {
  const wordCount = getWordCount();
  const difficulty = elements.difficultySelect.value;
  const language = elements.languageSelect.value;
  
  state.words = [];
  for (let i = 0; i < wordCount; i++) {
    const word = getRandomWord(difficulty, language);
    state.words.push(word);
  }
  
  renderWords();
}
```

---

### `generateNumbers()`
Generates number sequences for Numbers Only mode.

**Parameters**: None

**Returns**: `void`

```javascript
function generateNumbers() {
  const length = parseInt(elements.numbersLength.value);
  const type = elements.numbersType.value;
  
  let numberString = "";
  
  switch (type) {
    case "random":
      for (let i = 0; i < length; i++) {
        numberString += Math.floor(Math.random() * 10);
      }
      break;
    // ... other cases
  }
  
  state.words = [numberString];
  renderNumbers();
}
```

---

### `generatePredictionText()`
Generates text for Prediction Challenge mode.

**Parameters**: None

**Returns**: `void`

```javascript
function generatePredictionText() {
  const difficulty = elements.predictionDifficulty.value;
  const texts = predictionTexts[difficulty];
  const text = texts[Math.floor(Math.random() * texts.length)];
  
  state.words = text.split(" ");
  renderWords();
}
```

---

### `generatePracticeText()`
Generates text for AI Practice mode.

**Parameters**: None

**Returns**: `void`

```javascript
function generatePracticeText() {
  const focus = elements.practiceFocus.value;
  const texts = practiceTexts[focus];
  const text = texts[Math.floor(Math.random() * texts.length)];
  
  state.words = text.split(" ");
  renderWords();
}
```

---

## 🖼️ UI Update Functions

### `updateStats()`
Updates all statistics displays.

**Parameters**: None

**Returns**: `void`

```javascript
function updateStats() {
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();
  
  elements.wpm.textContent = wpm;
  elements.accuracy.textContent = `${accuracy}%`;
  elements.correctWords.textContent = state.correctWords;
  elements.incorrectWords.textContent = state.incorrectWords;
  elements.keystrokes.textContent = state.totalKeystrokes;
}
```

---

### `updateWordHighlighting()`
Updates visual highlighting of current word.

**Parameters**: None

**Returns**: `void`

```javascript
function updateWordHighlighting() {
  elements.wordsContainer.querySelectorAll(".word").forEach((word, index) => {
    word.classList.toggle("current", index === state.currentWordIndex);
  });
}
```

---

### `updateCharacterHighlighting(inputValue)`
Updates character-level highlighting for current word.

**Parameters**:
- `inputValue` (string): Current input value

**Returns**: `void`

```javascript
function updateCharacterHighlighting(inputValue) {
  const currentWord = state.words[state.currentWordIndex];
  const wordElement = elements.wordsContainer.children[state.currentWordIndex];
  
  wordElement.innerHTML = "";
  
  for (let i = 0; i < currentWord.length; i++) {
    const charSpan = document.createElement("span");
    charSpan.textContent = currentWord[i];
    
    if (i < inputValue.length) {
      charSpan.className = currentWord[i] === inputValue[i] ? "correct" : "incorrect";
    }
    
    wordElement.appendChild(charSpan);
  }
}
```

---

### `updateHeatmapDisplay()`
Updates the typing heatmap visualization.

**Parameters**: None

**Returns**: `void`

```javascript
function updateHeatmapDisplay() {
  const maxCount = Math.max(...Object.values(state.heatmap));
  
  Object.entries(state.heatmap).forEach(([key, count]) => {
    const keyElement = elements.keyboard.querySelector(`[data-key="${key}"]`);
    if (keyElement) {
      const intensity = count / maxCount;
      keyElement.style.backgroundColor = `rgba(99, 102, 241, ${intensity})`;
    }
  });
}
```

---

### `showModal(modal)`
Displays a modal dialog.

**Parameters**:
- `modal` (HTMLElement): Modal element to show

**Returns**: `void`

```javascript
function showModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
```

---

### `hideModal(modal)`
Hides a modal dialog.

**Parameters**:
- `modal` (HTMLElement): Modal element to hide

**Returns**: `void`

```javascript
function hideModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
```

---

## 🔊 Sound Functions

### `initAudioContext()`
Initializes the Web Audio API context.

**Parameters**: None

**Returns**: `AudioContext`

```javascript
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}
```

---

### `playKeySound()`
Plays keyboard sound based on current settings.

**Parameters**: None

**Returns**: `void`

```javascript
function playKeySound() {
  if (!state.soundEnabled || state.soundType === "none") return;
  
  const ctx = initAudioContext();
  
  switch (state.soundType) {
    case "mechanical":
      playMechanicalSound(ctx);
      break;
    case "typewriter":
      playTypewriterSound(ctx);
      break;
    // ... other cases
  }
}
```

---

### `playMechanicalSound(ctx)`
Generates mechanical keyboard sound.

**Parameters**:
- `ctx` (AudioContext): Web Audio context

**Returns**: `void`

```javascript
function playMechanicalSound(ctx) {
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.setValueAtTime(800, now);
  oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.01);
  
  gainNode.gain.setValueAtTime(0.3 * state.soundVolume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
  
  oscillator.start(now);
  oscillator.stop(now + 0.05);
}
```

---

### `playTypewriterSound(ctx)`
Generates typewriter sound.

**Parameters**:
- `ctx` (AudioContext): Web Audio context

**Returns**: `void`

```javascript
function playTypewriterSound(ctx) {
  const now = ctx.currentTime;
  
  // Main strike
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  
  osc1.frequency.setValueAtTime(150, now);
  osc1.frequency.exponentialRampToValueAtTime(50, now + 0.02);
  gain1.gain.setValueAtTime(0.4 * state.soundVolume, now);
  gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
  
  osc1.start(now);
  osc1.stop(now + 0.08);
  
  // Metallic resonance
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  
  osc2.frequency.setValueAtTime(1200, now + 0.005);
  osc2.frequency.exponentialRampToValueAtTime(800, now + 0.03);
  gain2.gain.setValueAtTime(0.15 * state.soundVolume, now + 0.005);
  gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
  
  osc2.start(now + 0.005);
  osc2.stop(now + 0.06);
}
```

---

## 🔥 Firebase Functions

### `checkAuthState()`
Checks and handles user authentication state.

**Parameters**: None

**Returns**: `void`

```javascript
function checkAuthState() {
  auth.onAuthStateChanged(user => {
    if (user) {
      state.user = user;
      updateUserUI(user);
      loadUserData();
    } else {
      state.user = null;
      updateUserUI(null);
    }
  });
}
```

---

### `handleLogin()`
Handles email/password login.

**Parameters**: None

**Returns**: `Promise<void>`

```javascript
async function handleLogin() {
  const email = elements.loginEmail.value;
  const password = elements.loginPassword.value;
  
  try {
    await auth.signInWithEmailAndPassword(email, password);
    hideModal(elements.authModal);
  } catch (error) {
    showAuthError(error.message);
  }
}
```

---

### `handleSignup()`
Handles email/password signup.

**Parameters**: None

**Returns**: `Promise<void>`

```javascript
async function handleSignup() {
  const email = elements.signupEmail.value;
  const username = elements.signupUsername.value;
  const password = elements.signupPassword.value;
  
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await saveUserProfile(userCredential.user, username);
    hideModal(elements.authModal);
  } catch (error) {
    showAuthError(error.message);
  }
}
```

---

### `handleGoogleLogin()`
Handles Google Sign-In.

**Parameters**: None

**Returns**: `Promise<void>`

```javascript
async function handleGoogleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  
  try {
    const result = await auth.signInWithPopup(provider);
    await saveUserProfile(result.user);
    hideModal(elements.authModal);
  } catch (error) {
    showAuthError(error.message);
  }
}
```

---

### `saveTestResult(result)`
Saves test result to Firestore.

**Parameters**:
- `result` (Object): Test result data

**Returns**: `Promise<void>`

```javascript
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
```

---

### `loadUserData()`
Loads user data from Firestore.

**Parameters**: None

**Returns**: `Promise<void>`

```javascript
async function loadUserData() {
  if (!state.user) return;
  
  try {
    const doc = await db.collection('users').doc(state.user.uid).get();
    if (doc.exists) {
      state.userData = doc.data();
      updateProfileDisplay();
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
}
```

---

## 🛠️ Utility Functions

### `calculateWPM()`
Calculates words per minute.

**Parameters**: None

**Returns**: `number` - WPM value

```javascript
function calculateWPM() {
  if (!state.startTime) return 0;
  
  const timeElapsed = (new Date() - state.startTime) / 1000;
  const wpm = Math.round((state.correctWords / timeElapsed) * 60);
  
  return wpm || 0;
}
```

---

### `calculateAccuracy()`
Calculates typing accuracy percentage.

**Parameters**: None

**Returns**: `number` - Accuracy percentage

```javascript
function calculateAccuracy() {
  if (state.totalKeystrokes === 0) return 100;
  
  const accuracy = Math.round(
    (state.correctKeystrokes / state.totalKeystrokes) * 100
  );
  
  return accuracy;
}
```

---

### `getRandomWord(difficulty, language)`
Gets a random word from word list.

**Parameters**:
- `difficulty` (string): "easy", "medium", or "hard"
- `language` (string): "english" or "bangla"

**Returns**: `string` - Random word

```javascript
function getRandomWord(difficulty, language) {
  const wordList = wordLists[language][difficulty];
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}
```

---

### `addPunctuation(word)`
Adds punctuation to a word.

**Parameters**:
- `word` (string): Word to add punctuation to

**Returns**: `string` - Word with punctuation

```javascript
function addPunctuation(word) {
  const punctuation = ['.', ',', '!', '?', ';'];
  const randomPunct = punctuation[Math.floor(Math.random() * punctuation.length)];
  
  // Capitalize first letter
  word = word.charAt(0).toUpperCase() + word.slice(1);
  
  return word + randomPunct;
}
```

---

### `formatTime(seconds)`
Formats seconds into readable time string.

**Parameters**:
- `seconds` (number): Time in seconds

**Returns**: `string` - Formatted time

```javascript
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
```

---

## 🎯 Event Handlers

### `handleTypingInput(e)`
Handles typing input events.

**Parameters**:
- `e` (Event): Input event

**Returns**: `void`

```javascript
function handleTypingInput(e) {
  if (!state.isRunning && !state.isPaused) {
    startTest();
    return;
  }
  
  const value = e.target.value;
  state.totalKeystrokes++;
  
  playKeySound();
  updateHeatmap(value);
  
  if (state.currentMode === "numbers") {
    handleNumbersInput(value);
  } else {
    handleWordsInput(value);
  }
  
  updateStats();
}
```

---

### `handleKeyDown(e)`
Handles keydown events.

**Parameters**:
- `e` (KeyboardEvent): Keyboard event

**Returns**: `void`

```javascript
function handleKeyDown(e) {
  if (e.key === "Tab") {
    e.preventDefault();
  }
  
  playKeySound();
  highlightVirtualKey(e.key);
}
```

---

### `handleGlobalKeyDown(e)`
Handles global keyboard shortcuts.

**Parameters**:
- `e` (KeyboardEvent): Keyboard event

**Returns**: `void`

```javascript
function handleGlobalKeyDown(e) {
  if (e.key === "Tab" && !isModalOpen()) {
    e.preventDefault();
    if (state.isRunning) {
      resetTest();
      setTimeout(() => startTest(), 100);
    } else {
      startTest();
    }
  }
  
  if (e.key === "Escape" && state.isRunning) {
    resetTest();
  }
}
```

---

## 📦 State Object

### Structure
```javascript
const state = {
  // Game state
  currentMode: "timed",          // Current game mode
  isRunning: false,              // Test is active
  isPaused: false,               // Test is paused
  startTime: null,               // Test start timestamp
  timerInterval: null,           // Timer interval ID
  
  // Test data
  words: [],                     // Array of words to type
  currentWordIndex: 0,           // Current word position
  currentCharIndex: 0,           // Current character position
  correctWords: 0,               // Count of correct words
  incorrectWords: 0,             // Count of incorrect words
  totalKeystrokes: 0,            // Total keys pressed
  correctKeystrokes: 0,          // Correct keys pressed
  
  // Analytics
  errors: {},                    // Error tracking object
  heatmap: {},                   // Key usage heatmap
  testHistory: [],               // Array of past tests
  
  // User data
  user: null,                    // Firebase user object
  userData: null,                // User profile data
  achievements: [],              // Unlocked achievements
  
  // Settings
  soundEnabled: true,            // Sound on/off
  soundType: "mechanical",       // Sound type
  soundVolume: 0.7,              // Volume (0-1)
  currentTheme: "light",         // Active theme
  currentFont: "default",        // Active font
  
  // Curriculum
  curriculum: [],                // Curriculum data
  currentLesson: null            // Active lesson
};
```

---

## 🎨 DOM Elements

### Structure
```javascript
const elements = {
  // Mode controls
  modeButtons: document.querySelectorAll(".game-mode-btn"),
  modeSettings: document.querySelectorAll(".mode-settings"),
  
  // Settings
  timeSelect: document.getElementById("time-select"),
  difficultySelect: document.getElementById("difficulty-select"),
  languageSelect: document.getElementById("language-select"),
  soundSelect: document.getElementById("sound-select"),
  volumeControl: document.getElementById("volume-control"),
  
  // Test area
  wordsContainer: document.getElementById("words-container"),
  typingInput: document.getElementById("typing-input"),
  timer: document.getElementById("timer"),
  startBtn: document.getElementById("start-btn"),
  resetBtn: document.getElementById("reset-btn"),
  
  // Stats
  wpm: document.getElementById("wpm"),
  accuracy: document.getElementById("accuracy"),
  correctWords: document.getElementById("correct-words"),
  incorrectWords: document.getElementById("incorrect-words"),
  timeRemaining: document.getElementById("time-remaining"),
  keystrokes: document.getElementById("keystrokes"),
  
  // Modals
  authModal: document.getElementById("auth-modal"),
  resultsModal: document.getElementById("results-modal"),
  helpModal: document.getElementById("help-modal"),
  
  // User interface
  loginBtn: document.getElementById("login-btn"),
  logoutBtn: document.getElementById("logout-btn"),
  userAvatar: document.getElementById("user-avatar"),
  userNameDisplay: document.getElementById("user-name-display")
};
```

---

*For implementation examples, see DEVELOPER_GUIDE.md*
