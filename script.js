const themeToggle = document.getElementById("theme-toggle");
const timerButtons = document.querySelectorAll(".timer-btn");
const difficultySelect = document.getElementById("difficulty");
const capitalizationBtn = document.getElementById("capitalization-btn");
const punctuationBtn = document.getElementById("punctuation-btn");
const wordsDisplay = document.getElementById("words-display");
const typingInput = document.getElementById("typing-input");
const startBtn = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const correctDisplay = document.getElementById("correct");
const incorrectDisplay = document.getElementById("incorrect");
const progressFill = document.getElementById("progress-fill");
const speedAnalysis = document.getElementById("speed-analysis");
const accuracyAnalysis = document.getElementById("accuracy-analysis");
const improvementAnalysis = document.getElementById("improvement-analysis");

let currentTime = 30;
let currentTheme = "light";
let currentDifficulty = "easy";
let capitalizationEnabled = true;
let punctuationEnabled = true;
let isTestActive = false;
let timer = null;
let startTime = null;
let words = [];
let currentWordIndex = 0;
let correctWords = 0;
let incorrectWords = 0;
let totalTyped = 0;
let correctTyped = 0;

const wordLists = {
  easy: [
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
  ],

  medium: [
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
  ],

  hard: [
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
  ],
};

function init() {
  loadPreferences();
  generateWords();
  updateDisplay();
  setupEventListeners();
}

function loadPreferences() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    currentTheme = savedTheme;
    document.body.className = currentTheme === "dark" ? "dark-theme" : "";
  }
}

function savePreferences() {
  localStorage.setItem("theme", currentTheme);
}

function generateWords() {
  const wordList = wordLists[currentDifficulty];
  words = [];
  for (let i = 0; i < 50; i++) {
    let word = wordList[Math.floor(Math.random() * wordList.length)];

    if (capitalizationEnabled && Math.random() > 0.7) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (punctuationEnabled && Math.random() > 0.8) {
      const punctuations = [".", "!", "?", ",", ";", ":"];
      word += punctuations[Math.floor(Math.random() * punctuations.length)];
    }

    words.push(word);
  }
  currentWordIndex = 0;
}

function updateDisplay() {
  wordsDisplay.innerHTML = "";
  words.forEach((word, index) => {
    const wordElement = document.createElement("span");
    wordElement.className = "word";
    wordElement.textContent = word;

    if (index === currentWordIndex) {
      wordElement.classList.add("current");
    } else if (index < currentWordIndex) {
      wordElement.classList.add("correct");
    }

    wordsDisplay.appendChild(wordElement);
  });
}

function updateTimerButtons() {
  timerButtons.forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.dataset.time) === currentTime);
  });
}

function startTest() {
  if (isTestActive) return;

  isTestActive = true;
  startTime = Date.now();
  correctWords = 0;
  incorrectWords = 0;
  totalTyped = 0;
  correctTyped = 0;
  currentWordIndex = 0;

  typingInput.value = "";
  typingInput.focus();
  typingInput.disabled = false;
  startBtn.textContent = "Restart Test";

  generateWords();
  updateDisplay();

  const endTime = Date.now() + currentTime * 1000;
  clearInterval(timer);
  timer = setInterval(() => {
    const now = Date.now();
    const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
    timerDisplay.textContent = remaining;

    const progress = ((currentTime - remaining) / currentTime) * 100;
    progressFill.style.width = `${progress}%`;

    if (remaining <= 0) {
      endTest();
    }
  }, 100);
}

function endTest() {
  isTestActive = false;
  clearInterval(timer);
  typingInput.disabled = true;

  const timeInMinutes = currentTime / 60;
  const wpm = Math.round(correctTyped / 5 / timeInMinutes);
  const accuracy =
    totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = `${accuracy}%`;

  updateAIAnalysis(wpm, accuracy);

  playSound("end");
}

function updateAIAnalysis(wpm, accuracy) {
  if (wpm < 30) {
    speedAnalysis.textContent =
      "Your typing speed is below average. Focus on building muscle memory through consistent practice.";
  } else if (wpm < 60) {
    speedAnalysis.textContent =
      "Good speed! Maintain consistency and work on reducing hesitation between words.";
  } else {
    speedAnalysis.textContent =
      "Excellent speed! Focus on maintaining this pace while improving accuracy.";
  }

  if (accuracy < 85) {
    accuracyAnalysis.textContent =
      "Your accuracy needs improvement. Slow down slightly to reduce errors and build correct habits.";
  } else if (accuracy < 95) {
    accuracyAnalysis.textContent =
      "Solid accuracy. Focus on difficult letter combinations and maintain your current pace.";
  } else {
    accuracyAnalysis.textContent =
      "Outstanding accuracy! Maintain this precision while gradually increasing speed.";
  }

  if (wpm < 40 && accuracy > 90) {
    improvementAnalysis.textContent =
      "You're accurate but slow. Practice typing without looking at the keyboard to build speed.";
  } else if (wpm > 50 && accuracy < 85) {
    improvementAnalysis.textContent =
      "You're fast but making errors. Focus on accuracy first, speed will follow naturally.";
  } else {
    improvementAnalysis.textContent =
      "Great balance of speed and accuracy. Continue practicing to maintain and improve both.";
  }
}

function playSound(type) {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === "key") {
      oscillator.frequency.value = 200 + Math.random() * 400;
      gainNode.gain.value = 0.1;
      oscillator.type = "sine";
    } else if (type === "end") {
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.2;
      oscillator.type = "sine";
    }

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 50);
  } catch (e) {}
}

function setupEventListeners() {
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    document.body.className = currentTheme === "dark" ? "dark-theme" : "";
    themeToggle.innerHTML =
      currentTheme === "dark"
        ? "<span>☀️</span> Light Mode"
        : "<span>🌙</span> Dark Mode";
  });

  timerButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentTime = parseInt(btn.dataset.time);
      updateTimerButtons();
      timerDisplay.textContent = currentTime;
    });
  });

  difficultySelect.addEventListener("change", () => {
    currentDifficulty = difficultySelect.value;
    if (isTestActive) {
      generateWords();
      updateDisplay();
    }
  });

  capitalizationBtn.addEventListener("click", () => {
    capitalizationEnabled = !capitalizationEnabled;
    capitalizationBtn.classList.toggle("active", capitalizationEnabled);
    if (isTestActive) {
      generateWords();
      updateDisplay();
    }
  });

  punctuationBtn.addEventListener("click", () => {
    punctuationEnabled = !punctuationEnabled;
    punctuationBtn.classList.toggle("active", punctuationEnabled);
    if (isTestActive) {
      generateWords();
      updateDisplay();
    }
  });

  startBtn.addEventListener("click", startTest);

  typingInput.addEventListener("input", (e) => {
    if (!isTestActive) return;

    const inputValue = e.target.value.trim();
    const currentWord = words[currentWordIndex];

    if (e.inputType === "insertText") {
      playSound("key");
    }

    if (e.inputType === "insertText" && e.data === " ") {
      totalTyped += currentWord.length;

      if (inputValue === currentWord) {
        correctWords++;
        correctTyped += currentWord.length;
        wordsDisplay.children[currentWordIndex].classList.add("correct");
        wordsDisplay.children[currentWordIndex].classList.remove("current");
      } else {
        incorrectWords++;
        wordsDisplay.children[currentWordIndex].classList.add("incorrect");
        wordsDisplay.children[currentWordIndex].classList.remove("current");
      }

      currentWordIndex++;
      e.target.value = "";

      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const wpm = Math.round(correctTyped / 5 / timeElapsed);
      const accuracy =
        totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;

      wpmDisplay.textContent = wpm;
      accuracyDisplay.textContent = `${accuracy}%`;
      correctDisplay.textContent = correctWords;
      incorrectDisplay.textContent = incorrectWords;

      if (currentWordIndex >= words.length - 10) {
        generateWords();
        updateDisplay();
      } else {
        wordsDisplay.children[currentWordIndex].classList.add("current");
      }
    }
  });

  typingInput.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      clearInterval(timer);
      isTestActive = false;
      typingInput.value = "";
      typingInput.disabled = false;
      startBtn.textContent = "Start Test";
      timerDisplay.textContent = currentTime;
      progressFill.style.width = "0%";
      wpmDisplay.textContent = "0";
      accuracyDisplay.textContent = "100%";
      correctDisplay.textContent = "0";
      incorrectDisplay.textContent = "0";
      generateWords();
      updateDisplay();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
