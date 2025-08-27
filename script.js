document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const themeToggle = document.getElementById("theme-toggle");
  const timeSelect = document.getElementById("time-select");
  const difficultySelect = document.getElementById("difficulty-select");
  const toggleCaps = document.getElementById("toggle-caps");
  const togglePunctuation = document.getElementById("toggle-punctuation");
  const textDisplay = document.getElementById("text-display");
  const typingInput = document.getElementById("typing-input");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const wpmElement = document.getElementById("wpm");
  const accuracyElement = document.getElementById("accuracy");
  const timerElement = document.getElementById("timer");
  const charactersElement = document.getElementById("characters");
  const analysisElement = document.getElementById("analysis");

  // Audio context for keypress sound
  let audioContext;
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    console.log("Web Audio API is not supported in this browser");
  }

  // App state
  let state = {
    theme: "light",
    timeLimit: 60,
    difficulty: "medium",
    capitalization: false,
    punctuation: false,
    isRunning: false,
    timer: null,
    startTime: null,
    words: [],
    currentWordIndex: 0,
    correctChars: 0,
    totalChars: 0,
    correctWords: 0,
    totalWords: 0,
    keystrokes: 0,
  };

  // Load saved preferences
  loadPreferences();

  // Initialize the app
  init();

  // Event listeners
  themeToggle.addEventListener("click", toggleTheme);
  timeSelect.addEventListener("change", function () {
    state.timeLimit = parseInt(this.value);
    savePreferences();
    if (!state.isRunning) {
      updateTimerDisplay();
    }
  });
  difficultySelect.addEventListener("change", function () {
    state.difficulty = this.value;
    savePreferences();
    if (!state.isRunning) {
      generateWords();
      renderWords();
    }
  });
  toggleCaps.addEventListener("click", function () {
    state.capitalization = !state.capitalization;
    this.classList.toggle("active", state.capitalization);
    savePreferences();
    if (!state.isRunning) {
      generateWords();
      renderWords();
    }
  });
  togglePunctuation.addEventListener("click", function () {
    state.punctuation = !state.punctuation;
    this.classList.toggle("active", state.punctuation);
    savePreferences();
    if (!state.isRunning) {
      generateWords();
      renderWords();
    }
  });

  typingInput.addEventListener("input", handleInput);
  typingInput.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      resetTest();
    }

    if (!state.isRunning && e.key !== "Tab") {
      startTest();
    }

    // Play keypress sound
    playKeySound();
  });

  startBtn.addEventListener("click", function () {
    if (state.isRunning) {
      stopTest();
      this.innerHTML = '<i class="fas fa-play"></i> Start Test';
    } else {
      startTest();
      this.innerHTML = '<i class="fas fa-pause"></i> Pause Test';
    }
  });

  resetBtn.addEventListener("click", resetTest);

  // Functions
  function init() {
    // Set UI based on saved preferences
    document.body.className = state.theme + "-mode";
    themeToggle.innerHTML =
      state.theme === "light"
        ? '<i class="fas fa-moon"></i> Dark Mode'
        : '<i class="fas fa-sun"></i> Light Mode';

    timeSelect.value = state.timeLimit;
    difficultySelect.value = state.difficulty;
    toggleCaps.classList.toggle("active", state.capitalization);
    togglePunctuation.classList.toggle("active", state.punctuation);

    updateTimerDisplay();
    generateWords();
    renderWords();
  }

  function loadPreferences() {
    const savedPreferences = localStorage.getItem("typingTestPreferences");
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      state.theme = preferences.theme || "light";
      state.timeLimit = preferences.timeLimit || 60;
      state.difficulty = preferences.difficulty || "medium";
      state.capitalization = preferences.capitalization || false;
      state.punctuation = preferences.punctuation || false;
    }
  }

  function savePreferences() {
    localStorage.setItem(
      "typingTestPreferences",
      JSON.stringify({
        theme: state.theme,
        timeLimit: state.timeLimit,
        difficulty: state.difficulty,
        capitalization: state.capitalization,
        punctuation: state.punctuation,
      })
    );
  }

  function toggleTheme() {
    state.theme = state.theme === "light" ? "dark" : "light";
    document.body.className = state.theme + "-mode";
    themeToggle.innerHTML =
      state.theme === "light"
        ? '<i class="fas fa-moon"></i> Dark Mode'
        : '<i class="fas fa-sun"></i> Light Mode';
    savePreferences();
  }

  function generateWords() {
    // Word lists by difficulty
    const easyWords = [
      "the",
      "and",
      "for",
      "are",
      "but",
      "not",
      "you",
      "all",
      "can",
      "any",
      "had",
      "her",
      "was",
      "one",
      "our",
      "out",
      "day",
      "get",
      "has",
      "him",
      "his",
      "how",
      "man",
      "new",
      "now",
      "old",
      "see",
      "two",
      "way",
      "who",
      "boy",
      "did",
      "its",
      "let",
      "put",
      "say",
      "she",
      "too",
      "use",
      "dad",
      "mom",
      "yes",
      "no",
      "dog",
      "cat",
      "big",
      "small",
      "red",
      "blue",
      "green",
      "run",
      "walk",
      "sit",
      "stand",
      "eat",
      "sleep",
      "play",
      "jump",
      "go",
      "stop",
      "up",
      "down",
      "in",
      "out",
      "on",
      "off",
      "good",
      "bad",
      "happy",
      "sad",
      "hot",
      "cold",
      "fun",
      "sun",
      "moon",
      "star",
      "car",
      "bus",
      "box",
      "cup",
      "pen",
      "book",
      "ball",
      "fish",
      "bird",
      "tree",
      "milk",
      "egg",
      "toy",
      "bed",
      "bag",
      "top",
      "hat",
      "map",
      "key",
      "cup",
      "fork",
      "plate",
      "shoe",
      "hand",
      "leg",
      "arm",
      "eye",
      "ear",
      "nose",
      "lip",
      "face",
      "head",
      "rain",
      "snow",
      "wind",
      "fire",
      "ice",
      "food",
      "water",
      "rice",
      "tea",
      "cake",
      "love",
      "kind",
      "nice",
      "fast",
      "slow",
      "short",
      "long",
      "light",
      "dark",
      "time",
      "home",
      "door",
      "wall",
      "room",
      "town",
      "road",
      "park",
      "ship",
      "boat",
      "bike",
      "farm",
      "cow",
      "pig",
      "hen",
      "duck",
      "bee",
      "ant",
      "web",
      "net",
      "king",
      "queen",
      "ring",
      "kid",
      "girl",
      "baby",
      "play",
      "jump",
      "swim",
      "clap",
      "sing",
      "walk",
      "talk",
      "read",
      "write",
      "draw",
      "paint",
      "smile",
      "laugh",
      "cry",
      "warm",
      "cold",
      "clean",
      "dirty",
      "full",
      "empty",
      "high",
      "low",
      "left",
      "right",
      "open",
      "close",
      "begin",
      "end",
      "first",
      "last",
      "near",
      "far",
      "big",
      "small",
      "fast",
      "slow",
      "yes",
      "no",
      "top",
      "bottom",
      "front",
      "back",
      "inside",
      "outside",
      "happy",
      "sad",
      "good",
      "bad",
      "hot",
      "cold",
      "black",
      "white",
      "red",
      "blue",
      "green",
      "yellow",
      "pink",
      "brown",
      "gray",
      "gold",
      "silver",
      "round",
      "square",
      "thin",
      "thick",
      "soft",
      "hard",
      "young",
      "old",
      "man",
      "woman",
      "boy",
      "girl",
      "baby",
      "friend",
      "mate",
      "dad",
      "mom",
    ];
    const mediumWords = [
      "ability",
      "absence",
      "academy",
      "account",
      "accused",
      "achieve",
      "action",
      "active",
      "actor",
      "actual",
      "address",
      "advance",
      "advice",
      "affect",
      "afraid",
      "agency",
      "almost",
      "always",
      "amount",
      "animal",
      "answer",
      "arrive",
      "artist",
      "aspect",
      "assist",
      "attack",
      "author",
      "avenue",
      "balance",
      "battery",
      "beauty",
      "believe",
      "benefit",
      "beyond",
      "bottle",
      "bottom",
      "bright",
      "broken",
      "budget",
      "building",
      "butter",
      "button",
      "camera",
      "career",
      "castle",
      "center",
      "chance",
      "change",
      "choice",
      "circle",
      "client",
      "climate",
      "coffee",
      "college",
      "common",
      "company",
      "compete",
      "concert",
      "correct",
      "country",
      "couple",
      "create",
      "credit",
      "crisis",
      "custom",
      "danger",
      "decide",
      "defend",
      "degree",
      "demand",
      "depend",
      "design",
      "detail",
      "develop",
      "device",
      "dinner",
      "doctor",
      "driver",
      "effort",
      "energy",
      "engine",
      "enough",
      "enjoy",
      "escape",
      "family",
      "famous",
      "fashion",
      "father",
      "future",
      "garden",
      "global",
      "golden",
      "ground",
      "handle",
      "health",
      "honest",
      "impact",
      "income",
      "island",
      "leader",
      "lesson",
      "market",
      "member",
      "memory",
      "modern",
      "moment",
      "mother",
      "nation",
      "object",
      "office",
      "option",
      "people",
      "planet",
      "player",
      "police",
      "policy",
      "prefer",
      "public",
      "record",
      "remote",
      "result",
      "school",
      "season",
      "silver",
      "simple",
      "social",
      "sports",
      "system",
      "teacher",
      "theory",
      "travel",
      "useful",
      "vision",
      "winner",
      "wonder",
      "writer",
      "beyond",
      "inside",
      "outside",
      "instead",
      "across",
      "against",
      "within",
      "without",
      "before",
      "after",
      "during",
      "toward",
      "towards",
      "beneath",
      "between",
      "because",
      "service",
      "patient",
      "student",
      "teacher",
      "worker",
      "driver",
      "farmer",
      "officer",
      "singer",
      "dancer",
      "doctor",
      "engineer",
      "manager",
      "lawyer",
      "banker",
      "friend",
      "leader",
      "writer",
      "reader",
      "artist",
      "actor",
      "pilot",
      "clothes",
      "shirt",
      "pants",
      "dress",
      "shoes",
      "jacket",
      "sweater",
      "hat",
      "gloves",
      "scarf",
      "uniform",
      "boots",
      "family",
      "parents",
      "brother",
      "sister",
      "uncle",
      "aunt",
      "cousin",
      "child",
      "children",
      "grandma",
      "grandpa",
      "weather",
      "summer",
      "winter",
      "spring",
      "autumn",
      "season",
      "rainbow",
      "storm",
      "thunder",
      "lightning",
      "country",
      "village",
      "forest",
      "desert",
      "river",
      "bridge",
      "station",
      "market",
      "school",
      "church",
      "temple",
      "castle",
      "palace",
      "garden",
      "street",
      "avenue",
      "corner",
      "station",
      "airport",
      "harbor",
      "theater",
      "cinema",
      "health",
      "illness",
      "doctor",
      "nurse",
      "hospital",
      "clinic",
      "injury",
      "disease",
      "medicine",
      "tablet",
      "pill",
      "kitchen",
      "bedroom",
      "bathroom",
      "living",
      "garage",
      "garden",
      "furniture",
      "sofa",
      "chair",
      "table",
      "desk",
      "window",
      "curtain",
      "mirror",
      "floor",
      "roof",
      "ceiling",
      "stairs",
      "doorway",
      "library",
      "museum",
      "stadium",
    ];
    const hardWords = [
      "abandonment",
      "abbreviation",
      "abnormality",
      "abolishment",
      "absorption",
      "abstraction",
      "accelerator",
      "acceptance",
      "accommodation",
      "accomplishment",
      "accumulation",
      "adaptation",
      "administration",
      "adolescence",
      "advancement",
      "affiliation",
      "agriculture",
      "announcement",
      "anticipation",
      "appreciation",
      "architecture",
      "artificially",
      "association",
      "astonishing",
      "atmospheric",
      "authenticity",
      "automation",
      "beneficiary",
      "biochemistry",
      "bureaucratic",
      "catastrophic",
      "circumstance",
      "collaboration",
      "commencement",
      "communication",
      "competition",
      "comprehensive",
      "condensation",
      "configuration",
      "conglomerate",
      "consequence",
      "consideration",
      "consolidation",
      "constellation",
      "contribution",
      "controversial",
      "cooperation",
      "correspondence",
      "counterproductive",
      "cryptography",
      "decentralization",
      "decomposition",
      "demonstration",
      "determination",
      "differentiation",
      "disadvantage",
      "disciplinary",
      "discrimination",
      "disproportionate",
      "documentation",
      "effectiveness",
      "electromagnetic",
      "entrepreneurship",
      "environmental",
      "establishment",
      "extraordinary",
      "flexibility",
      "fluctuation",
      "functionality",
      "globalization",
      "hallucination",
      "identification",
      "illumination",
      "imagination",
      "implementation",
      "inaccessibility",
      "inappropriate",
      "infrastructure",
      "institutional",
      "instrumentation",
      "intellectual",
      "interpretation",
      "investigation",
      "justification",
      "linguistics",
      "manipulation",
      "metaphorical",
      "misunderstanding",
      "multiplication",
      "neuroscience",
      "nonconformity",
      "observational",
      "organizational",
      "overwhelming",
      "parliamentary",
      "phenomenology",
      "photosynthesis",
      "precipitation",
      "preoccupation",
      "preservation",
      "psychological",
      "questionnaire",
      "reconciliation",
      "rehabilitation",
      "representation",
      "responsibility",
      "simultaneous",
      "sophistication",
      "standardization",
      "subterranean",
      "technological",
      "transformation",
      "transparency",
      "transportation",
      "unpredictable",
      "vulnerability",
      "characterization",
      "multidimensional",
      "hypersensitivity",
      "microbiological",
      "spectroscopic",
      "incompatibility",
      "dissatisfaction",
      "unconstitutional",
      "revolutionary",
      "quantification",
      "thermodynamics",
      "unquestionable",
      "intercontinental",
      "multiculturalism",
      "philosophical",
      "unprecedented",
      "electrochemical",
      "semiconductor",
      "characteristic",
      "instrumentalist",
      "conceptualization",
      "compartmentalization",
      "contextualization",
      "historiography",
      "cinematography",
      "anthropological",
      "epistemological",
      "electrostatics",
      "irreversibility",
      "circumnavigation",
      "unsurmountable",
      "poststructuralism",
      "counterintuitive",
      "disproportionally",
      "geopolitical",
      "axiomatization",
      "institutionalization",
      "interdisciplinary",
      "biotechnology",
      "neuroplasticity",
      "incomprehensible",
      "psychopathology",
      "nanotechnology",
      "hydrodynamics",
      "cartographical",
      "criminological",
      "ornithological",
      "immunodeficiency",
      "parapsychology",
      "ornamentation",
      "photoelectricity",
      "ultrasonography",
      "interplanetary",
      "contemporaneous",
      "microarchitecture",
      "inquisitiveness",
      "metamorphosis",
      "superconductivity",
      "telecommunication",
    ];

    let wordList;
    switch (state.difficulty) {
      case "easy":
        wordList = easyWords;
        break;
      case "hard":
        wordList = hardWords;
        break;
      default:
        wordList = mediumWords;
    }

    // Generate enough words for the test
    state.words = [];
    const wordCount = 100; // More than enough for any test

    for (let i = 0; i < wordCount; i++) {
      let word = wordList[Math.floor(Math.random() * wordList.length)];

      // Apply capitalization if enabled
      if (state.capitalization && Math.random() > 0.7) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }

      // Add punctuation if enabled
      if (state.punctuation && Math.random() > 0.8) {
        const punctuation = [",", ".", ";", "!", "?"][
          Math.floor(Math.random() * 5)
        ];
        word += punctuation;
      }

      state.words.push({
        text: word,
        status: "pending", // pending, current, correct, incorrect
      });
    }

    state.words[0].status = "current";
  }

  function renderWords() {
    textDisplay.innerHTML = "";
    state.words.forEach((word, index) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = `word ${word.status}`;
      wordSpan.textContent = word.text;
      textDisplay.appendChild(wordSpan);

      // Add space after words except the last one
      if (index < state.words.length - 1) {
        textDisplay.appendChild(document.createTextNode(" "));
      }
    });
  }

  function startTest() {
    if (state.isRunning) return;

    state.isRunning = true;
    state.startTime = new Date();
    state.timer = setInterval(updateTimer, 1000);
    typingInput.focus();

    // Start animation on stats
    document.querySelectorAll(".stat-box").forEach((box) => {
      box.style.animation = "pulse 1.5s infinite";
    });
  }

  function stopTest() {
    if (!state.isRunning) return;

    clearInterval(state.timer);
    state.isRunning = false;

    // Stop animation on stats
    document.querySelectorAll(".stat-box").forEach((box) => {
      box.style.animation = "";
    });
  }

  function resetTest() {
    stopTest();

    state.currentWordIndex = 0;
    state.correctChars = 0;
    state.totalChars = 0;
    state.correctWords = 0;
    state.totalWords = 0;
    state.keystrokes = 0;

    wpmElement.textContent = "0";
    accuracyElement.textContent = "100%";
    charactersElement.textContent = "0";
    updateTimerDisplay();

    generateWords();
    renderWords();

    typingInput.value = "";
    analysisElement.classList.add("hidden");

    startBtn.innerHTML = '<i class="fas fa-play"></i> Start Test';
  }

  function updateTimer() {
    const elapsedTime = Math.floor((new Date() - state.startTime) / 1000);
    const timeLeft = state.timeLimit - elapsedTime;

    if (timeLeft <= 0) {
      finishTest();
      return;
    }

    updateTimerDisplay(timeLeft);
  }

  function updateTimerDisplay(timeLeft = null) {
    if (timeLeft === null) {
      timeLeft = state.timeLimit;
    }

    timerElement.textContent = `${timeLeft}s`;
  }

  function handleInput() {
    if (!state.isRunning) return;

    const inputValue = typingInput.value;
    const currentWord = state.words[state.currentWordIndex];

    state.keystrokes++;

    // Check if the current word is completed (space pressed)
    if (inputValue.endsWith(" ")) {
      // Remove the space
      typingInput.value = inputValue.trim();

      // Check if the word was correct
      if (typingInput.value === currentWord.text) {
        currentWord.status = "correct";
        state.correctWords++;
      } else {
        currentWord.status = "incorrect";
      }

      state.totalWords++;

      // Move to the next word
      state.currentWordIndex++;

      // Generate more words if we're running out
      if (state.currentWordIndex > state.words.length - 10) {
        generateWords();
      }

      // Update the next word status
      if (state.currentWordIndex < state.words.length) {
        state.words[state.currentWordIndex].status = "current";
      }

      // Clear input
      typingInput.value = "";

      // Render updated words
      renderWords();

      return;
    }

    // Compare input with current word
    const wordText = currentWord.text;
    const inputText = typingInput.value;

    // Update character accuracy
    state.totalChars = inputText.length;
    state.correctChars = 0;

    for (let i = 0; i < inputText.length; i++) {
      if (i < wordText.length && inputText[i] === wordText[i]) {
        state.correctChars++;
      }
    }

    // Update stats
    updateStats();
  }

  function updateStats() {
    // Calculate WPM (Words Per Minute)
    const elapsedMinutes = (new Date() - state.startTime) / 60000;
    const wpm = Math.round(state.correctWords / elapsedMinutes);
    wpmElement.textContent = isFinite(wpm) ? wpm : 0;

    // Calculate accuracy
    const accuracy =
      state.totalChars > 0
        ? Math.round((state.correctChars / state.totalChars) * 100)
        : 100;
    accuracyElement.textContent = `${accuracy}%`;

    // Update characters
    charactersElement.textContent = state.keystrokes;
  }

  function finishTest() {
    stopTest();

    // Calculate final stats
    const elapsedMinutes = state.timeLimit / 60;
    const wpm = Math.round(state.correctWords / elapsedMinutes);
    const accuracy =
      state.totalChars > 0
        ? Math.round((state.correctChars / state.totalChars) * 100)
        : 100;

    wpmElement.textContent = isFinite(wpm) ? wpm : 0;
    accuracyElement.textContent = `${accuracy}%`;

    // Show analysis
    showAnalysis(wpm, accuracy);
  }

  function showAnalysis(wpm, accuracy) {
    analysisElement.classList.remove("hidden");

    let analysisText = "";

    if (wpm < 20) {
      analysisText = `Your typing speed is beginner level (${wpm} WPM). Focus on accuracy first, then gradually increase your speed. Try to type without looking at the keyboard.`;
    } else if (wpm < 40) {
      analysisText = `Good job! Your typing speed is intermediate (${wpm} WPM). To improve further, practice regularly and try to memorize the keyboard layout.`;
    } else if (wpm < 60) {
      analysisText = `Excellent! Your typing speed is advanced (${wpm} WPM). You're faster than most people. To reach expert level, work on reducing errors and maintaining consistency.`;
    } else {
      analysisText = `Wow! Your typing speed is expert level (${wpm} WPM). You're among the fastest typists. Keep practicing to maintain your skills.`;
    }

    if (accuracy < 90) {
      analysisText += ` Your accuracy (${accuracy}%) could use improvement. Focus on hitting the right keys even if it means slowing down a bit. Accuracy is more important than speed when learning.`;
    } else if (accuracy < 95) {
      analysisText += ` Your accuracy (${accuracy}%) is good, but there's room for improvement. Try to be more precise with your keystrokes.`;
    } else {
      analysisText += ` Your accuracy (${accuracy}%) is excellent! Keep up the good work.`;
    }

    analysisText +=
      " Practice daily for 15-30 minutes to see continuous improvement.";

    analysisElement.innerHTML = `
                    <h3><i class="fas fa-robot"></i> AI Analysis</h3>
                    <p>${analysisText}</p>
                `;
  }

  function playKeySound() {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(
      200 + Math.random() * 200,
      audioContext.currentTime
    );
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.1
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }
});
