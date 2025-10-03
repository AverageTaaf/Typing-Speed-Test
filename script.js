// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUM8QweWGD3t0ksNs_nf8u-uhxFMZDrc8",
  authDomain: "typemaster-ai.firebaseapp.com",
  databaseURL: "https://typemaster-ai-default-rtdb.firebaseio.com",
  projectId: "typemaster-ai",
  storageBucket: "typemaster-ai.firebasestorage.app",
  messagingSenderId: "836500969709",
  appId: "1:836500969709:web:fb913fe69c4aba8695d4e4",
  measurementId: "G-MZPN6ETQL7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const elements = {
  // Mode buttons
  modeButtons: document.querySelectorAll(".game-mode-btn"),
  modeSettings: document.querySelectorAll(".mode-settings"),

  // Settings
  timeSelect: document.getElementById("time-select"),
  customTimeGroup: document.getElementById("custom-time-group"),
  customTime: document.getElementById("custom-time"),
  difficultySelect: document.getElementById("difficulty-select"),
  languageSelect: document.getElementById("language-select"),
  punctuationToggle: document.getElementById("punctuation-toggle"),
  soundSelect: document.getElementById("sound-select"),
  volumeControl: document.getElementById("volume-control"),
  volumeValue: document.getElementById("volume-value"),

  // Survival settings
  survivalType: document.getElementById("survival-type"),
  maxMistakesGroup: document.getElementById("max-mistakes-group"),
  maxMistakes: document.getElementById("max-mistakes"),
  survivalTimeGroup: document.getElementById("survival-time-group"),
  survivalTime: document.getElementById("survival-time"),
  survivalDifficulty: document.getElementById("survival-difficulty"),
  survivalLanguage: document.getElementById("survival-language"),

  // Practice settings
  practiceFocus: document.getElementById("practice-focus"),

  // Prediction settings
  predictionDifficulty: document.getElementById("prediction-difficulty"),

  // Numbers settings
  numbersLength: document.getElementById("numbers-length"),
  numbersType: document.getElementById("numbers-type"),

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

  // Analysis
  analysisContent: document.getElementById("analysis-content"),
  heatmapKeys: document.getElementById("heatmap-keys"),
  errorBreakdown: document.getElementById("error-breakdown"),

  // Modals
  authModal: document.getElementById("auth-modal"),
  resultsModal: document.getElementById("results-modal"),
  privacyModal: document.getElementById("privacy-modal"),
  termsModal: document.getElementById("terms-modal"),
  tutorialModal: document.getElementById("tutorial-modal"),
  notificationModal: document.getElementById("notification-modal"),

  // Auth
  loginBtn: document.getElementById("login-btn"),
  logoutBtn: document.getElementById("logout-btn"),
  userStatus: document.getElementById("user-status"),
  userAvatar: document.getElementById("user-avatar"),
  userNameDisplay: document.getElementById("user-name-display"),

  // Forms
  formTabs: document.querySelectorAll(".form-tab"),
  loginForm: document.getElementById("login-form"),
  signupForm: document.getElementById("signup-form"),
  loginEmail: document.getElementById("login-email"),
  loginPassword: document.getElementById("login-password"),
  signupEmail: document.getElementById("signup-email"),
  signupUsername: document.getElementById("signup-username"),
  signupPassword: document.getElementById("signup-password"),
  loginSubmit: document.getElementById("login-submit"),
  signupSubmit: document.getElementById("signup-submit"),
  googleLogin: document.getElementById("google-login"),
  googleSignup: document.getElementById("google-signup"),
  authError: document.getElementById("auth-error"),

  // Results
  resultWpm: document.getElementById("result-wpm"),
  resultAccuracy: document.getElementById("result-accuracy"),
  resultCorrect: document.getElementById("result-correct"),
  resultIncorrect: document.getElementById("result-incorrect"),
  resultKeystrokes: document.getElementById("result-keystrokes"),
  resultTime: document.getElementById("result-time"),
  resultsAchievements: document.getElementById("results-achievements"),
  resultsShare: document.getElementById("results-share"),
  resultsRetry: document.getElementById("results-retry"),

  // Theme
  themeOptions: document.querySelectorAll(".theme-option"),
  fontOptions: document.querySelectorAll(".font-option"),

  // Links
  privacyLink: document.getElementById("privacy-link"),
  termsLink: document.getElementById("terms-link"),
  helpBtn: document.getElementById("help-btn"),

  // Close buttons
  closeAuth: document.getElementById("close-auth"),
  closeResults: document.getElementById("close-results"),
  closePrivacy: document.getElementById("close-privacy"),
  closeTerms: document.getElementById("close-terms"),
  closeTutorial: document.getElementById("close-tutorial"),
  closeNotification: document.getElementById("close-notification"),
  closeHelp: document.getElementById("close-help"),

  // Modals
  helpModal: document.getElementById("help-modal"),

  // Notification
  notificationMessage: document.getElementById("notification-message"),

  // New Features
  profileContainer: document.getElementById("profile-container"),
  profileAvatar: document.getElementById("profile-avatar"),
  profileStats: document.getElementById("profile-stats"),
  achievementsContainer: document.getElementById("achievements-container"),
  leaderboardContainer: document.getElementById("leaderboard-container"),
  leaderboardContent: document.getElementById("leaderboard-content"),
  aiSuggestions: document.getElementById("ai-suggestions"),
  curriculumLevels: document.getElementById("curriculum-levels"),
  keyboard: document.getElementById("keyboard"),
};

// Game State
const state = {
  currentMode: "timed",
  isRunning: false,
  isPaused: false,
  startTime: null,
  timerInterval: null,
  words: [],
  currentWordIndex: 0,
  currentCharIndex: 0,
  correctWords: 0,
  incorrectWords: 0,
  totalKeystrokes: 0,
  correctKeystrokes: 0,
  errors: {},
  heatmap: {},
  user: null,
  userData: null,
  testHistory: [],
  achievements: [],
  leaderboard: [],
  curriculum: [],
  currentLesson: null,
  soundEnabled: true,
  soundType: "mechanical", // Default to mechanical sound
  soundVolume: 0.7, // Default volume at 70%
  currentTheme: "light",
  currentFont: "default",
};

// Initialize the application
async function init() {
  setupEventListeners();
  generateKeyboard();
  loadUserPreferences();
  checkAuthState();
  showTutorial();
  loadCurriculum();
  loadAchievements();
  generateHeatmap();
  // Generate initial words on page load
  generateWords();
  updateWordHighlighting();

  // Initialize ML models for enhanced functionality
  updateMLStatus('loading');
  await initializeMLModels();

  // Initialize charts with empty data
  initializeCharts();
}

// Set up event listeners
function setupEventListeners() {
  // Mode selection
  elements.modeButtons.forEach((button) => {
    button.addEventListener("click", () => switchMode(button.dataset.mode));
  });

  // Settings changes
  elements.timeSelect.addEventListener("change", handleTimeSelectChange);
  elements.customTime.addEventListener("input", updateTimerDisplay);
  elements.survivalType.addEventListener("change", handleSurvivalTypeChange);
  elements.themeOptions.forEach((option) => {
    option.addEventListener("click", () => changeTheme(option.dataset.theme));
  });
  elements.fontOptions.forEach((option) => {
    option.addEventListener("click", () => changeFont(option.dataset.font));
  });

  // Test controls
  elements.startBtn.addEventListener("click", startTest);
  elements.resetBtn.addEventListener("click", resetTest);
  elements.typingInput.addEventListener("input", handleTypingInput);
  elements.typingInput.addEventListener("keydown", handleKeyDown);
  elements.typingInput.addEventListener("focus", handleInputFocus);
  elements.typingInput.addEventListener("blur", handleInputBlur);

  // Auth
  elements.loginBtn.addEventListener("click", showAuthModal);
  elements.logoutBtn.addEventListener("click", handleLogout);
  elements.formTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchAuthTab(tab.dataset.tab));
  });
  elements.loginSubmit.addEventListener("click", handleLogin);
  elements.signupSubmit.addEventListener("click", handleSignup);
  elements.googleLogin.addEventListener("click", handleGoogleLogin);
  elements.googleSignup.addEventListener("click", handleGoogleSignup);
  elements.signupPassword.addEventListener("input", validatePassword);

  // Toggle keyboard visibility
  const toggleKeyboardBtn = document.getElementById("toggle-keyboard");
  const keyboardContainer = document.querySelector(".keyboard-container");

  if (toggleKeyboardBtn && keyboardContainer) {
    toggleKeyboardBtn.addEventListener("click", () => {
      keyboardContainer.classList.toggle("collapsed");
      const isCollapsed = keyboardContainer.classList.contains("collapsed");
      toggleKeyboardBtn.innerHTML = `<i class="fas fa-keyboard"></i> <span>${
        isCollapsed ? "Show" : "Hide"
      } Keyboard</span>`;
    });
  }

  // Results actions
  elements.resultsShare.addEventListener("click", shareResults);
  elements.resultsRetry.addEventListener("click", retryTest);

  // Close buttons
  elements.closeAuth.addEventListener("click", () =>
    hideModal(elements.authModal)
  );
  elements.closeResults.addEventListener("click", () => {
    hideModal(elements.resultsModal);
    elements.typingInput.disabled = false;
  });
  elements.closePrivacy.addEventListener("click", () =>
    hideModal(elements.privacyModal)
  );
  elements.closeTerms.addEventListener("click", () =>
    hideModal(elements.termsModal)
  );
  elements.closeTutorial.addEventListener("click", () =>
    hideModal(elements.tutorialModal)
  );
  elements.closeNotification.addEventListener("click", () =>
    hideModal(elements.notificationModal)
  );
  elements.closeHelp.addEventListener("click", () =>
    hideModal(elements.helpModal)
  );
  document
    .getElementById("accept-help")
    .addEventListener("click", () => hideModal(elements.helpModal));

  // Keyboard events
  document.addEventListener("keydown", handleGlobalKeyDown);

  // Sound settings
  elements.soundSelect.addEventListener("change", (e) => {
    state.soundType = e.target.value;
    if (state.soundType === "none") {
      state.soundEnabled = false;
    } else {
      state.soundEnabled = true;
    }
    // Play a test sound when changing sound type
    if (state.soundEnabled) {
      playKeySound();
    }
  });

  // Volume control
  elements.volumeControl.addEventListener("input", (e) => {
    state.soundVolume = e.target.value / 100;
    elements.volumeValue.textContent = e.target.value + "%";
    // Play a test sound when adjusting volume
    if (state.soundEnabled) {
      playKeySound();
    }
  });
}

// Generate on-screen keyboard
function generateKeyboard() {
  const keyboardLayout = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ["Space", "Backspace"],
  ];

  elements.keyboard.innerHTML = "";

  keyboardLayout.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = "keyboard-row";

    row.forEach((key) => {
      const keyElement = document.createElement("div");
      keyElement.className = "keyboard-key";
      keyElement.textContent = key === "Space" ? "Space" : key;
      keyElement.dataset.key = key === "Space" ? " " : key;

      if (key === "Space") {
        keyElement.style.minWidth = "300px";
      } else if (key === "Backspace") {
        keyElement.style.minWidth = "100px";
      }

      keyElement.addEventListener("click", () =>
        handleVirtualKeyPress(key === "Space" ? " " : key)
      );
      rowElement.appendChild(keyElement);
    });

    elements.keyboard.appendChild(rowElement);
  });
}

// Handle virtual keyboard key press
function handleVirtualKeyPress(key) {
  const input = elements.typingInput;
  const cursorPosition = input.selectionStart;

  if (key === "Backspace") {
    if (cursorPosition > 0) {
      const newValue =
        input.value.substring(0, cursorPosition - 1) +
        input.value.substring(cursorPosition);
      input.value = newValue;
      input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  } else if (key === "Enter") {
    // In typing tests, Enter typically submits the current word
    if (input.value.includes(" ")) {
      // If there's already a space, treat as space
      input.value += " ";
    } else {
      // Otherwise, submit the current word
      input.value += " ";
    }
    input.setSelectionRange(input.value.length, input.value.length);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (key === " ") {
    input.value += " ";
    input.setSelectionRange(input.value.length, input.value.length);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  } else {
    input.value =
      input.value.substring(0, cursorPosition) +
      key +
      input.value.substring(cursorPosition);
    input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  input.focus();
  playKeySound();
}

// Switch between game modes
function switchMode(mode) {
  state.currentMode = mode;

  // Update active mode button
  elements.modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  // Show/hide mode settings
  elements.modeSettings.forEach((settings) => {
    settings.classList.toggle("active", settings.id === `${mode}-settings`);
  });

  // Update start button text based on mode
  if (mode === "curriculum") {
    elements.startBtn.textContent = "Start Lesson";
  } else if (mode === "practice") {
    elements.startBtn.textContent = "Start Practice";
  } else if (mode === "prediction") {
    elements.startBtn.textContent = "Start Challenge";
  } else if (mode === "numbers") {
    elements.startBtn.textContent = "Start Numbers Test";
  } else {
    elements.startBtn.textContent = "Start Typing Test";
  }

  // Reset test when switching modes
  resetTest();
}

// Handle time selection change
function handleTimeSelectChange() {
  if (elements.timeSelect.value === "custom") {
    elements.customTimeGroup.style.display = "block";
  } else {
    elements.customTimeGroup.style.display = "none";
    updateTimerDisplay();
  }
}

// Handle survival type change
function handleSurvivalTypeChange() {
  if (elements.survivalType.value === "mistakes") {
    elements.maxMistakesGroup.style.display = "block";
    elements.survivalTimeGroup.style.display = "none";
  } else {
    elements.maxMistakesGroup.style.display = "none";
    elements.survivalTimeGroup.style.display = "block";
  }
}

// Update timer display based on selected time
function updateTimerDisplay() {
  let time;
  if (elements.timeSelect.value === "custom") {
    time = parseInt(elements.customTime.value) || 60;
  } else {
    time = parseInt(elements.timeSelect.value);
  }
  elements.timer.textContent = time;
  elements.timeRemaining.textContent = time;
}

// Start the typing test
function startTest() {
  if (state.isRunning) return;

  state.isRunning = true;
  state.isPaused = false;
  state.startTime = new Date();
  state.currentWordIndex = 0;
  state.currentCharIndex = 0;
  state.correctWords = 0;
  state.incorrectWords = 0;
  state.totalKeystrokes = 0;
  state.correctKeystrokes = 0;
  state.errors = {};
  state.heatmap = {};

  // Generate words based on mode
  if (state.currentMode === "numbers") {
    generateNumbers();
  } else if (state.currentMode === "prediction") {
    generatePredictionText();
  } else if (state.currentMode === "practice") {
    generatePracticeText();
  } else if (state.currentMode === "curriculum") {
    startCurriculumLesson();
  } else {
    generateWords();
  }

  // Focus input
  elements.typingInput.focus();
  elements.typingInput.value = "";

  // Start timer based on mode
  if (state.currentMode === "survival") {
    if (elements.survivalType.value === "time") {
      const minutes = parseInt(elements.survivalTime.value) || 5;
      startTimer(minutes * 60);
    } else {
      // Mistakes-based survival doesn't have a time limit
      elements.timer.textContent = "∞";
      elements.timeRemaining.textContent = "∞";
    }
  } else if (state.currentMode === "timed") {
    let time;
    if (elements.timeSelect.value === "custom") {
      time = parseInt(elements.customTime.value) || 60;
    } else {
      time = parseInt(elements.timeSelect.value);
    }
    startTimer(time);
  } else {
    // Other modes (practice, prediction, numbers) use timed mode by default
    startTimer(60);
  }

  // Update UI
  elements.startBtn.disabled = true;
  elements.resetBtn.disabled = false;
  updateStats();
}

// Reset the typing test
function resetTest() {
  state.isRunning = false;
  state.isPaused = false;
  clearInterval(state.timerInterval);

  elements.typingInput.value = "";
  elements.typingInput.disabled = false;

  elements.startBtn.disabled = false;
  elements.resetBtn.disabled = true;

  // Reset timer display
  updateTimerDisplay();

  // Regenerate words instead of clearing
  if (state.currentMode === "numbers") {
    generateNumbers();
  } else if (state.currentMode === "prediction") {
    generatePredictionText();
  } else if (state.currentMode === "practice") {
    generatePracticeText();
  } else if (state.currentMode === "curriculum") {
    // For curriculum, show the current lesson or first lesson
    if (state.currentLesson) {
      loadCurriculumLesson(state.currentLesson);
    }
  } else {
    generateWords();
  }
  updateWordHighlighting();

  // Reset stats
  updateStats();
}

// Handle typing input
function handleTypingInput(e) {
  // Auto-start test if not running
  if (!state.isRunning && !state.isPaused) {
    startTest();
    return;
  }

  if (!state.isRunning || state.isPaused) return;

  const input = e.target;
  const value = input.value;
  state.totalKeystrokes++;

  // Play key sound if enabled
  playKeySound();

  // Update heatmap
  if (value.length > 0) {
    const lastChar = value[value.length - 1];
    if (!state.heatmap[lastChar]) {
      state.heatmap[lastChar] = 0;
    }
    state.heatmap[lastChar]++;
    updateHeatmapDisplay();
  }

  if (state.currentMode === "numbers") {
    handleNumbersInput(value);
  } else {
    handleWordsInput(value);
  }

  updateStats();
}

// Handle input for words mode
function handleWordsInput(value) {
  const currentWord = state.words[state.currentWordIndex];
  const wordElement = elements.wordsContainer.children[state.currentWordIndex];

  // Check if space was pressed (word completed)
  if (value.endsWith(" ")) {
    // Check if word was typed correctly
    const typedWord = value.trim();
    if (typedWord === currentWord) {
      state.correctWords++;
      wordElement.classList.add("correct");
      state.correctKeystrokes += currentWord.length;
    } else {
      state.incorrectWords++;
      wordElement.classList.add("incorrect");

      // Track errors
      const errorKey = `${currentWord}->${typedWord}`;
      if (!state.errors[errorKey]) {
        state.errors[errorKey] = 0;
      }
      state.errors[errorKey]++;
    }

    // Move to next word
    state.currentWordIndex++;
    state.currentCharIndex = 0;

    // Clear input
    elements.typingInput.value = "";

    // Update word highlighting
    updateWordHighlighting();

    // Check if user is about to run out of words (5th last word)
    const wordsRemaining = state.words.length - state.currentWordIndex;
    if (
      wordsRemaining === 5 &&
      (state.currentMode === "survival" || state.currentMode === "timed")
    ) {
      // Generate 15 more words
      const newWords = [];
      const difficulty = elements.difficultySelect.value;
      const language = elements.languageSelect.value;
      const punctuation = elements.punctuationToggle.value === "enabled";

      for (let i = 0; i < 15; i++) {
        let word = getRandomWord(difficulty, language);
        if (punctuation && Math.random() < 0.1) {
          word = addPunctuation(word);
        }
        newWords.push(word);
        state.words.push(word);

        // Create word element
        const wordElement = document.createElement("div");
        wordElement.className = "word";
        wordElement.textContent = word;
        elements.wordsContainer.appendChild(wordElement);
      }
    }

    // Check survival mode mistakes
    if (
      state.currentMode === "survival" &&
      elements.survivalType.value === "mistakes"
    ) {
      const maxMistakes = parseInt(elements.maxMistakes.value) || 5;
      if (state.incorrectWords >= maxMistakes) {
        endTest();
        return;
      }
    }

    // Check if test is complete
    if (state.currentWordIndex >= state.words.length) {
      if (
        state.currentMode === "survival" ||
        state.currentMode === "timed" ||
        state.currentMode === "practice" ||
        state.currentMode === "prediction"
      ) {
        // Generate more words until timer runs out
        generateMoreWords();
      } else {
        endTest();
      }
    }
  } else {
    // Update character highlighting for current word
    updateCharacterHighlighting(value);
  }
}

// Handle input for numbers mode
function handleNumbersInput(value) {
  const targetNumber = state.words[0]; // In numbers mode, we only have one "word" (the number sequence)
  const numberElement = elements.wordsContainer.children[0];

  // Update character highlighting
  updateNumberHighlighting(value);

  // Check if number sequence is completed
  if (value === targetNumber) {
    state.correctWords++;
    state.correctKeystrokes += targetNumber.length;
    endTest();
  } else if (value.length >= targetNumber.length) {
    // If input length matches target but content doesn't, it's incorrect
    state.incorrectWords++;
    endTest();
  }
}

// Update character highlighting for current word
function updateCharacterHighlighting(inputValue) {
  const currentWord = state.words[state.currentWordIndex];
  const wordElement = elements.wordsContainer.children[state.currentWordIndex];

  // Clear previous highlighting
  wordElement.innerHTML = "";

  // Track correct keystrokes for this update
  let correctInThisWord = 0;

  // Add each character with appropriate class
  for (let i = 0; i < currentWord.length; i++) {
    const charSpan = document.createElement("span");
    charSpan.textContent = currentWord[i];

    if (i < inputValue.length) {
      if (currentWord[i] === inputValue[i]) {
        charSpan.className = "correct";
        correctInThisWord++;
      } else {
        charSpan.className = "incorrect";
      }
    }

    wordElement.appendChild(charSpan);
  }

  // Update correct keystrokes (only count once per character)
  state.correctKeystrokes = state.correctWords * 5 + correctInThisWord; // Approximate

  // Highlight current word
  elements.wordsContainer.querySelectorAll(".word").forEach((word, index) => {
    word.classList.toggle("current", index === state.currentWordIndex);
  });
}

// Update number highlighting for numbers mode
function updateNumberHighlighting(inputValue) {
  const targetNumber = state.words[0];
  const numberElement = elements.wordsContainer.children[0];

  // Clear previous highlighting
  numberElement.innerHTML = "";

  // Add each digit with appropriate class
  for (let i = 0; i < targetNumber.length; i++) {
    const digitSpan = document.createElement("span");
    digitSpan.textContent = targetNumber[i];

    if (i < inputValue.length) {
      if (targetNumber[i] === inputValue[i]) {
        digitSpan.className = "correct";
      } else {
        digitSpan.className = "incorrect";
      }
    }

    numberElement.appendChild(digitSpan);
  }
}

// Update word highlighting
function updateWordHighlighting() {
  elements.wordsContainer.querySelectorAll(".word").forEach((word, index) => {
    word.classList.toggle("current", index === state.currentWordIndex);
  });
}

// Handle key down events
function handleKeyDown(e) {
  // Prevent default for tab key to avoid losing focus
  if (e.key === "Tab") {
    e.preventDefault();
  }

  // Play key sound
  playKeySound();

  // Highlight virtual keyboard key
  highlightVirtualKey(e.key);
}

// Handle global key down events
function handleGlobalKeyDown(e) {
  // Start/Restart test with Tab key
  if (e.key === "Tab" && !isModalOpen()) {
    e.preventDefault();
    if (state.isRunning) {
      resetTest();
      setTimeout(() => startTest(), 100);
    } else {
      startTest();
    }
  }

  // Stop test with Escape key (not restart)
  if (e.key === "Escape" && state.isRunning) {
    resetTest();
  }
}

// Handle input focus
function handleInputFocus() {
  if (state.isRunning && !state.isPaused) {
    elements.typingInput.placeholder = "";
  }
}

// Handle input blur
function handleInputBlur() {
  if (state.isRunning && !state.isPaused) {
    elements.typingInput.placeholder = "Click here to continue typing...";
  }
}

// Highlight virtual keyboard key
function highlightVirtualKey(key) {
  const keyElement = elements.keyboard.querySelector(`[data-key="${key}"]`);
  if (keyElement) {
    keyElement.classList.add("active");
    setTimeout(() => {
      keyElement.classList.remove("active");
    }, 100);
  }
}

// Initialize Audio Context
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Play key sound
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
      case "asmr":
        playASMRSound(ctx);
        break;
      case "soft":
        playSoftSound(ctx);
        break;
      case "clicky":
        playClickySound(ctx);
        break;
      case "vintage":
        playVintageSound(ctx);
        break;
      case "modern":
        playModernSound(ctx);
        break;
      case "gaming":
        playGamingSound(ctx);
        break;
      default:
        playMechanicalSound(ctx);
    }
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}

// Mechanical keyboard sound (Cherry MX Blue style)
function playMechanicalSound(ctx) {
  const now = ctx.currentTime;

  // Create oscillator for the click
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Sharp, clicky sound
  oscillator.frequency.setValueAtTime(800, now);
  oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.01);

  gainNode.gain.setValueAtTime(0.3 * state.soundVolume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

  oscillator.start(now);
  oscillator.stop(now + 0.05);
}

// Typewriter sound (vintage mechanical)
function playTypewriterSound(ctx) {
  const now = ctx.currentTime;

  // Main strike sound
  const oscillator1 = ctx.createOscillator();
  const gainNode1 = ctx.createGain();

  oscillator1.connect(gainNode1);
  gainNode1.connect(ctx.destination);

  oscillator1.frequency.setValueAtTime(150, now);
  oscillator1.frequency.exponentialRampToValueAtTime(50, now + 0.02);

  gainNode1.gain.setValueAtTime(0.4 * state.soundVolume, now);
  gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  oscillator1.start(now);
  oscillator1.stop(now + 0.08);

  // Metallic resonance
  const oscillator2 = ctx.createOscillator();
  const gainNode2 = ctx.createGain();

  oscillator2.connect(gainNode2);
  gainNode2.connect(ctx.destination);

  oscillator2.frequency.setValueAtTime(1200, now + 0.005);
  oscillator2.frequency.exponentialRampToValueAtTime(800, now + 0.03);

  gainNode2.gain.setValueAtTime(0.15 * state.soundVolume, now + 0.005);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

  oscillator2.start(now + 0.005);
  oscillator2.stop(now + 0.06);
}

// ASMR soft keyboard sound
function playASMRSound(ctx) {
  const now = ctx.currentTime;

  // Soft, muffled sound with pink noise
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate pink noise (softer than white noise)
  let b0 = 0,
    b1 = 0,
    b2 = 0,
    b3 = 0,
    b4 = 0,
    b5 = 0,
    b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }

  const noise = ctx.createBufferSource();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  noise.buffer = buffer;
  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, now);
  filter.frequency.exponentialRampToValueAtTime(500, now + 0.05);

  gainNode.gain.setValueAtTime(0.15 * state.soundVolume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  noise.start(now);
  noise.stop(now + 0.08);
}

// Soft membrane keyboard sound
function playSoftSound(ctx) {
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(300, now);
  oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.03);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(800, now);

  gainNode.gain.setValueAtTime(0.2 * state.soundVolume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

  oscillator.start(now);
  oscillator.stop(now + 0.04);
}

// Clicky keyboard sound (tactile switches)
function playClickySound(ctx) {
  const now = ctx.currentTime;

  // High-pitched click
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(1200, now);
  oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.008);

  gainNode.gain.setValueAtTime(0.25 * state.soundVolume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03);

  oscillator.start(now);
  oscillator.stop(now + 0.03);
}

// Silent keyboard sound (very subtle)
function playSilentSound(ctx) {
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(400, now);

  gainNode.gain.setValueAtTime(0.05 * state.soundVolume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.02);

  oscillator.start(now);
  oscillator.stop(now + 0.02);
}

// Vintage computer sound (like old IBM keyboards)
function playVintageSound(ctx) {
  const now = ctx.currentTime;

  // Main click sound
  const oscillator1 = ctx.createOscillator();
  const gainNode1 = ctx.createGain();
  const filter1 = ctx.createBiquadFilter();

  oscillator1.connect(filter1);
  filter1.connect(gainNode1);
  gainNode1.connect(ctx.destination);

  oscillator1.frequency.setValueAtTime(200, now);
  oscillator1.frequency.exponentialRampToValueAtTime(100, now + 0.03);

  filter1.type = "lowpass";
  filter1.frequency.setValueAtTime(800, now);

  gainNode1.gain.setValueAtTime(0.3 * state.soundVolume, now);
  gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  oscillator1.start(now);
  oscillator1.stop(now + 0.08);

  // Low frequency resonance
  const oscillator2 = ctx.createOscillator();
  const gainNode2 = ctx.createGain();

  oscillator2.connect(gainNode2);
  gainNode2.connect(ctx.destination);

  oscillator2.frequency.setValueAtTime(80, now + 0.01);

  gainNode2.gain.setValueAtTime(0.1 * state.soundVolume, now + 0.01);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  oscillator2.start(now + 0.01);
  oscillator2.stop(now + 0.1);
}

// Modern laptop sound (clean, minimal)
function playModernSound(ctx) {
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(600, now);
  oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.02);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, now);

  gainNode.gain.setValueAtTime(0.15 * state.soundVolume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

  oscillator.start(now);
  oscillator.stop(now + 0.04);
}

// Gaming keyboard sound (deep, satisfying)
function playGamingSound(ctx) {
  const now = ctx.currentTime;

  // Deep bass click
  const oscillator1 = ctx.createOscillator();
  const gainNode1 = ctx.createGain();

  oscillator1.connect(gainNode1);
  gainNode1.connect(ctx.destination);

  oscillator1.frequency.setValueAtTime(150, now);
  oscillator1.frequency.exponentialRampToValueAtTime(50, now + 0.05);

  gainNode1.gain.setValueAtTime(0.4 * state.soundVolume, now);
  gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  oscillator1.start(now);
  oscillator1.stop(now + 0.1);

  // High frequency snap
  const oscillator2 = ctx.createOscillator();
  const gainNode2 = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator2.connect(filter);
  filter.connect(gainNode2);
  gainNode2.connect(ctx.destination);

  oscillator2.type = "square";
  oscillator2.frequency.setValueAtTime(2000, now);
  oscillator2.frequency.exponentialRampToValueAtTime(1000, now + 0.01);

  filter.type = "highpass";
  filter.frequency.setValueAtTime(1500, now);

  gainNode2.gain.setValueAtTime(0.2 * state.soundVolume, now);
  gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.03);

  oscillator2.start(now);
  oscillator2.stop(now + 0.03);
}

// Start timer
function startTimer(seconds) {
  let timeLeft = seconds;
  elements.timer.textContent = timeLeft;
  elements.timeRemaining.textContent = timeLeft;

  // Remove danger class at start
  elements.timer.classList.remove("danger");

  state.timerInterval = setInterval(() => {
    timeLeft--;
    elements.timer.textContent = timeLeft;
    elements.timeRemaining.textContent = timeLeft;

    // Add danger class when 10 seconds or less remain
    if (timeLeft <= 10 && timeLeft > 0) {
      elements.timer.classList.add("danger");
    } else {
      elements.timer.classList.remove("danger");
    }

    if (timeLeft <= 0) {
      clearInterval(state.timerInterval);
      elements.timer.classList.remove("danger");
      endTest();
    }
  }, 1000);
}

// Toggle pause state
function togglePause() {
  state.isPaused = !state.isPaused;

  if (state.isPaused) {
    clearInterval(state.timerInterval);
    elements.typingInput.disabled = true;
    elements.typingInput.placeholder = "Test Paused - Press Space to resume";
  } else {
    // Resume timer
    const timeLeft = parseInt(elements.timer.textContent);
    startTimer(timeLeft);
    elements.typingInput.disabled = false;
    elements.typingInput.placeholder = "";
    elements.typingInput.focus();
  }
}

// End the test
function endTest() {
  state.isRunning = false;
  clearInterval(state.timerInterval);

  // Disable typing input
  elements.typingInput.disabled = true;

  // Calculate final stats
  const endTime = new Date();
  const timeElapsed = (endTime - state.startTime) / 1000; // in seconds
  const totalWords = state.correctWords + state.incorrectWords;
  const wpm =
    totalWords > 0 ? Math.round((state.correctWords / timeElapsed) * 60) : 0;
  const accuracy =
    state.totalKeystrokes > 0
      ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100)
      : 100;

  // Update results modal
  elements.resultWpm.textContent = wpm;
  elements.resultAccuracy.textContent = `${accuracy}%`;
  elements.resultCorrect.textContent = state.correctWords;
  elements.resultIncorrect.textContent = state.incorrectWords;
  elements.resultKeystrokes.textContent = state.totalKeystrokes;
  elements.resultTime.textContent = `${Math.round(timeElapsed)}s`;

  // Check for new achievements
  checkAchievements(wpm, accuracy, timeElapsed);

  // Check for first test achievement
  if (!hasAchievement("first_test")) {
    state.achievements.push({
      id: "first_test",
      name: "First Test",
      description: "Complete your first typing test",
      icon: "🎯",
    });

    // Save to database if user is logged in
    if (state.user) {
      db.collection("users")
        .doc(state.user.uid)
        .update({
          achievements: firebase.firestore.FieldValue.arrayUnion({
            id: "first_test",
            name: "First Test",
            description: "Complete your first typing test",
            icon: "🎯",
            unlockedAt: new Date(),
          }),
        })
        .catch((error) => {
          console.error("Error saving first test achievement:", error);
        });
    }
  }

  // Complete curriculum lesson if in curriculum mode
  if (state.currentMode === "curriculum") {
    completeCurriculumLesson(wpm, accuracy);
  }

  // Save test results if user is logged in
  if (state.user) {
    saveTestResult({
      wpm,
      accuracy,
      correctWords: state.correctWords,
      incorrectWords: state.incorrectWords,
      keystrokes: state.totalKeystrokes,
      timeElapsed,
      mode: state.currentMode,
      timestamp: new Date(),
    });
  }

  // Show results modal
  showModal(elements.resultsModal);

  // Update analysis
  updateAnalysis(wpm, accuracy);
}

// Generate words for the test
function generateWords() {
  const wordCount = getWordCount();
  const difficulty = elements.difficultySelect.value;
  const language = elements.languageSelect.value;
  const punctuation = elements.punctuationToggle.value === "enabled";

  // Clear words container
  elements.wordsContainer.innerHTML = "";

  // Generate words based on difficulty and language
  state.words = [];
  for (let i = 0; i < wordCount; i++) {
    let word = getRandomWord(difficulty, language);

    // Add punctuation occasionally if enabled
    if (punctuation && Math.random() < 0.1) {
      word = addPunctuation(word);
    }

    state.words.push(word);

    // Create word element
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  }

  // Highlight first word
  updateWordHighlighting();
}

// Generate more words dynamically
function generateMoreWords() {
  const difficulty = elements.difficultySelect.value;
  const language = elements.languageSelect.value;
  const punctuation = elements.punctuationToggle.value === "enabled";

  // Generate 20 more words
  for (let i = 0; i < 20; i++) {
    let word = getRandomWord(difficulty, language);

    if (punctuation && Math.random() < 0.1) {
      word = addPunctuation(word);
    }

    state.words.push(word);

    // Create word element
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  }
}

// Generate numbers for numbers mode
function generateNumbers() {
  const length = parseInt(elements.numbersLength.value) || 20;
  const type = elements.numbersType.value;

  let numberString = "";

  switch (type) {
    case "sequential":
      for (let i = 1; i <= length; i++) {
        numberString += i % 10; // This creates a sequential pattern
      }
      break;
    case "decimal":
      // Generate decimal numbers
      const wholePart = Math.floor(Math.random() * 1000);
      const decimalPart = Math.floor(Math.random() * 100);
      numberString = `${wholePart}.${decimalPart}`;
      break;
    case "phone":
      // Generate phone number format
      numberString = `(${Math.floor(Math.random() * 900) + 100}) ${
        Math.floor(Math.random() * 900) + 100
      }-${Math.floor(Math.random() * 9000) + 1000}`;
      break;
    case "random":
    default:
      // Generate random digits
      for (let i = 0; i < length; i++) {
        numberString += Math.floor(Math.random() * 10);
      }
      break;
  }

  // Clear words container and add the number
  elements.wordsContainer.innerHTML = "";
  state.words = [numberString];

  const numberElement = document.createElement("div");
  numberElement.className = "word numbers-mode";
  numberElement.textContent = numberString;
  elements.wordsContainer.appendChild(numberElement);
}

// Generate prediction text
function generatePredictionText() {
  const difficulty = elements.predictionDifficulty.value;

  // Expanded prediction texts by difficulty
  const predictionTexts = {
    easy: [
      "The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet.",
      "She sells seashells by the seashore. The shells she sells are surely seashells.",
      "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
      "Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked.",
      "I scream you scream we all scream for ice cream on a sunny day at the beach.",
      "The rain in Spain falls mainly on the plain where the flowers grow beautifully.",
      "A journey of a thousand miles begins with a single step forward into the unknown.",
      "All that glitters is not gold but sometimes it can be something even more valuable.",
      "Better late than never but never late is better when it comes to important meetings.",
      "Practice makes perfect and perfect practice makes you even better at your craft.",
    ],
    medium: [
      "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
      "The Internet is a global system of interconnected computer networks that use the Internet protocol suite.",
      "Artificial intelligence is intelligence demonstrated by machines, as opposed to natural intelligence.",
      "Machine learning algorithms can identify patterns in data and make predictions based on those patterns.",
      "Cloud computing provides on-demand access to computing resources over the internet without direct management.",
      "Cybersecurity involves protecting computer systems and networks from digital attacks and unauthorized access.",
      "Data science combines statistics programming and domain expertise to extract insights from complex datasets.",
      "Software development is an iterative process that involves planning designing coding testing and maintenance.",
      "User experience design focuses on creating products that provide meaningful and relevant experiences to users.",
      "Blockchain technology enables secure transparent and decentralized record-keeping across distributed networks.",
    ],
    hard: [
      "Pneumonoultramicroscopicsilicovolcanoconiosis is a lung disease caused by inhalation of very fine silicate or quartz dust.",
      "Floccinaucinihilipilification is the act or habit of estimating something as worthless.",
      "The phenomenon of quantum entanglement allows particles to influence each other instantaneously regardless of distance.",
      "Supercalifragilisticexpialidocious is an extraordinarily good word that expresses approval or enthusiasm.",
      "Antidisestablishmentarianism refers to opposition to the disestablishment of the Church of England.",
      "Incomprehensibilities represents things that are impossible to understand or comprehend fully.",
      "Electroencephalographically relates to the recording of electrical activity in the brain.",
      "Pseudopseudohypoparathyroidism is a rare inherited disorder affecting calcium and phosphorus metabolism.",
      "Hippopotomonstrosesquippedaliophobia is ironically the fear of long words themselves.",
      "Dichlorodifluoromethane is a colorless gas used as a refrigerant and aerosol propellant.",
    ],
  };

  const texts = predictionTexts[difficulty] || predictionTexts.easy;
  const text = texts[Math.floor(Math.random() * texts.length)];

  // Clear words container and add the text
  elements.wordsContainer.innerHTML = "";
  state.words = text.split(" ");

  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });

  // Highlight first word
  updateWordHighlighting();
}

// Get random word based on difficulty and language
function getRandomWord(difficulty, language) {
  // Sample word lists by difficulty and language
  const wordLists = {
    english: {
      easy: [
        "cat",
        "dog",
        "sun",
        "pen",
        "book",
        "fish",
        "egg",
        "man",
        "cup",
        "car",
        "bus",
        "fan",
        "bag",
        "toy",
        "top",
        "bed",
        "box",
        "hat",
        "map",
        "run",
        "boy",
        "girl",
        "rain",
        "snow",
        "milk",
        "tea",
        "jam",
        "pie",
        "hot",
        "cold",
        "red",
        "blue",
        "green",
        "black",
        "white",
        "big",
        "small",
        "fast",
        "slow",
        "up",
        "down",
        "left",
        "right",
        "open",
        "close",
        "sit",
        "stand",
        "walk",
        "jump",
        "play",
        "work",
        "home",
        "mom",
        "dad",
        "bro",
        "sis",
        "food",
        "rice",
        "meat",
        "salt",
        "sugar",
        "oil",
        "fire",
        "wind",
        "sky",
        "star",
        "moon",
        "day",
        "night",
        "light",
        "door",
        "key",
        "hand",
        "foot",
        "eye",
        "ear",
        "head",
        "hair",
        "face",
        "nose",
        "shoe",
        "shirt",
        "pant",
        "cap",
        "bag",
        "ball",
        "ring",
        "bell",
        "chair",
        "table",
        "road",
        "street",
        "bike",
        "bus",
        "train",
        "ship",
        "car",
        "rick",
        "jeep",
        "taxi",
        "hill",
        "sea",
        "lake",
        "tree",
        "wood",
        "leaf",
        "seed",
        "root",
        "sand",
        "rock",
        "job",
        "task",
        "call",
        "meet",
        "mail",
        "note",
        "game",
        "card",
        "play",
        "toy",
        "fun",
        "joke",
        "smile",
        "laugh",
        "cry",
        "angry",
        "happy",
        "sad",
        "bad",
        "good",
        "love",
        "like",
        "care",
        "hug",
        "kiss",
        "hope",
        "wish",
        "luck",
        "try",
        "help",
        "yes",
        "no",
        "ok",
        "hi",
        "hey",
        "bye",
        "thanks",
        "sorry",
        "sure",
        "fine",
        "cool",
        "nice",
        "best",
        "fast",
        "slow",
        "old",
        "new",
        "warm",
        "cold",
        "hot",
        "eat",
        "drink",
        "cook",
        "wash",
        "read",
        "write",
        "draw",
        "sing",
        "dance",
        "jump",
        "run",
        "stop",
        "go",
        "come",
        "stay",
        "move",
        "look",
        "see",
        "hear",
        "feel",
        "touch",
        "hold",
        "open",
        "close",
        "push",
        "pull",
        "drop",
        "pick",
        "find",
        "lose",
        "win",
        "fail",
        "pass",
        "start",
        "end",
        "begin",
        "finish",
        "give",
        "take",
        "make",
        "build",
        "break",
        "cut",
        "join",
        "keep",
        "share",
        "show",
        "hide",
        "send",
        "call",
        "clean",
        "dirty",
        "dry",
        "wet",
        "thin",
        "thick",
        "soft",
        "hard",
        "long",
        "short",
        "round",
        "flat",
        "full",
        "empty",
        "true",
        "false",
        "same",
        "other",
        "first",
        "last",
        "early",
        "late",
        "high",
        "low",
        "near",
        "far",
        "here",
        "there",
        "this",
        "that",
        "these",
        "those",
        "who",
        "what",
        "when",
        "where",
        "why",
        "how",
        "under",
        "over",
        "into",
        "out",
        "around",
        "above",
        "below",
        "before",
        "after",
        "soon",
        "later",
        "always",
        "never",
        "sometimes",
        "often",
        "again",
        "once",
        "twice",
        "many",
        "few",
        "some",
        "all",
        "none",
        "each",
        "any",
        "every",
        "much",
        "more",
        "less",
        "best",
        "worst",
        "better",
        "badly",
        "quick",
        "slowly",
        "kind",
        "mean",
        "funny",
        "silly",
        "happy",
        "angry",
        "calm",
        "rainy",
        "sunny",
        "cloudy",
        "stormy",
        "hotter",
        "colder",
        "loud",
        "quiet",
        "softly",
        "hardly",
      ],
      medium: [
        "school",
        "college",
        "office",
        "family",
        "father",
        "mother",
        "sister",
        "brother",
        "uncle",
        "aunt",
        "teacher",
        "student",
        "friend",
        "people",
        "travel",
        "ticket",
        "market",
        "doctor",
        "nurse",
        "patient",
        "medicine",
        "hospital",
        "police",
        "report",
        "result",
        "meeting",
        "project",
        "group",
        "leader",
        "member",
        "garden",
        "forest",
        "river",
        "bridge",
        "village",
        "town",
        "city",
        "country",
        "nation",
        "capital",
        "holiday",
        "vacation",
        "subject",
        "chapter",
        "lesson",
        "story",
        "poem",
        "novel",
        "history",
        "science",
        "physics",
        "chemistry",
        "biology",
        "maths",
        "english",
        "language",
        "culture",
        "society",
        "tradition",
        "custom",
        "fatherhood",
        "motherhood",
        "childhood",
        "freedom",
        "justice",
        "honesty",
        "truth",
        "dream",
        "future",
        "past",
        "present",
        "moment",
        "second",
        "minute",
        "hour",
        "season",
        "summer",
        "winter",
        "autumn",
        "spring",
        "climate",
        "storm",
        "thunder",
        "lightning",
        "weather",
        "sunrise",
        "sunset",
        "morning",
        "evening",
        "night",
        "holiday",
        "weekend",
        "festival",
        "celebration",
        "birthday",
        "marriage",
        "friendship",
        "love",
        "care",
        "respect",
        "kindness",
        "bravery",
        "courage",
        "wisdom",
        "knowledge",
        "practice",
        "effort",
        "success",
        "failure",
        "attempt",
        "business",
        "company",
        "manager",
        "worker",
        "driver",
        "farmer",
        "engineer",
        "doctor",
        "lawyer",
        "judge",
        "clerk",
        "writer",
        "poet",
        "actor",
        "artist",
        "singer",
        "dancer",
        "player",
        "football",
        "cricket",
        "tennis",
        "badminton",
        "hockey",
        "chess",
        "ludo",
        "game",
        "sport",
        "team",
        "victory",
        "defeat",
        "goal",
        "win",
        "lose",
        "draw",
        "score",
        "match",
        "ground",
        "stadium",
        "computer",
        "mobile",
        "laptop",
        "tablet",
        "printer",
        "keyboard",
        "mouse",
        "screen",
        "cable",
        "file",
        "folder",
        "document",
        "letter",
        "email",
        "message",
        "call",
        "number",
        "data",
        "chart",
        "graph",
        "freedom",
        "democracy",
        "rights",
        "duties",
        "laws",
        "rules",
        "constitution",
        "government",
        "policy",
        "system",
        "service",
        "network",
        "internet",
        "website",
        "page",
        "account",
        "password",
        "login",
        "register",
        "submit",
        "update",
        "delete",
        "create",
        "upload",
        "download",
        "share",
        "comment",
        "like",
        "follow",
        "unfollow",
        "search",
        "filter",
        "option",
        "button",
        "window",
        "server",
        "client",
        "device",
        "remote",
        "signal",
        "charge",
        "battery",
        "energy",
        "power",
        "source",
        "engine",
        "motor",
        "fuel",
        "diesel",
        "petrol",
        "gas",
        "electric",
        "train",
        "flight",
        "airport",
        "station",
        "ticket",
        "passport",
        "visa",
        "border",
        "journey",
        "trip",
        "adventure",
        "explore",
        "discover",
        "study",
        "research",
        "examine",
        "question",
        "answer",
        "solution",
        "problem",
        "issue",
        "matter",
        "reason",
        "purpose",
        "plan",
        "goal",
        "target",
        "success",
        "failure",
        "result",
        "exam",
        "paper",
        "board",
        "university",
        "college",
        "campus",
        "library",
        "lab",
        "teacher",
        "student",
        "homework",
        "assignment",
        "practice",
        "study",
        "revision",
        "test",
        "quiz",
        "score",
        "marks",
        "grade",
      ],
      hard: [
        "administration",
        "organization",
        "management",
        "development",
        "research",
        "innovation",
        "experience",
        "education",
        "knowledge",
        "analysis",
        "application",
        "implementation",
        "opportunity",
        "strategic",
        "international",
        "professional",
        "scientific",
        "engineering",
        "architecture",
        "politics",
        "diplomacy",
        "constitution",
        "legislation",
        "environment",
        "philosophy",
        "sociology",
        "psychology",
        "economics",
        "statistics",
        "university",
        "professor",
        "conference",
        "seminar",
        "presentation",
        "publication",
        "editorial",
        "journalism",
        "communication",
        "negotiation",
        "investment",
        "entrepreneur",
        "corporation",
        "infrastructure",
        "transportation",
        "manufacturing",
        "production",
        "technology",
        "software",
        "hardware",
        "database",
        "algorithm",
        "cybersecurity",
        "artificial",
        "intelligence",
        "machine",
        "learning",
        "automation",
        "simulation",
        "visualization",
        "creativity",
        "motivation",
        "discipline",
        "dedication",
        "collaboration",
        "coordination",
        "integration",
        "sustainability",
        "globalization",
        "industrialization",
        "modernization",
        "urbanization",
        "conservation",
        "environmental",
        "biodiversity",
        "ecosystem",
        "renewable",
        "probability",
        "calculation",
        "derivation",
        "integration",
        "differentiation",
        "literature",
        "aesthetics",
        "ideology",
        "philosopher",
        "strategist",
        "analyst",
        "specialist",
        "consultant",
        "executive",
        "director",
        "coordinator",
        "administrator",
        "supervisor",
        "compliance",
        "legislation",
        "representation",
        "institution",
        "scholarship",
        "curriculum",
        "academic",
        "theoretical",
        "practical",
        "experimental",
        "laboratory",
        "hypothesis",
        "observation",
        "interpretation",
        "evaluation",
        "assessment",
        "examination",
        "documentation",
        "certification",
        "qualification",
        "standard",
        "criteria",
        "translation",
        "digitalization",
        "virtualization",
        "transformation",
        "entrepreneurship",
        "partnership",
        "collaboration",
        "organization",
        "representation",
        "architecture",
        "engineering",
        "philosophy",
        "sociology",
        "psychology",
        "methodology",
        "terminology",
        "vocabulary",
        "encyclopedia",
        "biotechnology",
        "nanotechnology",
        "aerospace",
        "quantum",
        "astrophysics",
        "geopolitics",
        "differentiation",
        "integration",
        "derivation",
        "trigonometry",
        "algebra",
        "geometry",
        "calculus",
        "arithmetic",
        "probability",
        "statistics",
        "experiment",
        "observation",
        "conclusion",
        "demonstration",
        "evaluation",
        "interpretation",
        "hypothesis",
        "formulation",
        "derivation",
        "extrapolation",
        "microscope",
        "telescope",
        "satellite",
        "astronomy",
        "planetary",
        "galactic",
        "universe",
        "dimension",
        "theory",
        "concept",
        "perspective",
        "context",
        "framework",
        "mechanism",
        "structure",
        "system",
        "network",
        "interface",
        "protocol",
        "algorithm",
        "encryption",
        "decryption",
        "authentication",
        "verification",
        "authorization",
        "computation",
        "complexity",
        "optimization",
        "approximation",
        "simulation",
        "biological",
        "genetic",
        "evolution",
        "mutation",
        "adaptation",
        "reproduction",
        "metabolism",
        "respiration",
        "circulation",
        "digestion",
      ],
    },
    bangla: {
      easy: [
        "আমি",
        "তুমি",
        "সে",
        "আমরা",
        "তারা",
        "কি",
        "কেন",
        "কোথায়",
        "কিভাবে",
        "এখানে",
        "আজ",
        "কাল",
        "গতকাল",
        "সময়",
        "দিন",
        "রাত",
        "ঘর",
        "বাড়ি",
        "মা",
        "বাবা",
        "ভাই",
        "বোন",
        "বন্ধু",
        "চা",
        "পানি",
        "ভাত",
        "ডাল",
        "মাছ",
        "ডিম",
        "রুটি",
        "কলা",
        "আম",
        "লিচু",
        "ফল",
        "বই",
        "খাতা",
        "কলম",
        "কাগজ",
        "ক্লাস",
        "ছাত্র",
        "শিক্ষক",
        "কাজ",
        "দরজা",
        "জানালা",
        "চেয়ার",
        "টেবিল",
        "লাইট",
        "ফ্যান",
        "কাপ",
        "বাটি",
        "বাস",
        "রিকশা",
        "গাড়ি",
        "ট্রেন",
        "সাইকেল",
        "রাস্তা",
        "বাজার",
        "দোকান",
        "শহর",
        "গ্রাম",
        "ঢাকা",
        "সিলেট",
        "খুলনা",
        "চট্টগ্রাম",
        "খেলা",
        "গান",
        "নাচ",
        "টিভি",
        "রেডিও",
        "গল্প",
        "খবর",
        "পত্রিকা",
        "কাগজ",
        "ফোন",
        "কল",
        "টাকা",
        "দাম",
        "ব্যাগ",
        "কাপড়",
        "জুতো",
        "শার্ট",
        "প্যান্ট",
        "লুঙ্গি",
        "টুপি",
        "চশমা",
        "চাবি",
        "ঘড়ি",
        "হাত",
        "পা",
        "মুখ",
        "চোখ",
        "কান",
        "নাক",
        "চুল",
        "মাথা",
        "বই",
        "নোট",
        "ছবি",
        "গেম",
        "অ্যাপ",
        "মোবাইল",
        "কম্পিউটার",
        "ল্যাপটপ",
        "ওয়েব",
        "ইন্টারনেট",
        "গুগল",
        "ফেসবুক",
        "ইউটিউব",
        "মেইল",
        "চিঠি",
        "ভালো",
        "মন্দ",
        "খুশি",
        "দুঃখ",
        "রাগ",
        "ভয়",
        "আনন্দ",
        "হ্যাঁ",
        "না",
        "ধন্যবাদ",
        "বিদায়",
        "স্বাগতম",
        "অনুগ্রহ",
        "অবশ্যই",
        "শুভ",
        "পান",
        "খাও",
        "ঘুম",
        "দৌড়",
        "হাঁটা",
        "ছোট",
        "বড়",
        "খাটো",
        "লম্বা",
        "হালকা",
        "ভারী",
        "গরম",
        "শীত",
        "ঠান্ডা",
        "গরম",
        "আকাশ",
        "চাঁদ",
        "সূর্য",
        "তারা",
        "মেঘ",
        "বৃষ্টি",
        "শীত",
        "গ্রীষ্ম",
        "বর্ষা",
        "হাওয়া",
        "লাল",
        "নীল",
        "সবুজ",
        "কালো",
        "সাদা",
        "হলুদ",
        "গোলাপি",
        "কমলা",
        "বাদামি",
        "রূপা",
        "সোনা",
        "জামা",
        "কাপড়",
        "খাও",
        "পান",
        "যাও",
        "আসো",
        "বসো",
        "দাঁড়াও",
        "হাসো",
        "কাঁদো",
        "দেখো",
        "শোনো",
        "খেলো",
        "পড়ো",
        "লেখো",
        "চলো",
        "থামো",
        "দাও",
        "নাও",
      ],
      medium: [
        "পরিবার",
        "শিক্ষক",
        "ছাত্রছাত্রী",
        "অফিস",
        "কর্মী",
        "প্রকল্প",
        "রিপোর্ট",
        "মিটিং",
        "পরীক্ষা",
        "ফলাফল",
        "ভ্রমণ",
        "টিকিট",
        "স্টেশন",
        "এয়ারপোর্ট",
        "প্রশ্ন",
        "উত্তর",
        "বইপত্র",
        "নোটবুক",
        "ডায়েরি",
        "ড্রাইভার",
        "চালক",
        "যাত্রী",
        "লোকজন",
        "মানুষ",
        "শিশু",
        "যুবক",
        "যুবতী",
        "বৃদ্ধ",
        "অতিথি",
        "চিকিৎসা",
        "হাসপাতাল",
        "ডাক্তার",
        "নার্স",
        "ওষুধ",
        "টিকা",
        "জ্বর",
        "সর্দি",
        "ক্লিনিক",
        "স্বাস্থ্য",
        "অর্থনীতি",
        "ভূগোল",
        "গণিত",
        "রসায়ন",
        "পদার্থ",
        "ইতিহাস",
        "প্রযুক্তি",
        "কম্পিউটার",
        "প্রিন্টার",
        "কীবোর্ড",
        "ক্যামেরা",
        "ফাইল",
        "ডকুমেন্ট",
        "পাঠশালা",
        "ক্লাসরুম",
        "চিঠিপত্র",
        "সংবাদপত্র",
        "সংগীত",
        "চলচ্চিত্র",
        "নাটক",
        "কবিতা",
        "চলাচল",
        "রাস্তা",
        "সেতু",
        "নদী",
        "সমুদ্র",
        "পাহাড়",
        "জঙ্গল",
        "বনভূমি",
        "বাগান",
        "মাঠ",
        "গাছপালা",
        "ফুল",
        "পাতা",
        "শাকসবজি",
        "আলু",
        "পেঁয়াজ",
        "লঙ্কা",
        "টমেটো",
        "কুমড়া",
        "কাকড়ি",
        "দুধ",
        "চিনি",
        "লবণ",
        "তেল",
        "মিষ্টি",
        "রসগোল্লা",
        "সন্দেশ",
        "পায়েস",
        "চাপাটি",
        "পরোটা",
        "শিক্ষা",
        "জ্ঞান",
        "অধ্যয়ন",
        "অনুশীলন",
        "পরিশ্রম",
        "সাফল্য",
        "অধ্যাপক",
        "গবেষণা",
        "প্রবন্ধ",
        "নিবন্ধ",
        "কর্মক্ষেত্র",
        "চাকরি",
        "ইন্টারভিউ",
        "বেতন",
        "ছুটি",
        "নিয়ম",
        "আইন",
        "সংবিধান",
        "প্রশাসন",
        "সভা",
        "সদস্য",
        "প্রতিনিধি",
        "সভাপতি",
        "মহিলা",
        "পুরুষ",
        "কিশোর",
        "কিশোরী",
        "বসন্ত",
        "গ্রীষ্ম",
        "বর্ষাকাল",
        "শরৎ",
        "হেমন্ত",
        "শীতকাল",
        "গরমকাল",
        "ঝড়",
        "বজ্র",
        "বিদ্যুৎ",
        "কুয়াশা",
        "আলো",
        "অন্ধকার",
        "সকাল",
        "দুপুর",
        "বিকেল",
        "রাত",
        "ভোর",
        "সময়",
        "মুহূর্ত",
        "অপেক্ষা",
        "শুরু",
        "শেষ",
        "আনন্দ",
        "হাসি",
        "কান্না",
        "ভালোবাসা",
        "বন্ধুত্ব",
        "আলাপ",
        "আড্ডা",
        "খেলা",
        "ক্রীড়া",
        "জয়",
        "পরাজয়",
        "চেষ্টা",
        "অভ্যাস",
        "গল্প",
        "উপন্যাস",
        "পাঠ",
        "দর্শন",
        "চিন্তা",
        "ভাবনা",
        "প্রেরণা",
        "লক্ষ্য",
        "ইচ্ছা",
        "আশা",
        "সপ্ন",
        "বাসনা",
        "কাজ",
        "কর্পোরেট",
        "ম্যানেজার",
        "কর্মচারী",
        "দলনেতা",
        "সংযোগ",
        "ইমেইল",
        "ফেসবুক",
        "হোয়াটসঅ্যাপ",
        "টুইটার",
        "ইনস্টাগ্রাম",
        "অ্যাপ",
        "ওয়েবসাইট",
        "পেজ",
        "ভিডিও",
      ],
      hard: [
        "প্রশাসন",
        "সংগঠন",
        "ব্যবসা",
        "অর্থনীতি",
        "প্রযুক্তি",
        "প্রকৌশল",
        "চিকিৎসাবিদ্যা",
        "স্থাপত্য",
        "রাজনীতি",
        "কূটনীতি",
        "আইনসভা",
        "সংবিধান",
        "পরিকল্পনা",
        "কৌশল",
        "নির্দেশনা",
        "পরামর্শ",
        "গবেষণা",
        "উদ্ভাবন",
        "অভিজ্ঞতা",
        "অর্জন",
        "প্রয়োগ",
        "অভ্যন্তরীণ",
        "আন্তর্জাতিক",
        "কৌশলগত",
        "বিশ্লেষণ",
        "অভিনিবেশ",
        "অগ্রগতি",
        "সমাধান",
        "সম্ভাবনা",
        "চিন্তাভাবনা",
        "সংস্কৃতি",
        "সভ্যতা",
        "ঐতিহ্য",
        "অভিজ্ঞতা",
        "অনুভূতি",
        "অন্তর্দৃষ্টি",
        "শিক্ষাবিদ",
        "সমাজবিজ্ঞান",
        "রাষ্ট্রবিজ্ঞান",
        "মানববিদ্যা",
        "জীববিজ্ঞান",
        "পদার্থবিদ্যা",
        "রসায়নবিদ্যা",
        "অর্থনীতি",
        "সংখ্যাতত্ত্ব",
        "গণিতবিদ",
        "পরিসংখ্যান",
        "অধ্যাপক",
        "শিক্ষাব্যবস্থা",
        "উপাচার্য",
        "প্রশিক্ষণ",
        "পরামর্শদাতা",
        "প্রতিষ্ঠান",
        "সংগঠন",
        "কনফারেন্স",
        "সেমিনার",
        "ওয়ার্কশপ",
        "প্রেজেন্টেশন",
        "প্রতিবেদন",
        "প্রতিযোগিতা",
        "কর্মসূচি",
        "প্রকল্প",
        "অর্থায়ন",
        "উন্নয়ন",
        "ব্যবস্থাপনা",
        "পরিচালক",
        "প্রযোজক",
        "লেখক",
        "সাহিত্য",
        "দর্শন",
        "সমাজতত্ত্ব",
        "সংঘাত",
        "সংঘর্ষ",
        "অভিযোগ",
        "নির্দেশনা",
        "অর্জন",
        "পাঠক্রম",
        "অভ্যন্তর",
        "প্রশাসক",
        "ব্যবস্থাপক",
        "কর্মপদ্ধতি",
        "কার্যক্রম",
        "পর্যবেক্ষণ",
        "সমীক্ষা",
        "অনুষ্ঠান",
        "মাধ্যম",
        "সাংবাদিকতা",
        "সম্পাদক",
        "প্রকাশনা",
        "প্রকাশক",
        "তথ্যপ্রযুক্তি",
        "কৃত্রিম",
        "বুদ্ধিমত্তা",
        "ডেটাবেস",
        "নেটওয়ার্ক",
        "প্রোগ্রামিং",
        "অ্যালগরিদম",
        "অ্যাপ্লিকেশন",
        "ইনোভেশন",
        "সাইবার",
        "গণমাধ্যম",
        "যোগাযোগ",
        "সমন্বয়",
        "সমর্থন",
        "অর্থায়ন",
        "তহবিল",
        "সংবেদনশীল",
        "অভিব্যক্তি",
        "মানসিকতা",
        "মনস্তত্ত্ব",
        "প্রতিভা",
        "সৃজনশীলতা",
        "উদ্দীপনা",
        "আবিষ্কার",
        "আবেদন",
        "অর্জন",
        "চিন্তন",
        "সমাধান",
        "সংকট",
        "সমাধান",
        "গণতন্ত্র",
        "স্বাধীনতা",
        "সংগ্রাম",
        "অভিযান",
        "অধিকার",
        "দায়িত্ব",
        "প্রতিশ্রুতি",
        "বিবেক",
        "নৈতিকতা",
        "নৈতিক",
        "সংগঠন",
        "সমন্বয়",
        "প্রকৌশল",
        "প্রশিক্ষণ",
        "অভ্যাস",
        "অধিবেশন",
        "সংগীত",
        "সাহিত্য",
        "শিল্পকলা",
        "চিত্রকলা",
        "আন্তর্জাতিক",
        "প্রতিনিধি",
        "সম্মেলন",
        "সংযোগ",
        "বাণিজ্য",
        "মুক্তি",
        "অধিনায়ক",
        "প্রতিযোগী",
        "অধিকারী",
        "নেতৃত্ব",
        "সংরক্ষণ",
        "পরিবেশ",
        "জলবায়ু",
        "প্রকৃতি",
        "সম্পদ",
        "উৎপাদন",
        "অর্থনীতি",
        "পরিবহন",
        "বিদ্যুৎ",
        "প্রযুক্তি",
        "বিমানবন্দর",
        "পর্যটন",
        "হোটেল",
        "সফটওয়্যার",
        "হার্ডওয়্যার",
        "মেশিন",
        "যন্ত্রপাতি",
        "পরীক্ষণ",
        "গবেষক",
        "অধ্যয়ন",
      ],
    },
  };

  const words = wordLists[language]?.[difficulty] || wordLists.english.easy;
  return words[Math.floor(Math.random() * words.length)];
}

// Add punctuation to a word
function addPunctuation(word) {
  const punctuations = [",", ".", "!", "?", ";", ":"];
  const punctuation =
    punctuations[Math.floor(Math.random() * punctuations.length)];

  // Sometimes add at the end, sometimes at the beginning
  if (Math.random() < 0.5) {
    return word + punctuation;
  } else {
    return punctuation + word;
  }
}

// Get word count based on difficulty and mode
function getWordCount() {
  if (state.currentMode === "survival") {
    return 100; // More words for survival mode
  }

  const difficulty = elements.difficultySelect.value;
  switch (difficulty) {
    case "easy":
      return 60;
    case "medium":
      return 100;
    case "hard":
      return 150;
    default:
      return 100;
  }
}

// Update stats display
function updateStats() {
  // Calculate WPM (words per minute)
  let wpm = 0;
  if (state.isRunning && state.startTime) {
    const timeElapsed = (new Date() - state.startTime) / 1000 / 60; // in minutes
    if (timeElapsed > 0) {
      wpm = Math.round(state.correctWords / timeElapsed);
    }
  }
  elements.wpm.textContent = wpm || 0;

  // Calculate accuracy - ensure it doesn't exceed 100%
  let accuracy = 100;
  if (state.totalKeystrokes > 0) {
    const totalCorrectChars =
      state.correctWords * 5 + (state.currentCharIndex || 0);
    accuracy = Math.min(
      100,
      Math.round((totalCorrectChars / state.totalKeystrokes) * 100)
    );
  }
  elements.accuracy.textContent = `${accuracy}%`;

  // Update other stats
  elements.correctWords.textContent = state.correctWords || 0;
  elements.incorrectWords.textContent = state.incorrectWords || 0;
  elements.keystrokes.textContent = state.totalKeystrokes || 0;
}

// Update analysis content
function updateAnalysis(wpm, accuracy) {
  let analysisHTML = "";

  if (wpm < 20) {
    analysisHTML =
      "<p>You're just getting started! Regular practice will help you improve quickly.</p>";
  } else if (wpm < 40) {
    analysisHTML =
      "<p>Good progress! Focus on accuracy and consistent practice to reach the next level.</p>";
  } else if (wpm < 60) {
    analysisHTML =
      "<p>Great job! You're typing at an average speed. With more practice, you can reach advanced levels.</p>";
  } else if (wpm < 80) {
    analysisHTML =
      "<p>Excellent! You're typing faster than most people. Keep practicing to maintain and improve your speed.</p>";
  } else {
    analysisHTML =
      "<p>Outstanding! You're among the fastest typists. Continue practicing to stay sharp.</p>";
  }

  // Add accuracy feedback
  if (accuracy < 80) {
    analysisHTML +=
      "<p>Your accuracy needs improvement. Try slowing down slightly to increase precision.</p>";
  } else if (accuracy < 95) {
    analysisHTML +=
      "<p>Good accuracy! With a bit more practice, you can reach 95%+ accuracy.</p>";
  } else {
    analysisHTML +=
      "<p>Excellent accuracy! You're maintaining precision while typing quickly.</p>";
  }

  // Add error analysis if there were errors
  if (Object.keys(state.errors).length > 0) {
    analysisHTML += "<p>Common errors to practice:</p><ul>";
    for (const [error, count] of Object.entries(state.errors)) {
      analysisHTML += `<li>"${error}" (${count} times)</li>`;
    }
    analysisHTML += "</ul>";
  }

  elements.analysisContent.innerHTML = analysisHTML;

  // Update error breakdown
  updateErrorBreakdown();

  // Update charts
  updateCharts(wpm, accuracy);
}

// Update error breakdown
function updateErrorBreakdown() {
  if (Object.keys(state.errors).length === 0) {
    elements.errorBreakdown.innerHTML =
      "<p>No errors to display. Great job!</p>";
    return;
  }

  let errorHTML = "";
  for (const [error, count] of Object.entries(state.errors)) {
    const [correct, typed] = error.split("->");
    errorHTML += `
          <div class="error-item">
            <span class="error-correct">${correct}</span>
            <span>→</span>
            <span class="error-typed">${typed}</span>
            <span class="error-count">${count}x</span>
          </div>
        `;
  }
  elements.errorBreakdown.innerHTML = errorHTML;
}

// Update heatmap display
function updateHeatmapDisplay() {
  // This would be implemented to show which keys are used most/least
  // For now, we'll just log the heatmap data
  console.log("Heatmap data:", state.heatmap);
}

// Generate initial heatmap
function generateHeatmap() {
  // This would generate a visual heatmap of the keyboard
  // For now, we'll just create a placeholder
  elements.heatmapKeys.innerHTML =
    "<p>Heatmap will appear after you start typing</p>";
}

// Update charts
function updateCharts(wpm, accuracy) {
  // This would update the progress and accuracy charts
  // For now, we'll just create placeholder charts
  const progressCtx = document
    .getElementById("progress-chart")
    .getContext("2d");
  const accuracyCtx = document
    .getElementById("accuracy-chart")
    .getContext("2d");

  // Sample data for demonstration
  const progressChart = new Chart(progressCtx, {
    type: "line",
    data: {
      labels: ["1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "WPM",
          data: [32, 35, 38, 42, 45, 48, wpm],
          borderColor: "#4361ee",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  const accuracyChart = new Chart(accuracyCtx, {
    type: "bar",
    data: {
      labels: ["a", "e", "i", "o", "r", "t", "n", "s"],
      datasets: [
        {
          label: "Accuracy %",
          data: [95, 92, 98, 96, 94, 97, 99, 93],
          backgroundColor: "#4cc9f0",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// Check for new achievements
function checkAchievements(wpm, accuracy, timeElapsed) {
  const newAchievements = [];

  // Check for speed achievements
  if (wpm >= 30 && !hasAchievement("speed_30")) {
    newAchievements.push({
      id: "speed_30",
      name: "30 WPM",
      description: "Reach 30 words per minute",
      icon: "⚡",
    });
  }
  if (wpm >= 50 && !hasAchievement("speed_50")) {
    newAchievements.push({
      id: "speed_50",
      name: "50 WPM",
      description: "Reach 50 words per minute",
      icon: "🚀",
    });
  }
  if (wpm >= 80 && !hasAchievement("speed_80")) {
    newAchievements.push({
      id: "speed_80",
      name: "80 WPM",
      description: "Reach 80 words per minute",
      icon: "💨",
    });
  }
  if (wpm >= 100 && !hasAchievement("speed_100")) {
    newAchievements.push({
      id: "speed_100",
      name: "100 WPM",
      description: "Reach 100 words per minute",
      icon: "🔥",
    });
  }
  if (wpm >= 120 && !hasAchievement("speed_120")) {
    newAchievements.push({
      id: "speed_120",
      name: "120 WPM",
      description: "Reach 120 words per minute",
      icon: "⚡",
    });
  }

  // Check for accuracy achievements
  if (accuracy >= 95 && !hasAchievement("accuracy_95")) {
    newAchievements.push({
      id: "accuracy_95",
      name: "95% Accuracy",
      description: "Achieve 95% accuracy or higher",
      icon: "🎯",
    });
  }
  if (accuracy >= 98 && !hasAchievement("accuracy_98")) {
    newAchievements.push({
      id: "accuracy_98",
      name: "98% Accuracy",
      description: "Achieve 98% accuracy or higher",
      icon: "🏆",
    });
  }
  if (accuracy === 100 && !hasAchievement("perfection")) {
    newAchievements.push({
      id: "perfection",
      name: "Perfection",
      description: "Complete a test with 100% accuracy",
      icon: "💯",
    });
  }

  // Check for consistency achievements
  if (timeElapsed >= 300 && !hasAchievement("marathon")) {
    newAchievements.push({
      id: "marathon",
      name: "Marathon",
      description: "Complete a 5-minute typing test",
      icon: "🕐",
    });
  }

  // Check time-based achievements
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 6 && !hasAchievement("early_bird")) {
    newAchievements.push({
      id: "early_bird",
      name: "Early Bird",
      description: "Complete a test before 6 AM",
      icon: "🐦",
    });
  }
  if (currentHour >= 0 && currentHour < 6 && !hasAchievement("night_owl")) {
    newAchievements.push({
      id: "night_owl",
      name: "Night Owl",
      description: "Complete a test after midnight",
      icon: "🦉",
    });
  }

  // Add new achievements to state
  newAchievements.forEach((achievement) => {
    state.achievements.push(achievement);
  });

  // Display new achievements in results modal
  if (newAchievements.length > 0) {
    let achievementsHTML = "<h3>New Achievements Unlocked!</h3>";
    newAchievements.forEach((achievement) => {
      achievementsHTML += `
            <div class="achievement">
              <div class="achievement-icon">🏆</div>
              <div class="achievement-name">${achievement.name}</div>
              <div class="achievement-desc">${achievement.description}</div>
            </div>
          `;
    });
    achievementsHTML += "<br>"; // Add <br> tag after achievements
    elements.resultsAchievements.innerHTML = achievementsHTML;

    // Show confetti for achievements
    showConfetti();
  } else {
    elements.resultsAchievements.innerHTML = "";
  }

  // Update achievements display
  loadAchievements();
}

// Check if user has a specific achievement
function hasAchievement(achievementId) {
  return state.achievements.some((a) => a.id === achievementId);
}

// Show confetti animation
function showConfetti() {
  // This would trigger a confetti animation
  // For now, we'll just log it
  console.log("🎉 Confetti! Achievement unlocked!");
}

// Share results
function shareResults() {
  const wpm = elements.resultWpm.textContent;
  const accuracy = elements.resultAccuracy.textContent;

  if (navigator.share) {
    navigator.share({
      title: "My TypeMaster Results",
      text: `I just typed at ${wpm} WPM with ${accuracy} accuracy on TypeMaster!`,
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    const text = `I just typed at ${wpm} WPM with ${accuracy} accuracy on TypeMaster! ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      showNotification("Results copied to clipboard!");
    });
  }
}

// Retry test
function retryTest() {
  hideModal(elements.resultsModal);
  elements.typingInput.disabled = false;
  resetTest();
  startTest();
}

// Show modal
function showModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Hide modal
function hideModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Check if any modal is open
function isModalOpen() {
  return document.querySelector(".modal-overlay.active") !== null;
}

// Show notification
function showNotification(message) {
  elements.notificationMessage.textContent = message;
  showModal(elements.notificationModal);
}

// Show tutorial
function showTutorial() {
  // Only show tutorial for first-time users
  if (!localStorage.getItem("tutorialShown")) {
    showModal(elements.tutorialModal);
    localStorage.setItem("tutorialShown", "true");
  }
}

// Change theme
function changeTheme(theme) {
  document.body.className = ""; // Remove all theme classes
  if (theme !== "light") {
    document.body.classList.add(`${theme}-theme`);
  }
  state.currentTheme = theme;

  // Update active theme option
  elements.themeOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.theme === theme);
  });

  saveUserPreferences();
}

// Change font
function changeFont(font) {
  document.body.style.fontFamily = "";
  if (font === "monospace") {
    document.body.style.fontFamily = "Monaco, 'Courier New', monospace";
  } else if (font === "serif") {
    document.body.style.fontFamily = "Georgia, serif";
  } else if (font === "sans-serif") {
    document.body.style.fontFamily = "Arial, sans-serif";
  } else if (font === "courier") {
    document.body.style.fontFamily = "'Courier New', monospace";
  } else if (font === "georgia") {
    document.body.style.fontFamily = "Georgia, serif";
  } else if (font === "arial") {
    document.body.style.fontFamily = "Arial, sans-serif";
  } else if (font === "times") {
    document.body.style.fontFamily = "'Times New Roman', serif";
  }
  state.currentFont = font;

  // Update active font option
  elements.fontOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.font === font);
  });

  saveUserPreferences();
}

// Load user preferences
function loadUserPreferences() {
  const preferences = JSON.parse(
    localStorage.getItem("typemasterPreferences") || "{}"
  );

  if (preferences.theme) {
    changeTheme(preferences.theme);
  }

  if (preferences.font) {
    changeFont(preferences.font);
  }

  if (preferences.soundType) {
    state.soundType = preferences.soundType;
    elements.soundSelect.value = state.soundType;
    state.soundEnabled = state.soundType !== "none";
  }
}

// Save user preferences
function saveUserPreferences() {
  const preferences = {
    theme: state.currentTheme,
    font: state.currentFont,
    soundType: state.soundType,
  };
  localStorage.setItem("typemasterPreferences", JSON.stringify(preferences));
}

// Switch auth tab
function switchAuthTab(tab) {
  elements.formTabs.forEach((t) => {
    t.classList.toggle("active", t.dataset.tab === tab);
  });

  if (tab === "login") {
    elements.loginForm.style.display = "block";
    elements.signupForm.style.display = "none";
  } else {
    elements.loginForm.style.display = "none";
    elements.signupForm.style.display = "block";
  }
}

// Check auth state
function checkAuthState() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      state.user = user;
      updateUserDisplay();
      loadUserData();
    } else {
      state.user = null;
      state.userData = null;
      updateUserDisplay();
    }
  });
}

// Update user display
function updateUserDisplay() {
  if (state.user) {
    elements.loginBtn.style.display = "none";
    elements.logoutBtn.style.display = "block";
    elements.userNameDisplay.textContent =
      state.user.displayName || state.user.email;

    // Display profile picture if available
    if (state.user.photoURL) {
      elements.userAvatar.innerHTML = `<img src="${state.user.photoURL}" alt="Profile" />`;
    } else {
      elements.userAvatar.textContent = (
        state.user.displayName || state.user.email
      )
        .charAt(0)
        .toUpperCase();
    }

    elements.profileContainer.style.display = "flex";
    updateProfileDisplay();
  } else {
    elements.loginBtn.style.display = "block";
    elements.logoutBtn.style.display = "none";
    elements.userNameDisplay.textContent = "Guest";
    elements.userAvatar.textContent = "?";
    elements.profileContainer.style.display = "none";
  }
}

// Update profile display
function updateProfileDisplay() {
  if (!state.userData) return;

  // Display profile picture if available
  if (state.user && state.user.photoURL) {
    elements.profileAvatar.innerHTML = `<img src="${state.user.photoURL}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />`;
  } else {
    elements.profileAvatar.textContent = (
      state.user.displayName || state.user.email
    )
      .charAt(0)
      .toUpperCase();
  }

  // Calculate profile stats
  const totalTests = state.userData.testHistory?.length || 0;
  const avgWpm =
    totalTests > 0
      ? Math.round(
          state.userData.testHistory.reduce((sum, test) => sum + test.wpm, 0) /
            totalTests
        )
      : 0;
  const bestWpm =
    totalTests > 0
      ? Math.max(...state.userData.testHistory.map((test) => test.wpm))
      : 0;
  const totalWords =
    totalTests > 0
      ? state.userData.testHistory.reduce(
          (sum, test) => sum + test.correctWords + test.incorrectWords,
          0
        )
      : 0;

  elements.profileStats.innerHTML = `
        <div class="profile-stat">
          <div class="profile-stat-value">${totalTests}</div>
          <div class="profile-stat-label">Tests Taken</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-value">${avgWpm}</div>
          <div class="profile-stat-label">Avg WPM</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-value">${bestWpm}</div>
          <div class="profile-stat-label">Best WPM</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-value">${totalWords}</div>
          <div class="profile-stat-label">Words Typed</div>
        </div>
      `;
}

// Show auth modal
function showAuthModal() {
  showModal(elements.authModal);
}

// Handle login
function handleLogin() {
  const email = elements.loginEmail.value;
  const password = elements.loginPassword.value;

  if (!email || !password) {
    elements.authError.textContent = "Please enter both email and password";
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      hideModal(elements.authModal);
      elements.authError.textContent = "";
    })
    .catch((error) => {
      elements.authError.textContent = error.message;
    });
}

// Handle signup
function handleSignup() {
  const email = elements.signupEmail.value;
  const username = elements.signupUsername.value;
  const password = elements.signupPassword.value;

  if (!email || !username || !password) {
    elements.authError.textContent = "Please fill in all fields";
    return;
  }

  if (!isPasswordValid(password)) {
    elements.authError.textContent = "Please meet all password requirements";
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update profile with username
      return userCredential.user.updateProfile({
        displayName: username,
      });
    })
    .then(() => {
      hideModal(elements.authModal);
      elements.authError.textContent = "";
    })
    .catch((error) => {
      elements.authError.textContent = error.message;
    });
}

// Handle Google login/signup
function handleGoogleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      // Fetch and display profile picture
      if (user.photoURL) {
        elements.userAvatar.innerHTML = `<img src="${user.photoURL}" alt="Profile" />`;
      }
      hideModal(elements.authModal);
      elements.authError.textContent = "";
    })
    .catch((error) => {
      elements.authError.textContent = error.message;
    });
}

function handleGoogleSignup() {
  // Same as login for Google
  handleGoogleLogin();
}

// Handle logout
function handleLogout() {
  auth.signOut();
}

// Validate password
function validatePassword() {
  const password = elements.signupPassword.value;

  // Check length
  const lengthValid = password.length >= 8;
  document.getElementById("req-length").className = lengthValid
    ? "requirement-met"
    : "requirement-not-met";

  // Check uppercase
  const uppercaseValid = /[A-Z]/.test(password);
  document.getElementById("req-uppercase").className = uppercaseValid
    ? "requirement-met"
    : "requirement-not-met";

  // Check lowercase
  const lowercaseValid = /[a-z]/.test(password);
  document.getElementById("req-lowercase").className = lowercaseValid
    ? "requirement-met"
    : "requirement-not-met";

  // Check number
  const numberValid = /[0-9]/.test(password);
  document.getElementById("req-number").className = numberValid
    ? "requirement-met"
    : "requirement-not-met";
}

// Check if password is valid
function isPasswordValid(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

// Load user data from Firestore
function loadUserData() {
  if (!state.user) return;

  db.collection("users")
    .doc(state.user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        state.userData = doc.data();
        state.testHistory = state.userData.testHistory || [];
        state.achievements = state.userData.achievements || [];

        // Load curriculum progress from Firestore
        if (state.userData.curriculumProgress) {
          localStorage.setItem(
            "curriculumProgress",
            JSON.stringify(state.userData.curriculumProgress)
          );
          loadCurriculum(); // Reload curriculum with saved progress
        }
      } else {
        // Create new user document
        state.userData = {
          username: state.user.displayName,
          email: state.user.email,
          joined: new Date(),
          testHistory: [],
          achievements: [],
          curriculumProgress: {},
        };
        db.collection("users").doc(state.user.uid).set(state.userData);
      }
      updateProfileDisplay();
      loadAchievements();
    })
    .catch((error) => {
      console.error("Error loading user data:", error);
    });
}

// Save test result to Firestore
function saveTestResult(testResult) {
  if (!state.user) return;

  // Add to local history
  state.testHistory.push(testResult);

  // Update user data
  state.userData.testHistory = state.testHistory;

  // Save to Firestore
  db.collection("users")
    .doc(state.user.uid)
    .update({
      testHistory: firebase.firestore.FieldValue.arrayUnion(testResult),
      achievements: state.achievements, // Save achievements to database
    })
    .catch((error) => {
      console.error("Error saving test result:", error);
    });

  // Update leaderboard if this is a top score
  if (testResult.wpm > 0 && testResult.accuracy >= 90) {
    db.collection("leaderboard")
      .doc(state.user.uid)
      .set(
        {
          username: state.user.displayName || state.user.email,
          wpm: testResult.wpm,
          accuracy: testResult.accuracy,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then(() => {
        // Reload leaderboard
        loadLeaderboard();
      })
      .catch((error) => {
        console.error("Error updating leaderboard:", error);
      });
  }
}

// Load achievements
function loadAchievements() {
  // Define all possible achievements
  const allAchievements = [
    {
      id: "first_test",
      name: "First Test",
      description: "Complete your first typing test",
      icon: "🎯",
    },
    {
      id: "speed_30",
      name: "30 WPM",
      description: "Reach 30 words per minute",
      icon: "⚡",
    },
    {
      id: "speed_50",
      name: "50 WPM",
      description: "Reach 50 words per minute",
      icon: "🚀",
    },
    {
      id: "speed_80",
      name: "80 WPM",
      description: "Reach 80 words per minute",
      icon: "💨",
    },
    {
      id: "speed_100",
      name: "100 WPM",
      description: "Reach 100 words per minute",
      icon: "🔥",
    },
    {
      id: "speed_120",
      name: "120 WPM",
      description: "Reach 120 words per minute",
      icon: "⚡",
    },
    {
      id: "accuracy_95",
      name: "95% Accuracy",
      description: "Achieve 95% accuracy or higher",
      icon: "🎯",
    },
    {
      id: "accuracy_98",
      name: "98% Accuracy",
      description: "Achieve 98% accuracy or higher",
      icon: "🏆",
    },
    {
      id: "marathon",
      name: "Marathon",
      description: "Complete a 5-minute typing test",
      icon: "🕐",
    },
    {
      id: "consistency",
      name: "Consistency",
      description: "Complete 10 typing tests",
      icon: "📊",
    },
    {
      id: "dedication",
      name: "Dedication",
      description: "Complete 50 typing tests",
      icon: "💪",
    },
    {
      id: "perfection",
      name: "Perfection",
      description: "Complete a test with 100% accuracy",
      icon: "💯",
    },
    {
      id: "night_owl",
      name: "Night Owl",
      description: "Complete a test after midnight",
      icon: "🦉",
    },
    {
      id: "early_bird",
      name: "Early Bird",
      description: "Complete a test before 6 AM",
      icon: "🐦",
    },
    {
      id: "speed_demon",
      name: "Speed Demon",
      description: "Type 1000 words in a single session",
      icon: "👹",
    },
    {
      id: "wordsmith",
      name: "Wordsmith",
      description: "Type 10,000 words total",
      icon: "✍️",
    },
  ];

  let achievementsHTML = "<h3>Achievements</h3>";

  allAchievements.forEach((achievement) => {
    const hasAchieved = hasAchievement(achievement.id);
    achievementsHTML += `
          <div class="achievement ${hasAchieved ? "" : "locked"}">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
          </div>
        `;
  });

  elements.achievementsContainer.innerHTML = achievementsHTML;
}

// Load leaderboard
function loadLeaderboard() {
  // Fetch real leaderboard data from Firestore
  db.collection("leaderboard")
    .orderBy("wpm", "desc")
    .limit(20)
    .get()
    .then((querySnapshot) => {
      const leaderboardData = [];
      querySnapshot.forEach((doc) => {
        leaderboardData.push(doc.data());
      });

      // If no data, use sample data
      if (leaderboardData.length === 0) {
        leaderboardData.push(
          { username: "TypingPro", wpm: 128, accuracy: 99 },
          { username: "SpeedDemon", wpm: 115, accuracy: 98 },
          { username: "KeyboardWizard", wpm: 108, accuracy: 99 },
          { username: "FastFingers", wpm: 102, accuracy: 97 },
          { username: "AverageTyper", wpm: 65, accuracy: 94 },
          { username: "LearningFast", wpm: 52, accuracy: 92 },
          { username: "NewComer", wpm: 38, accuracy: 89 }
        );
      }

      let leaderboardHTML = "";

      leaderboardData.forEach((user, index) => {
        const isCurrentUser =
          state.user && user.username === state.user.displayName;
        leaderboardHTML += `
          <div class="leaderboard-item ${isCurrentUser ? "current-user" : ""}">
            <span class="leaderboard-rank">${index + 1}</span>
            <span class="leaderboard-username">${user.username}</span>
            <span class="leaderboard-wpm">${user.wpm} WPM</span>
            <span class="leaderboard-accuracy">${user.accuracy}%</span>
          </div>
        `;
      });

      elements.leaderboardContent.innerHTML = leaderboardHTML;
    })
    .catch((error) => {
      console.error("Error loading leaderboard:", error);
      // Fallback to sample data
      const sampleLeaderboard = [
        { username: "TypingPro", wpm: 128, accuracy: 99 },
        { username: "SpeedDemon", wpm: 115, accuracy: 98 },
        { username: "KeyboardWizard", wpm: 108, accuracy: 99 },
      ];

      let leaderboardHTML = "";
      sampleLeaderboard.forEach((user, index) => {
        leaderboardHTML += `
          <div class="leaderboard-item">
            <span class="leaderboard-rank">${index + 1}</span>
            <span class="leaderboard-username">${user.username}</span>
            <span class="leaderboard-wpm">${user.wpm} WPM</span>
            <span class="leaderboard-accuracy">${user.accuracy}%</span>
          </div>
        `;
      });
      elements.leaderboardContent.innerHTML = leaderboardHTML;
    });
}

// Load curriculum
function loadCurriculum() {
  // Define curriculum levels structure
  const curriculumStructure = [
    {
      id: "beginner",
      name: "Beginner",
      description: "Learn the basics of touch typing",
      lessons: [
        { id: "home_row", name: "Home Row" },
        { id: "top_row", name: "Top Row" },
        { id: "bottom_row", name: "Bottom Row" },
        { id: "shift_keys", name: "Shift Keys" },
        { id: "simple_words", name: "Simple Words" },
      ],
    },
    {
      id: "intermediate",
      name: "Intermediate",
      description: "Improve your speed and accuracy",
      lessons: [
        { id: "common_words", name: "Common Words" },
        { id: "punctuation", name: "Punctuation" },
        { id: "numbers", name: "Numbers" },
        { id: "short_sentences", name: "Short Sentences" },
        { id: "longer_texts", name: "Longer Texts" },
      ],
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Master advanced typing techniques",
      lessons: [
        { id: "complex_sentences", name: "Complex Sentences" },
        { id: "technical_terms", name: "Technical Terms" },
        { id: "speed_challenges", name: "Speed Challenges" },
        { id: "accuracy_challenges", name: "Accuracy Challenges" },
        { id: "endurance_tests", name: "Endurance Tests" },
      ],
    },
  ];

  // Load progress from localStorage or use default
  let savedProgress = localStorage.getItem("curriculumProgress");
  let completedLessons = savedProgress ? JSON.parse(savedProgress) : {};

  // Build curriculum with progress
  const curriculum = curriculumStructure.map((level) => {
    const lessons = level.lessons.map((lesson, index) => {
      const lessonKey = `${level.id}_${lesson.id}`;
      const completed = completedLessons[lessonKey] || false;

      // First lesson is always unlocked, others unlock when previous is completed
      const previousLessonKey =
        index > 0 ? `${level.id}_${level.lessons[index - 1].id}` : null;
      const locked = index > 0 && !completedLessons[previousLessonKey];

      return {
        ...lesson,
        completed,
        locked,
      };
    });

    // Calculate progress percentage
    const completedCount = lessons.filter((l) => l.completed).length;
    const progress = Math.round((completedCount / lessons.length) * 100);

    return {
      ...level,
      lessons,
      progress,
    };
  });

  state.curriculum = curriculum;

  let curriculumHTML = "";

  curriculum.forEach((level) => {
    let lessonsHTML = "";
    level.lessons.forEach((lesson) => {
      const statusIcon = lesson.completed ? "✓" : lesson.locked ? "🔒" : "";
      lessonsHTML += `
            <div class="lesson ${lesson.completed ? "completed" : ""} ${
        lesson.locked ? "locked" : ""
      }" 
                 data-level="${level.id}" data-lesson="${lesson.id}">
              <span class="lesson-name">${lesson.name}</span>
              <span class="lesson-status">${statusIcon}</span>
            </div>
          `;
    });

    curriculumHTML += `
          <div class="curriculum-level">
            <div class="level-header">
              <h4>${level.name}</h4>
              <span>${level.progress}%</span>
            </div>
            <p>${level.description}</p>
            <div class="level-progress">
              <div class="level-progress-bar" style="width: ${level.progress}%"></div>
            </div>
            <div class="level-lessons">
              ${lessonsHTML}
            </div>
          </div>
        `;
  });

  elements.curriculumLevels.innerHTML = curriculumHTML;

  // Add event listeners to lessons
  document.querySelectorAll(".lesson").forEach((lesson) => {
    lesson.addEventListener("click", () => {
      if (!lesson.classList.contains("locked")) {
        startCurriculumLesson(lesson.dataset.level, lesson.dataset.lesson);
      }
    });
  });
}

// Start curriculum lesson
function startCurriculumLesson(levelId, lessonId) {
  if (!levelId || !lessonId) {
    // If no lesson specified, find the first incomplete lesson
    const firstIncomplete = findFirstIncompleteLesson();
    if (firstIncomplete) {
      levelId = firstIncomplete.levelId;
      lessonId = firstIncomplete.lessonId;
    } else {
      // All lessons completed, start first lesson
      levelId = state.curriculum[0].id;
      lessonId = state.curriculum[0].lessons[0].id;
    }
  }

  // Set the current lesson
  state.currentLesson = { levelId, lessonId };

  // Generate appropriate text for the lesson
  switch (lessonId) {
    case "home_row":
      generateHomeRowText();
      break;
    case "top_row":
      generateTopRowText();
      break;
    case "bottom_row":
      generateBottomRowText();
      break;
    case "shift_keys":
      generateShiftKeysText();
      break;
    case "simple_words":
      generateSimpleWordsText();
      break;
    case "common_words":
      generateCommonWordsText();
      break;
    case "punctuation":
      generatePunctuationText();
      break;
    case "numbers":
      generateNumbersLessonText();
      break;
    case "short_sentences":
      generateShortSentencesText();
      break;
    case "longer_texts":
      generateLongerTextsText();
      break;
    case "complex_sentences":
      generateComplexSentencesText();
      break;
    case "technical_terms":
      generateTechnicalTermsText();
      break;
    case "speed_challenges":
      generateSpeedChallengeText();
      break;
    case "accuracy_challenges":
      generateAccuracyChallengeText();
      break;
    case "endurance_tests":
      generateEnduranceTestText();
      break;
    default:
      generateWords();
  }

  // Start the test
  startTest();
}

// Find first incomplete lesson
function findFirstIncompleteLesson() {
  for (const level of state.curriculum) {
    for (const lesson of level.lessons) {
      if (!lesson.completed && !lesson.locked) {
        return { levelId: level.id, lessonId: lesson.id };
      }
    }
  }
  return null;
}

// Complete curriculum lesson
function completeCurriculumLesson(wpm, accuracy) {
  if (!state.currentLesson) return;

  const { levelId, lessonId } = state.currentLesson;
  const lessonKey = `${levelId}_${lessonId}`;

  // Load current progress
  let savedProgress = localStorage.getItem("curriculumProgress");
  let completedLessons = savedProgress ? JSON.parse(savedProgress) : {};

  // Mark lesson as completed if performance is good enough
  // Require at least 80% accuracy to pass
  if (accuracy >= 80) {
    completedLessons[lessonKey] = true;
    localStorage.setItem(
      "curriculumProgress",
      JSON.stringify(completedLessons)
    );

    // Reload curriculum to update UI
    loadCurriculum();

    // Show success notification
    showNotification(
      `✓ Lesson completed! ${wpm} WPM with ${accuracy}% accuracy`
    );

    // Save to Firestore if user is logged in
    if (state.user) {
      db.collection("users")
        .doc(state.user.uid)
        .update({
          curriculumProgress: completedLessons,
        })
        .catch((error) => {
          console.error("Error saving curriculum progress:", error);
        });
    }
  } else {
    showNotification(
      `Need at least 80% accuracy to complete this lesson. Try again!`
    );
  }
}

// Generate home row practice text
function generateHomeRowText() {
  const homeRowWords = [
    "asdf",
    "jkl;",
    "fdsa",
    ";lkj",
    "as jk",
    "fd l;",
    "sad lad",
    "fall lass",
    "add all",
    "dad had",
  ];
  state.words = homeRowWords;

  // Clear words container and add the words
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });

  // Highlight first word
  updateWordHighlighting();
}

// Generate top row practice text
function generateTopRowText() {
  const topRowWords = [
    "qwer",
    "uiop",
    "rewq",
    "poiu",
    "we qp",
    "er ui",
    "quiet wire",
    "upper power",
    "quite rope",
    "were poor",
  ];
  state.words = topRowWords;

  // Clear words container and add the words
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });

  // Highlight first word
  updateWordHighlighting();
}

// Generate bottom row practice text
function generateBottomRowText() {
  const bottomRowWords = [
    "zxcv",
    "nm,.",
    "vcxz",
    ".,mn",
    "xc zn",
    "cv m,",
    "zoom next",
    "vocal comic",
    "zone move",
    "come zone",
  ];
  state.words = bottomRowWords;

  // Clear words container and add the words
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });

  // Highlight first word
  updateWordHighlighting();
}

// Generate shift keys practice text
function generateShiftKeysText() {
  const shiftKeysWords = [
    "The",
    "Quick",
    "Brown",
    "Fox",
    "Jumps",
    "Over",
    "Lazy",
    "Dog",
    "Hello World",
    "Good Morning",
  ];
  state.words = shiftKeysWords;

  // Clear words container and add the words
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });

  // Highlight first word
  updateWordHighlighting();
}

// Generate simple words practice text
function generateSimpleWordsText() {
  const simpleWords = [
    "cat",
    "dog",
    "run",
    "jump",
    "play",
    "fun",
    "sun",
    "moon",
    "star",
    "tree",
    "house",
    "car",
    "book",
    "pen",
    "desk",
  ];
  state.words = simpleWords;

  // Clear words container and add the words
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });

  // Highlight first word
  updateWordHighlighting();
}

// Generate common words practice text
function generateCommonWordsText() {
  const commonWords = [
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "I",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
  ];
  state.words = commonWords;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate punctuation practice text
function generatePunctuationText() {
  const punctuationWords = [
    "Hello!",
    "How are you?",
    "I'm fine.",
    "Really?",
    "Yes, indeed.",
    "Wait...",
    "Stop!",
    "Don't go.",
    "Can you?",
    "Sure, why not?",
    "It's great!",
    "Wow!",
    "Amazing.",
    "Oh, no!",
    "Let's go.",
  ];
  state.words = punctuationWords;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate numbers lesson text
function generateNumbersLessonText() {
  const numbersWords = [
    "123",
    "456",
    "789",
    "012",
    "345",
    "678",
    "901",
    "234",
    "567",
    "890",
    "1234",
    "5678",
    "9012",
    "3456",
    "7890",
  ];
  state.words = numbersWords;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate short sentences text
function generateShortSentencesText() {
  const sentences = [
    "The cat sat.",
    "Dogs can run.",
    "Birds fly high.",
    "Fish swim fast.",
    "I like coding.",
    "She reads books.",
    "He plays games.",
    "We learn daily.",
    "They work hard.",
    "Time flies quickly.",
  ];
  state.words = sentences;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate longer texts
function generateLongerTextsText() {
  const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect when learning to type.",
    "Typing speed improves with consistent practice.",
    "Focus on accuracy before increasing speed.",
    "Good posture helps prevent typing fatigue.",
  ];
  state.words = texts;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate complex sentences text
function generateComplexSentencesText() {
  const sentences = [
    "Although it was raining heavily, they decided to continue their journey.",
    "The conference, which was scheduled for next week, has been postponed.",
    "Programming requires logical thinking, problem-solving skills, and patience.",
    "Despite numerous challenges, the team successfully completed the project.",
    "Technology continues to evolve at an unprecedented rate in modern society.",
  ];
  state.words = sentences;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate technical terms text
function generateTechnicalTermsText() {
  const terms = [
    "algorithm",
    "database",
    "function",
    "variable",
    "parameter",
    "interface",
    "implementation",
    "inheritance",
    "polymorphism",
    "encapsulation",
    "asynchronous",
    "synchronous",
    "authentication",
    "authorization",
    "deployment",
  ];
  state.words = terms;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate speed challenge text
function generateSpeedChallengeText() {
  const words = [];
  const speedWords = [
    "fast",
    "quick",
    "rapid",
    "swift",
    "speedy",
    "hasty",
    "brisk",
    "fleet",
  ];
  for (let i = 0; i < 30; i++) {
    words.push(speedWords[Math.floor(Math.random() * speedWords.length)]);
  }
  state.words = words;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate accuracy challenge text
function generateAccuracyChallengeText() {
  const words = [
    "accommodate",
    "bureaucracy",
    "conscientious",
    "embarrass",
    "fluorescent",
    "guarantee",
    "harass",
    "independent",
    "jewelry",
    "liaison",
    "maintenance",
    "necessary",
    "occurrence",
    "privilege",
    "questionnaire",
  ];
  state.words = words;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate endurance test text
function generateEnduranceTestText() {
  const words = [];
  const enduranceWords = [
    "continue",
    "persist",
    "endure",
    "maintain",
    "sustain",
    "persevere",
    "practice",
    "improve",
    "develop",
    "enhance",
    "strengthen",
    "build",
  ];
  for (let i = 0; i < 50; i++) {
    words.push(
      enduranceWords[Math.floor(Math.random() * enduranceWords.length)]
    );
  }
  state.words = words;
  elements.wordsContainer.innerHTML = "";
  state.words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    elements.wordsContainer.appendChild(wordElement);
  });
  updateWordHighlighting();
}

// Generate AI suggestions
function generateAISuggestions() {
  // In a real app, this would analyze user performance and generate personalized suggestions
  const suggestions = [
    { text: "Practice with numbers and symbols", action: "numbers" },
    { text: "Focus on accuracy over speed", action: "accuracy" },
    { text: "Try the prediction challenge", action: "prediction" },
    { text: "Work on difficult words", action: "difficult-words" },
  ];

  let suggestionsHTML = "";
  suggestions.forEach((suggestion) => {
    suggestionsHTML += `
          <div class="ai-suggestion" data-action="${suggestion.action}">
            ${suggestion.text}
          </div>
        `;
  });

  elements.aiSuggestions.innerHTML = suggestionsHTML;

  // Add event listeners to suggestions
  document.querySelectorAll(".ai-suggestion").forEach((suggestion) => {
    suggestion.addEventListener("click", () => {
      const action = suggestion.dataset.action;
      handleAISuggestion(action);
    });
  });
}

// Handle AI suggestion
function handleAISuggestion(action) {
  switch (action) {
    case "numbers":
      switchMode("numbers");
      break;
    case "accuracy":
      elements.practiceFocus.value = "accuracy";
      switchMode("practice");
      break;
    case "prediction":
      switchMode("prediction");
      break;
    case "difficult-words":
      elements.practiceFocus.value = "difficult-words";
      switchMode("practice");
      break;
  }

  startTest();
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
