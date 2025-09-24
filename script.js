// DOM Elements
const elements = {
  // Theme and UI
  themeToggle: document.getElementById("theme-toggle"),
  body: document.body,

  // Game Modes
  gameModeBtns: document.querySelectorAll(".game-mode-btn"),
  modeSettings: document.querySelectorAll(".mode-settings"),

  // Timed Mode Settings
  timeSelect: document.getElementById("time-select"),
  customTimeGroup: document.getElementById("custom-time-group"),
  customTime: document.getElementById("custom-time"),
  difficultySelect: document.getElementById("difficulty-select"),
  languageSelect: document.getElementById("language-select"),
  punctuationToggle: document.getElementById("punctuation-toggle"),

  // Survival Mode Settings
  survivalType: document.getElementById("survival-type"),
  maxMistakesGroup: document.getElementById("max-mistakes-group"),
  maxMistakes: document.getElementById("max-mistakes"),
  survivalTimeGroup: document.getElementById("survival-time-group"),
  survivalTime: document.getElementById("survival-time"),
  survivalDifficulty: document.getElementById("survival-difficulty"),
  survivalLanguage: document.getElementById("survival-language"),

  // Test Area
  timer: document.getElementById("timer"),
  wordsContainer: document.getElementById("words-container"),
  typingInput: document.getElementById("typing-input"),
  resetTest: document.getElementById("reset-test"),
  showTutorial: document.getElementById("show-tutorial"),

  // Stats
  wpm: document.getElementById("wpm"),
  accuracy: document.getElementById("accuracy"),
  keystrokes: document.getElementById("keystrokes"),
  errors: document.getElementById("errors"),

  // AI Analysis
  analysisContent: document.getElementById("analysis-content"),
  heatmapContainer: document.getElementById("heatmap-container"),
  heatmapKeys: document.getElementById("heatmap-keys"),
  errorBreakdown: document.getElementById("error-breakdown"),
  errorList: document.getElementById("error-list"),

  // Authentication
  userStatus: document.getElementById("user-status"),
  userAvatar: document.getElementById("user-avatar"),
  userNameDisplay: document.getElementById("user-name-display"),
  loginBtn: document.getElementById("login-btn"),
  logoutBtn: document.getElementById("logout-btn"),

  // Modals
  notificationModal: document.getElementById("notification-modal"),
  notificationMessage: document.getElementById("notification-message"),
  closeNotification: document.getElementById("close-notification"),
  tutorialModal: document.getElementById("tutorial-modal"),
  closeTutorial: document.getElementById("close-tutorial"),

  // Sound
  soundToggle: document.getElementById("sound-toggle"),
  soundType: document.getElementById("sound-type"),

  // Keyboard
  onScreenKeyboard: document.getElementById("on-screen-keyboard"),
  mobileKeyboard: document.getElementById("mobile-keyboard"),

  // Progress Chart
  progressChart: document.getElementById("progress-chart"),
  wpmChart: document.getElementById("wpm-chart"),

  // Finger Tutor
  fingerTutor: document.getElementById("finger-tutor"),

  // Community Features
  leaderboardList: document.getElementById("leaderboard-list"),
  achievementsList: document.getElementById("achievements-list"),
  shareResults: document.getElementById("share-results"),

  // AI Features
  aiSuggestions: document.getElementById("ai-suggestions"),
  startPractice: document.getElementById("start-practice"),
  predictionText: document.getElementById("prediction-text"),
  startPrediction: document.getElementById("start-prediction"),

  // Settings
  applySettings: document.getElementById("apply-settings"),
  keyboardRemap: document.getElementById("keyboard-remap"),
  oneHandedMode: document.getElementById("one-handed-mode"),
};

// Game State
const state = {
  // Test State
  isTestActive: false,
  isTestComplete: false,
  startTime: null,
  endTime: null,
  timerInterval: null,
  currentTime: 60,

  // Typing State
  currentWordIndex: 0,
  words: [],
  typedWords: [],
  errorsCount: 0,
  totalKeystrokes: 0,
  correctKeystrokes: 0,

  // User Settings
  currentMode: "timed",
  testDuration: 60,
  difficulty: "easy",
  language: "english",
  punctuationEnabled: false,
  soundEnabled: true,
  soundType: "mechanical",

  // User Data
  user: null,
  userData: null,
  isLoggedIn: false,

  // Performance Tracking
  wpmHistory: [],
  accuracyHistory: [],
  keyPressTimes: {},
  errorMap: {},

  // AI Analysis
  heatmapData: {},
  errorAnalysis: [],

  // Keyboard
  keyboardLayout: "qwerty",
  isOneHandedMode: false,
  remappedKeys: {},

  // Tutorial
  tutorialStep: 0,
  isTutorialActive: false,

  // Leaderboard data
  leaderboardData: [],
};

// Word Lists
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

// Initialize the application
function init() {
  // Set up event listeners
  setupEventListeners();

  // Generate initial word set
  generateWords();

  // Create on-screen keyboard
  createKeyboard();

  // Check if user is logged in
  checkAuthState();

  // Load user preferences
  loadPreferences();

  // Show tutorial for first-time users
  if (!localStorage.getItem("typemaster-tutorial-completed")) {
    setTimeout(() => {
      showTutorial();
    }, 1000);
  }

  // Initialize chart
  initChart();

  // Generate achievements
  generateAchievements();

  // Generate AI suggestions
  generateAISuggestions();

  // Generate prediction challenge
  generatePredictionChallenge();

  // Load leaderboard data
  loadLeaderboardData();
}

// Set up all event listeners
function setupEventListeners() {
  // Theme toggle
  elements.themeToggle.addEventListener("click", toggleTheme);

  // Game mode selection
  elements.gameModeBtns.forEach((btn) => {
    btn.addEventListener("click", switchGameMode);
  });

  // Timer selection
  elements.timeSelect.addEventListener("change", handleTimeSelectChange);

  // Survival type selection
  elements.survivalType.addEventListener("change", handleSurvivalTypeChange);

  // Typing input
  elements.typingInput.addEventListener("input", handleTypingInput);
  elements.typingInput.addEventListener("keydown", handleKeyDown);
  elements.typingInput.addEventListener("focus", startTest);

  // Tab key to focus on input
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !state.isTestActive && !state.isTestComplete) {
      e.preventDefault();
      elements.typingInput.focus();
      startTest();
    }
  });

  // Reset test
  elements.resetTest.addEventListener("click", resetTest);

  // Show tutorial
  elements.showTutorial.addEventListener("click", showTutorial);

  // Close modals
  elements.closeNotification.addEventListener("click", hideNotification);
  elements.closeTutorial.addEventListener("click", hideTutorial);

  // Sound toggle
  elements.soundToggle.addEventListener("change", toggleSound);
  elements.soundType.addEventListener("change", changeSoundType);

  // Authentication
  elements.loginBtn.addEventListener("click", showLoginModal);
  elements.logoutBtn.addEventListener("click", logout);

  // Apply settings
  elements.applySettings.addEventListener("click", applySettings);

  // Keyboard remapping
  elements.keyboardRemap.addEventListener("click", showKeyboardRemapModal);

  // One-handed mode
  elements.oneHandedMode.addEventListener("click", toggleOneHandedMode);

  // Share results
  elements.shareResults.addEventListener("click", shareResults);

  // AI Practice
  elements.startPractice.addEventListener("click", startAIPractice);

  // Prediction Challenge
  elements.startPrediction.addEventListener("click", startPredictionChallenge);

  // Privacy policy
  document
    .getElementById("privacy-link")
    .addEventListener("click", showPrivacyPolicy);

  // Keyboard events for on-screen keyboard
  document.addEventListener("click", handleScreenKeyboardClick);

  // Swipe events for mobile keyboard
  setupSwipeEvents();
}

// Game Mode Functions
function switchGameMode(e) {
  const mode = e.target.dataset.mode;

  // Update active button
  elements.gameModeBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  e.target.classList.add("active");

  // Update active settings panel
  elements.modeSettings.forEach((panel) => {
    panel.classList.remove("active");
  });
  document.getElementById(`${mode}-settings`).classList.add("active");

  // Update state
  state.currentMode = mode;

  // Reset test for new mode
  resetTest();

  // Show notification
  showNotification(`Switched to ${mode.replace(/-/g, " ")} mode`);
}

// Word Generation
function generateWords() {
  const wordList = wordLists[state.language][state.difficulty];
  const wordCount = state.currentMode === "survival" ? 50 : 100;

  state.words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    let word = wordList[randomIndex];

    // Add punctuation and capitals if enabled
    if (state.punctuationEnabled && Math.random() > 0.7) {
      if (Math.random() > 0.5) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (Math.random() > 0.8) {
        word += Math.random() > 0.5 ? "," : ".";
      }
    }

    state.words.push(word);
  }

  renderWords();
}

function renderWords() {
  elements.wordsContainer.innerHTML = "";

  state.words.forEach((word, index) => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    if (index === state.currentWordIndex) {
      wordElement.classList.add("current");
    }

    word.split("").forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      wordElement.appendChild(charSpan);
    });

    elements.wordsContainer.appendChild(wordElement);
  });

  // Scroll to current word
  const currentWord = elements.wordsContainer.querySelector(".current");
  if (currentWord) {
    currentWord.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Test Control Functions
function startTest() {
  if (state.isTestActive || state.isTestComplete) return;

  state.isTestActive = true;
  state.startTime = new Date();
  state.currentTime = state.testDuration;

  // Start timer
  if (state.currentMode === "timed") {
    state.timerInterval = setInterval(updateTimer, 1000);
  }

  // Focus on input
  elements.typingInput.focus();

  // Play start sound if enabled
  if (state.soundEnabled) {
    // Play start sound
  }

  // Removed the "Test started, type away" notification as requested
}

function updateTimer() {
  state.currentTime--;
  elements.timer.textContent = state.currentTime;

  if (state.currentTime <= 0) {
    endTest();

    // Visual feedback for timer completion
    elements.timer.style.background = "var(--success-color)";
    elements.timer.style.transform = "scale(1.2)";
    setTimeout(() => {
      elements.timer.style.transform = "scale(1)";
    }, 500);
  } else if (state.currentTime <= 5) {
    // Visual warning for last 5 seconds
    elements.timer.style.background = "var(--warning-color)";
    elements.timer.style.animation = "pulse 0.5s infinite";
  }
}

function endTest() {
  state.isTestActive = false;
  state.isTestComplete = true;
  state.endTime = new Date();

  // Clear timer
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }

  // Disable input for 5 seconds
  disableInputForDuration(5000);

  // Calculate results
  calculateResults();

  // Show results modal
  showResultsModal();

  // Save results
  saveResults();

  // Play completion sound if enabled
  if (state.soundEnabled) {
    // Play completion sound
  }

  showNotification("Test completed! Check your results.");
}

// New function to disable input for a duration
function disableInputForDuration(durationMs) {
  elements.typingInput.disabled = true;
  elements.typingInput.placeholder = `Test completed! Please wait ${
    durationMs / 1000
  } seconds...`;
  elements.typingInput.style.opacity = "0.6";
  elements.typingInput.style.cursor = "not-allowed";

  // Re-enable after duration
  setTimeout(() => {
    elements.typingInput.disabled = false;
    elements.typingInput.placeholder =
      "Click here or press Tab to start typing...";
    elements.typingInput.style.opacity = "1";
    elements.typingInput.style.cursor = "text";
  }, durationMs);
}

function resetTest() {
  state.isTestActive = false;
  state.isTestComplete = false;
  state.currentWordIndex = 0;
  state.typedWords = [];
  state.errorsCount = 0;
  state.totalKeystrokes = 0;
  state.correctKeystrokes = 0;
  state.currentTime = state.testDuration;
  state.lastCorrectCount = 0;

  // Clear timer
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }

  // Ensure input is enabled
  elements.typingInput.disabled = false;
  elements.typingInput.placeholder =
    "Click here or press Tab to start typing...";
  elements.typingInput.style.opacity = "1";
  elements.typingInput.style.cursor = "text";
  elements.typingInput.value = "";

  // Reset UI
  elements.timer.textContent = state.testDuration;
  elements.wpm.textContent = "0";
  elements.accuracy.textContent = "100%";
  elements.keystrokes.textContent = "0";
  elements.errors.textContent = "0";
  elements.analysisContent.textContent =
    "Complete a test to get personalized feedback on your typing performance.";

  // Hide analysis sections
  elements.heatmapContainer.style.display = "none";
  elements.errorBreakdown.style.display = "none";
  elements.fingerTutor.style.display = "none";

  // Generate new words
  generateWords();

  showNotification("Test reset. Ready for a new attempt!");
}

// Typing Handling
function handleTypingInput(e) {
  if (!state.isTestActive) {
    startTest();
  }

  const input = e.target.value;
  const currentWord = state.words[state.currentWordIndex];

  // FIXED: Only count character keystrokes, not spaces or other keys
  if (
    input.length > e.target.getAttribute("data-prev-length") ||
    !e.target.getAttribute("data-prev-length")
  ) {
    state.totalKeystrokes++;

    // Play key sound if enabled
    if (state.soundEnabled) {
      playKeySound();
    }
  }
  e.target.setAttribute("data-prev-length", input.length);

  // Check if space was pressed (word completion)
  if (input.endsWith(" ")) {
    handleWordCompletion(input.trim());
    e.target.value = "";
  } else {
    updateCurrentWordDisplay(input);
  }

  // Update stats in real-time
  updateLiveStats();
}

function handleWordCompletion(typedWord) {
  const currentWord = state.words[state.currentWordIndex];
  const isCorrect = typedWord === currentWord;

  // Record the word
  state.typedWords.push({
    word: currentWord,
    typed: typedWord,
    correct: isCorrect,
    time: new Date() - state.startTime,
  });

  // Update error count
  if (!isCorrect) {
    state.errorsCount++;

    // Record error for analysis
    recordError(currentWord, typedWord);
  }

  // Move to next word
  state.currentWordIndex++;

  // Check if test is complete
  if (
    state.currentWordIndex >= state.words.length ||
    (state.currentMode === "survival" && state.errorsCount >= state.maxMistakes)
  ) {
    endTest();
  } else {
    renderWords();
  }
}

function updateCurrentWordDisplay(input) {
  const currentWord = state.words[state.currentWordIndex];
  const wordElement = elements.wordsContainer.querySelector(".current");

  if (!wordElement) return;

  const charSpans = wordElement.querySelectorAll("span");

  // FIXED: Reset correct keystrokes count for this word
  let correctCharsThisUpdate = 0;

  // Update character styling
  charSpans.forEach((span, index) => {
    span.className = "";

    if (index < input.length) {
      if (input[index] === currentWord[index]) {
        span.classList.add("correct");
        correctCharsThisUpdate++;
      } else {
        span.classList.add("incorrect");
      }
    }
  });

  // FIXED: Only count correct characters once per update
  state.correctKeystrokes +=
    correctCharsThisUpdate - (state.lastCorrectCount || 0);
  state.lastCorrectCount = correctCharsThisUpdate;
}

function handleKeyDown(e) {
  // Record key press time for heatmap
  if (state.isTestActive) {
    recordKeyPress(e.key);
  }

  // Prevent default for tab key to avoid losing focus
  if (e.key === "Tab") {
    e.preventDefault();
  }
}

// Statistics and Analysis
function calculateResults() {
  const timeInMinutes = (state.endTime - state.startTime) / 60000;
  const wordsTyped = state.typedWords.length;
  const netWPM = Math.round(
    wordsTyped / timeInMinutes - state.errorsCount / timeInMinutes
  );
  const grossWPM = Math.round(wordsTyped / timeInMinutes);

  // FIXED: Proper accuracy calculation based on correct words vs total words
  const totalWordsAttempted = state.typedWords.length;
  const correctWords = state.typedWords.filter((word) => word.correct).length;
  const accuracy =
    totalWordsAttempted > 0
      ? Math.round((correctWords / totalWordsAttempted) * 100)
      : 100;

  // Update UI
  elements.wpm.textContent = netWPM;
  elements.accuracy.textContent = `${accuracy}%`;
  elements.keystrokes.textContent = state.totalKeystrokes;
  elements.errors.textContent = state.errorsCount;

  // Store for history
  state.wpmHistory.push(netWPM);
  state.accuracyHistory.push(accuracy);

  // Update chart
  updateChart();

  // Generate AI analysis
  generateAIAnalysis(netWPM, accuracy);
}

function updateLiveStats() {
  if (!state.isTestActive || !state.startTime) return;

  const timeInMinutes = (new Date() - state.startTime) / 60000;
  const wordsTyped = state.currentWordIndex;
  const netWPM = Math.max(
    0,
    Math.round(wordsTyped / timeInMinutes - state.errorsCount / timeInMinutes)
  );

  // FIXED: Proper accuracy calculation for live updates
  const totalWordsAttempted = state.currentWordIndex;
  const correctWords = state.typedWords.filter((word) => word.correct).length;
  const accuracy =
    totalWordsAttempted > 0
      ? Math.round((correctWords / totalWordsAttempted) * 100)
      : 100;

  elements.wpm.textContent = netWPM;
  elements.accuracy.textContent = `${accuracy}%`;
  elements.keystrokes.textContent = state.totalKeystrokes;
  elements.errors.textContent = state.errorsCount;
}

function generateAIAnalysis(wpm, accuracy) {
  let analysis = "";

  // Basic feedback based on WPM and accuracy
  if (wpm < 30) {
    analysis =
      "You're getting started! Practice regularly to improve your speed.";
  } else if (wpm < 50) {
    analysis = "Good speed! Focus on accuracy to reach the next level.";
  } else if (wpm < 80) {
    analysis = "Great speed! You're typing faster than average.";
  } else {
    analysis = "Excellent speed! You're among the top typists.";
  }

  // Accuracy-specific feedback
  if (accuracy < 90) {
    analysis += " Try to focus on accuracy rather than speed.";
  } else if (accuracy < 95) {
    analysis += " Your accuracy is good, but there's room for improvement.";
  } else {
    analysis += " Your accuracy is excellent!";
  }

  // Error pattern analysis - FIXED: Properly format error messages
  if (state.errorAnalysis.length > 0) {
    const topErrors = state.errorAnalysis.slice(0, 3);
    const errorMessages = topErrors.map(
      (error) => `"${error.correct}" instead of "${error.typed}"`
    );
    analysis += " Common errors: " + errorMessages.join(", ");
  }

  elements.analysisContent.textContent = analysis;

  // Show heatmap and error breakdown if we have data
  if (Object.keys(state.heatmapData).length > 0) {
    generateHeatmap();
    elements.heatmapContainer.style.display = "block";
  }

  if (state.errorAnalysis.length > 0) {
    generateErrorBreakdown();
    elements.errorBreakdown.style.display = "block";
  }

  // Show finger placement tutor for beginners
  if (wpm < 40) {
    elements.fingerTutor.style.display = "block";
  }
}

function generateHeatmap() {
  elements.heatmapKeys.innerHTML = "";

  // Standard QWERTY layout
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  rows.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = "heatmap-row";

    row.forEach((key) => {
      const keyElement = document.createElement("div");
      keyElement.className = "heatmap-key";
      keyElement.textContent = key;

      // Calculate intensity based on press count
      const pressCount = state.heatmapData[key] || 0;
      const intensity = Math.min(1, pressCount / 50); // Normalize

      // Set background color based on intensity
      keyElement.style.background = `rgba(67, 97, 238, ${intensity})`;
      keyElement.style.color = intensity > 0.5 ? "white" : "inherit";

      rowElement.appendChild(keyElement);
    });

    elements.heatmapKeys.appendChild(rowElement);
  });
}

function generateErrorBreakdown() {
  elements.errorList.innerHTML = "";

  // Show top 5 errors
  const topErrors = state.errorAnalysis.slice(0, 5);

  topErrors.forEach((error) => {
    const errorElement = document.createElement("div");
    errorElement.className = "error-item";

    errorElement.innerHTML = `
                    <span class="error-correct">${error.correct}</span>
                    <span>→</span>
                    <span class="error-typed">${error.typed}</span>
                    <span class="error-count">${error.count} times</span>
                `;

    elements.errorList.appendChild(errorElement);
  });
}

function recordKeyPress(key) {
  // Normalize key (ignore modifier keys)
  if (key.length === 1) {
    const normalizedKey = key.toUpperCase();
    state.heatmapData[normalizedKey] =
      (state.heatmapData[normalizedKey] || 0) + 1;
  }
}

function recordError(correctWord, typedWord) {
  // Find existing error or create new one
  let error = state.errorAnalysis.find(
    (e) => e.correct === correctWord && e.typed === typedWord
  );

  if (error) {
    error.count++;
  } else {
    state.errorAnalysis.push({
      correct: correctWord,
      typed: typedWord,
      count: 1,
    });
  }

  // Sort by count descending
  state.errorAnalysis.sort((a, b) => b.count - a.count);
}

// UI Components
function createKeyboard() {
  // Standard QWERTY layout
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];

  elements.onScreenKeyboard.innerHTML = "";

  rows.forEach((row) => {
    row.forEach((key) => {
      const keyElement = document.createElement("div");
      keyElement.className = "keyboard-key";
      keyElement.textContent = key;
      keyElement.dataset.key = key;
      elements.onScreenKeyboard.appendChild(keyElement);
    });
  });

  // Create mobile keyboard with swipe support
  createMobileKeyboard();
}

function createMobileKeyboard() {
  // Simplified mobile keyboard
  const mobileRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  elements.mobileKeyboard.innerHTML = "";

  mobileRows.forEach((row) => {
    row.forEach((key) => {
      const keyElement = document.createElement("div");
      keyElement.className = "keyboard-key";
      keyElement.textContent = key;
      keyElement.dataset.key = key;
      elements.mobileKeyboard.appendChild(keyElement);
    });
  });
}

function handleScreenKeyboardClick(e) {
  if (e.target.classList.contains("keyboard-key")) {
    const key = e.target.dataset.key;

    // Simulate key press
    if (state.isTestActive) {
      elements.typingInput.value += key.toLowerCase();
      elements.typingInput.dispatchEvent(new Event("input"));

      // Visual feedback
      e.target.classList.add("active");
      setTimeout(() => {
        e.target.classList.remove("active");
      }, 100);
    }
  }
}

function setupSwipeEvents() {
  let touchStartX = 0;
  let touchStartY = 0;

  elements.mobileKeyboard.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  });

  elements.mobileKeyboard.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Determine swipe direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 0) {
        // Swipe right - add space
        if (state.isTestActive) {
          elements.typingInput.value += " ";
          elements.typingInput.dispatchEvent(new Event("input"));
        }
      } else {
        // Swipe left - backspace
        if (state.isTestActive && elements.typingInput.value.length > 0) {
          elements.typingInput.value = elements.typingInput.value.slice(0, -1);
          elements.typingInput.dispatchEvent(new Event("input"));
        }
      }
    }
  });
}

// Chart Functions
function initChart() {
  // Initialize chart with Chart.js
  const ctx2 = elements.wpmChart.getContext("2d");

  // For demo purposes, we'll create a simple chart
  // In a real implementation, you would use Chart.js or similar library
  elements.wpmChart.width = elements.progressChart.clientWidth;
  elements.wpmChart.height = elements.progressChart.clientHeight;

  // Draw placeholder text
  ctx2.fillStyle = getComputedStyle(document.body).getPropertyValue(
    "--text-color"
  );
  ctx2.font = "16px Arial";
  ctx2.textAlign = "center";
  ctx2.fillText(
    "WPM Progress Chart",
    elements.wpmChart.width / 2,
    elements.wpmChart.height / 2
  );
}

function updateChart() {
  // Update chart with new data
  // This would integrate with Chart.js in a real implementation
  const ctx2 = elements.wpmChart.getContext("2d");
  ctx2.clearRect(0, 0, elements.wpmChart.width, elements.wpmChart.height);

  // Draw updated chart
  ctx2.fillStyle = getComputedStyle(document.body).getPropertyValue(
    "--text-color"
  );
  ctx2.font = "16px Arial";
  ctx2.textAlign = "center";
  ctx2.fillText(
    `Latest WPM: ${state.wpmHistory[state.wpmHistory.length - 1]}`,
    elements.wpmChart.width / 2,
    elements.wpmChart.height / 2
  );
}

// Authentication Functions
function checkAuthState() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      state.user = user;
      state.isLoggedIn = true;
      updateUserUI();
      loadUserData();
    } else {
      state.user = null;
      state.isLoggedIn = false;
      updateUserUI();
    }
  });
}

function updateUserUI() {
  if (state.isLoggedIn) {
    elements.userAvatar.textContent = state.user.displayName
      ? state.user.displayName.charAt(0).toUpperCase()
      : state.user.email.charAt(0).toUpperCase();
    elements.userNameDisplay.textContent =
      state.user.displayName || state.user.email.split("@")[0];
    elements.loginBtn.style.display = "none";
    elements.logoutBtn.style.display = "block";
  } else {
    elements.userAvatar.textContent = "?";
    elements.userNameDisplay.textContent = "Guest";
    elements.loginBtn.style.display = "block";
    elements.logoutBtn.style.display = "none";
  }
}

function showLoginModal() {
  // Create login modal
  const modal = document.createElement("div");
  modal.className = "modal-overlay active";
  modal.innerHTML = `
                <div class="modal">
                    <div class="modal-header">
                        <h2>Login to TypeMaster</h2>
                        <button class="modal-close-btn">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-tabs">
                            <div class="form-tab active" data-tab="login">Login</div>
                            <div class="form-tab" data-tab="signup">Sign Up</div>
                        </div>
                        <div id="login-form">
                            <input type="text" id="login-username" placeholder="Username" />
                            <br>
                            <input type="email" id="login-email" placeholder="Email" />
                            <br>
                            <input type="password" id="login-password" placeholder="Password" />
                            <button id="do-login">Login</button>
                            <div class="google-signin" id="google-login">
                                <i class="fab fa-google"></i> Continue with Google
                            </div>
                        </div>
                        <div id="signup-form" style="display: none;">
                            <input type="text" id="signup-username" placeholder="Username" />
                            <br>
                            <input type="email" id="signup-email" placeholder="Email" />
                            <br>
                            <input type="password" id="signup-password" placeholder="Password" />
                            <div class="password-requirements">
                                <p>Password must contain:</p>
                                <ul>
                                    <li class="requirement-not-met">At least 8 characters</li>
                                    <li class="requirement-not-met">One uppercase letter</li>
                                    <li class="requirement-not-met">One number</li>
                                </ul>
                            </div>
                            <button id="do-signup">Sign Up</button>
                            <div class="google-signin" id="google-signup">
                                <i class="fab fa-google"></i> Continue with Google
                            </div>
                        </div>
                    </div>
                </div>
            `;

  document.body.appendChild(modal);

  // Add event listeners
  modal.querySelector(".modal-close-btn").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelectorAll(".form-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      modal
        .querySelectorAll(".form-tab")
        .forEach((t) => t.classList.remove("active"));
      e.target.classList.add("active");

      if (e.target.dataset.tab === "login") {
        modal.querySelector("#login-form").style.display = "block";
        modal.querySelector("#signup-form").style.display = "none";
      } else {
        modal.querySelector("#login-form").style.display = "none";
        modal.querySelector("#signup-form").style.display = "block";
      }
    });
  });

  modal.querySelector("#do-login").addEventListener("click", () => {
    const email = modal.querySelector("#login-email").value;
    const password = modal.querySelector("#login-password").value;
    login(email, password);
    document.body.removeChild(modal);
  });

  modal.querySelector("#do-signup").addEventListener("click", () => {
    const email = modal.querySelector("#signup-email").value;
    const password = modal.querySelector("#signup-password").value;
    const username = modal.querySelector("#signup-username").value;
    signup(email, password, username);
    document.body.removeChild(modal);
  });

  // Google authentication
  modal.querySelector("#google-login").addEventListener("click", () => {
    signInWithGoogle();
    document.body.removeChild(modal);
  });

  modal.querySelector("#google-signup").addEventListener("click", () => {
    signInWithGoogle();
    document.body.removeChild(modal);
  });
}

function login(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      showNotification("Login successful!");
    })
    .catch((error) => {
      showNotification("Login failed: " + error.message);
    });
}

function signup(email, password, username) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update user profile with username
      return userCredential.user.updateProfile({
        displayName: username,
      });
    })
    .then(() => {
      showNotification("Account created successfully!");
    })
    .catch((error) => {
      showNotification("Signup failed: " + error.message);
    });
}

function signInWithGoogle() {
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      showNotification("Google sign-in successful!");
    })
    .catch((error) => {
      showNotification("Google sign-in failed: " + error.message);
    });
}

function logout() {
  auth
    .signOut()
    .then(() => {
      showNotification("Logged out successfully");
    })
    .catch((error) => {
      showNotification("Logout failed: " + error.message);
    });
}

function loadUserData() {
  if (!state.isLoggedIn) return;

  db.collection("users")
    .doc(state.user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        state.userData = doc.data();
        applyUserPreferences();
      } else {
        // Create user document if it doesn't exist
        db.collection("users")
          .doc(state.user.uid)
          .set({
            username: state.user.displayName || state.user.email.split("@")[0],
            email: state.user.email,
            createdAt: new Date(),
            preferences: {},
          });
      }
    })
    .catch((error) => {
      console.error("Error loading user data:", error);
    });
}

function saveResults() {
  const result = {
    wpm: parseInt(elements.wpm.textContent),
    accuracy: parseInt(elements.accuracy.textContent),
    keystrokes: parseInt(elements.keystrokes.textContent),
    errors: parseInt(elements.errors.textContent),
    timestamp: new Date(),
    mode: state.currentMode,
    duration: state.testDuration,
    difficulty: state.difficulty,
    language: state.language,
  };

  if (state.isLoggedIn) {
    // Save to Firebase
    db.collection("users")
      .doc(state.user.uid)
      .collection("results")
      .add(result)
      .then(() => {
        // Update leaderboard
        updateLeaderboard();
      })
      .catch((error) => {
        console.error("Error saving results to Firebase:", error);
        // Fallback to localStorage
        saveToLocalStorage(result);
      });
  } else {
    // Save to localStorage
    saveToLocalStorage(result);
  }
}

// Helper function for localStorage saving
function saveToLocalStorage(result) {
  let results = JSON.parse(localStorage.getItem("typemaster-results") || "[]");
  results.push(result);
  localStorage.setItem("typemaster-results", JSON.stringify(results));

  // Keep only last 50 results
  if (results.length > 50) {
    results = results.slice(-50);
    localStorage.setItem("typemaster-results", JSON.stringify(results));
  }

  // Update leaderboard
  updateLeaderboard();
}

// Leaderboard Functions
function loadLeaderboardData() {
  // Clear existing data
  state.leaderboardData = [];

  if (state.isLoggedIn) {
    // Load from Firebase - get all users' best results
    db.collectionGroup("results")
      .orderBy("wpm", "desc")
      .limit(20)
      .get()
      .then((querySnapshot) => {
        const userPromises = [];
        const leaderboardMap = new Map(); // Use Map to avoid duplicates

        querySnapshot.forEach((doc) => {
          const resultData = doc.data();
          const userId = doc.ref.path.split("/")[1]; // Extract user ID from path

          // Only keep the best result per user
          if (
            !leaderboardMap.has(userId) ||
            leaderboardMap.get(userId).wpm < resultData.wpm
          ) {
            leaderboardMap.set(userId, {
              userId: userId,
              wpm: resultData.wpm,
              accuracy: resultData.accuracy,
              timestamp: resultData.timestamp,
              mode: resultData.mode,
              difficulty: resultData.difficulty,
            });

            // Get user profile data
            userPromises.push(db.collection("users").doc(userId).get());
          }
        });

        // Resolve all user profile promises
        return Promise.all(userPromises).then((userSnapshots) => {
          userSnapshots.forEach((userDoc, index) => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              const userId = userDoc.id;
              const result = leaderboardMap.get(userId);

              if (result) {
                state.leaderboardData.push({
                  username:
                    userData.username ||
                    userData.email?.split("@")[0] ||
                    "Anonymous",
                  wpm: result.wpm,
                  accuracy: result.accuracy,
                  timestamp: result.timestamp,
                  mode: result.mode,
                  difficulty: result.difficulty,
                  userId: userId,
                });
              }
            }
          });

          // Sort by WPM descending
          state.leaderboardData.sort((a, b) => b.wpm - a.wpm);
          generateLeaderboard();
        });
      })
      .catch((error) => {
        console.error("Error loading leaderboard:", error);
        // Fallback to local data
        loadLocalLeaderboardData();
      });
  } else {
    // Load from localStorage for guest users
    loadLocalLeaderboardData();
  }
}

// Helper function for local leaderboard data
function loadLocalLeaderboardData() {
  const results = JSON.parse(
    localStorage.getItem("typemaster-results") || "[]"
  );

  if (results.length > 0) {
    // Get best result
    const bestResult = results.reduce((best, current) =>
      current.wpm > best.wpm ? current : best
    );

    state.leaderboardData = [
      {
        username: "You (Guest)",
        wpm: bestResult.wpm,
        accuracy: bestResult.accuracy,
        timestamp: bestResult.timestamp,
        mode: bestResult.mode,
        difficulty: bestResult.difficulty,
        userId: "guest",
      },
    ];
  } else {
    state.leaderboardData = [];
  }

  generateLeaderboard();
}

function updateLeaderboard() {
  // After saving results, refresh the leaderboard
  loadLeaderboardData();
}

function generateLeaderboard() {
  elements.leaderboardList.innerHTML = "";

  if (state.leaderboardData.length === 0) {
    elements.leaderboardList.innerHTML =
      "<p>No results yet. Complete a test to appear on the leaderboard!</p>";
    return;
  }

  // Show top 10 users with more details
  const topUsers = state.leaderboardData.slice(0, 10);

  topUsers.forEach((user, index) => {
    const item = document.createElement("div");
    item.className = "leaderboard-item";

    // Format timestamp
    const date = user.timestamp?.toDate
      ? user.timestamp.toDate()
      : new Date(user.timestamp);
    const formattedDate = date.toLocaleDateString();

    // Highlight current user
    const isCurrentUser = state.isLoggedIn && user.userId === state.user?.uid;
    const usernameDisplay = isCurrentUser
      ? `👤 ${user.username} (You)`
      : user.username;

    item.innerHTML = `
            <span class="leaderboard-rank">#${index + 1}</span>
            <span style="font-weight: ${
              isCurrentUser ? "bold" : "normal"
            }">${usernameDisplay}</span>
            <span>${user.wpm} WPM</span>
            <span>${user.accuracy}%</span>
            <span style="font-size: 0.8em; opacity: 0.7;">${formattedDate}</span>
        `;

    elements.leaderboardList.appendChild(item);
  });

  // Show user's position if not in top 10
  if (state.isLoggedIn) {
    const userIndex = state.leaderboardData.findIndex(
      (user) => user.userId === state.user.uid
    );
    if (userIndex >= 10) {
      const userData = state.leaderboardData[userIndex];
      const item = document.createElement("div");
      item.className = "leaderboard-item";
      item.style.background = "var(--primary-color)";
      item.style.color = "white";
      item.style.marginTop = "1rem";
      item.style.borderRadius = "5px";

      item.innerHTML = `
                <span class="leaderboard-rank">#${userIndex + 1}</span>
                <span><strong>👤 Your Best</strong></span>
                <span>${userData.wpm} WPM</span>
                <span>${userData.accuracy}%</span>
            `;

      elements.leaderboardList.appendChild(item);
    }
  }
}

// Settings Functions
function handleTimeSelectChange() {
  if (elements.timeSelect.value === "custom") {
    elements.customTimeGroup.style.display = "block";
  } else {
    elements.customTimeGroup.style.display = "none";
    state.testDuration = parseInt(elements.timeSelect.value);
    elements.timer.textContent = state.testDuration;
  }
}

function handleSurvivalTypeChange() {
  if (elements.survivalType.value === "mistakes") {
    elements.maxMistakesGroup.style.display = "block";
    elements.survivalTimeGroup.style.display = "none";
  } else {
    elements.maxMistakesGroup.style.display = "none";
    elements.survivalTimeGroup.style.display = "block";
  }
}

function applySettings() {
  // Update state with current settings
  if (state.currentMode === "timed") {
    state.testDuration =
      elements.timeSelect.value === "custom"
        ? parseInt(elements.customTime.value)
        : parseInt(elements.timeSelect.value);
    state.difficulty = elements.difficultySelect.value;
    state.language = elements.languageSelect.value;
    state.punctuationEnabled = elements.punctuationToggle.value === "enabled";
  } else if (state.currentMode === "survival") {
    state.difficulty = elements.survivalDifficulty.value;
    state.language = elements.survivalLanguage.value;
    state.maxMistakes = parseInt(elements.maxMistakes.value);
    state.survivalTime = parseInt(elements.survivalTime.value);
  }

  // Update UI
  elements.timer.textContent = state.testDuration;

  // Regenerate words with new settings
  generateWords();

  // Save preferences
  savePreferences();

  showNotification("Settings applied successfully!");
}

function toggleSound() {
  state.soundEnabled = elements.soundToggle.checked;
  savePreferences();
}

function changeSoundType() {
  state.soundType = elements.soundType.value;
  savePreferences();
}

function playKeySound() {
  if (!state.soundEnabled) return;

  // In a real implementation, this would play the actual sound
  // For this demo, we'll just log it
  console.log("Playing key sound:", state.soundType);
}

function toggleOneHandedMode() {
  state.isOneHandedMode = !state.isOneHandedMode;

  if (state.isOneHandedMode) {
    document.body.classList.add("one-handed");
    elements.oneHandedMode.textContent = "Disable One-Handed Mode";
    showNotification("One-handed mode enabled");
  } else {
    document.body.classList.remove("one-handed");
    elements.oneHandedMode.textContent = "One-Handed Mode";
    showNotification("One-handed mode disabled");
  }

  savePreferences();
}

function showKeyboardRemapModal() {
  showNotification("Keyboard remapping feature coming soon!");
  // Implementation would allow users to customize key mappings
}

// Theme Functions
function toggleTheme() {
  elements.body.classList.toggle("dark-theme");
  const isDark = elements.body.classList.contains("dark-theme");
  elements.themeToggle.textContent = isDark ? "☀️" : "🌙";

  // Save preference
  localStorage.setItem("typemaster-theme", isDark ? "dark" : "light");
}

function loadPreferences() {
  // Load theme
  const savedTheme = localStorage.getItem("typemaster-theme");
  if (savedTheme === "dark") {
    elements.body.classList.add("dark-theme");
    elements.themeToggle.textContent = "☀️";
  }

  // Load sound preferences
  const soundEnabled = localStorage.getItem("typemaster-sound-enabled");
  if (soundEnabled !== null) {
    state.soundEnabled = soundEnabled === "true";
    elements.soundToggle.checked = state.soundEnabled;
  }

  const soundType = localStorage.getItem("typemaster-sound-type");
  if (soundType) {
    state.soundType = soundType;
    elements.soundType.value = state.soundType;
  }

  // Load other preferences
  const savedDuration = localStorage.getItem("typemaster-duration");
  if (savedDuration) {
    state.testDuration = parseInt(savedDuration);
    elements.timeSelect.value = savedDuration;
    elements.timer.textContent = savedDuration;
  }
}

function savePreferences() {
  localStorage.setItem(
    "typemaster-theme",
    elements.body.classList.contains("dark-theme") ? "dark" : "light"
  );
  localStorage.setItem("typemaster-sound-enabled", state.soundEnabled);
  localStorage.setItem("typemaster-sound-type", state.soundType);
  localStorage.setItem("typemaster-duration", state.testDuration.toString());

  // Save to Firebase if logged in
  if (state.isLoggedIn) {
    db.collection("users")
      .doc(state.user.uid)
      .update({
        preferences: {
          theme: elements.body.classList.contains("dark-theme")
            ? "dark"
            : "light",
          soundEnabled: state.soundEnabled,
          soundType: state.soundType,
          duration: state.testDuration,
        },
      });
  }
}

function applyUserPreferences() {
  if (!state.userData || !state.userData.preferences) return;

  const prefs = state.userData.preferences;

  if (prefs.theme === "dark") {
    elements.body.classList.add("dark-theme");
    elements.themeToggle.textContent = "☀️";
  }

  if (prefs.soundEnabled !== undefined) {
    state.soundEnabled = prefs.soundEnabled;
    elements.soundToggle.checked = state.soundEnabled;
  }

  if (prefs.soundType) {
    state.soundType = prefs.soundType;
    elements.soundType.value = state.soundType;
  }

  if (prefs.duration) {
    state.testDuration = prefs.duration;
    elements.timeSelect.value = prefs.duration.toString();
    elements.timer.textContent = prefs.duration.toString();
  }
}

// Modal Functions
function showNotification(message) {
  elements.notificationMessage.textContent = message;
  elements.notificationModal.classList.add("active");
}

function hideNotification() {
  elements.notificationModal.classList.remove("active");
}

function showTutorial() {
  elements.tutorialModal.classList.add("active");
  state.isTutorialActive = true;
}

function hideTutorial() {
  elements.tutorialModal.classList.remove("active");
  state.isTutorialActive = false;
  localStorage.setItem("typemaster-tutorial-completed", "true");
}

function showResultsModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay active";
  modal.innerHTML = `
                <div class="modal">
                    <div class="modal-header">
                        <h2>Test Results</h2>
                        <button class="modal-close-btn">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="results-grid">
                            <div class="result-item">
                                <span class="result-label">Words Per Minute:</span>
                                <span class="result-value">${elements.wpm.textContent}</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Accuracy:</span>
                                <span class="result-value">${elements.accuracy.textContent}</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Keystrokes:</span>
                                <span class="result-value">${elements.keystrokes.textContent}</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Errors:</span>
                                <span class="result-value">${elements.errors.textContent}</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Test Duration:</span>
                                <span class="result-value">${state.testDuration} seconds</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Difficulty:</span>
                                <span class="result-value">${state.difficulty}</span>
                            </div>
                        </div>
                        <div style="margin-top: 1rem;">
                            <p>${elements.analysisContent.textContent}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-btn secondary" id="retry-test">Retry Test</button>
                        <button class="modal-btn" id="new-test">New Test</button>
                        <button class="modal-btn secondary" id="share-results-modal">Share Results</button>
                    </div>
                </div>
            `;

  document.body.appendChild(modal);

  // Add event listeners
  modal.querySelector(".modal-close-btn").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#retry-test").addEventListener("click", () => {
    document.body.removeChild(modal);
    resetTest();
  });

  modal.querySelector("#new-test").addEventListener("click", () => {
    document.body.removeChild(modal);
    resetTest();
  });

  modal.querySelector("#share-results-modal").addEventListener("click", () => {
    shareResults();
  });
}

function showPrivacyPolicy() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay active";
  modal.innerHTML = `
                <div class="modal">
                    <div class="modal-header">
                        <h2>Privacy Policy</h2>
                        <button class="modal-close-btn">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>TypeMaster values your privacy. We only collect data necessary to provide our typing test services and improve your experience.</p>
                        <h3>Data We Collect</h3>
                        <ul>
                            <li>Typing test results (WPM, accuracy, errors)</li>
                            <li>User preferences and settings</li>
                            <li>Account information (if you create an account)</li>
                        </ul>
                        <h3>How We Use Your Data</h3>
                        <ul>
                            <li>To provide personalized typing feedback</li>
                            <li>To track your progress over time</li>
                            <li>To improve our services</li>
                        </ul>
                        <p>We never sell your personal data to third parties.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-btn" id="close-privacy">Close</button>
                    </div>
                </div>
            `;

  document.body.appendChild(modal);

  modal.querySelector(".modal-close-btn").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#close-privacy").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
}

// Community Features
function generateAchievements() {
  // Real achievements based on user performance
  const achievements = [
    {
      id: "first_test",
      name: "First Test",
      icon: "🏁",
      description: "Complete your first typing test",
      unlocked: state.wpmHistory.length > 0,
    },
    {
      id: "speed_50",
      name: "Speed Demon",
      icon: "⚡",
      description: "Reach 50 WPM",
      unlocked: Math.max(...state.wpmHistory) >= 50,
    },
    {
      id: "accuracy_95",
      name: "Precision",
      icon: "🎯",
      description: "Achieve 95% accuracy",
      unlocked: Math.max(...state.accuracyHistory) >= 95,
    },
    {
      id: "marathon",
      name: "Marathon",
      icon: "🏃",
      description: "Complete a 5-minute test",
      unlocked: state.testDuration >= 300,
    },
    {
      id: "perfection",
      name: "Perfectionist",
      icon: "⭐",
      description: "100% accuracy on a 60-second test",
      unlocked:
        Math.max(...state.accuracyHistory) === 100 && state.testDuration >= 60,
    },
  ];

  elements.achievementsList.innerHTML = "";

  achievements.forEach((achievement) => {
    const achievementElement = document.createElement("div");
    achievementElement.className = `achievement ${
      achievement.unlocked ? "" : "locked"
    }`;
    achievementElement.innerHTML = `
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-name">${achievement.name}</div>
                `;

    achievementElement.title = achievement.description;
    elements.achievementsList.appendChild(achievementElement);
  });
}

function shareResults() {
  const wpm = elements.wpm.textContent;
  const accuracy = elements.accuracy.textContent;

  const shareText = `I just typed ${wpm} WPM with ${accuracy} accuracy on TypeMaster! Try to beat my score.`;

  if (navigator.share) {
    navigator.share({
      title: "My TypeMaster Results",
      text: shareText,
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        showNotification("Results copied to clipboard!");
      })
      .catch(() => {
        // Final fallback: show text
        prompt("Copy your results:", shareText);
      });
  }
}

// AI Features
function generateAISuggestions() {
  // Real AI suggestions based on user performance
  const suggestions = [];

  if (state.wpmHistory.length > 0) {
    const avgWPM =
      state.wpmHistory.reduce((a, b) => a + b, 0) / state.wpmHistory.length;
    const avgAccuracy =
      state.accuracyHistory.reduce((a, b) => a + b, 0) /
      state.accuracyHistory.length;

    if (avgWPM < 30) {
      suggestions.push({
        text: "Practice with shorter words to build confidence",
        focus: "confidence",
      });
    }

    if (avgAccuracy < 90) {
      suggestions.push({
        text: "Slow down and focus on accuracy before speed",
        focus: "accuracy",
      });
    }

    if (state.errorAnalysis.length > 0) {
      const commonError = state.errorAnalysis[0];
      suggestions.push({
        text: `Practice words with "${commonError.correct}" pattern`,
        focus: "pattern",
      });
    }
  } else {
    suggestions.push({
      text: "Complete your first test to get personalized suggestions",
      focus: "first",
    });
  }

  elements.aiSuggestions.innerHTML = "";

  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("div");
    suggestionElement.className = "ai-suggestion";
    suggestionElement.textContent = suggestion.text;
    suggestionElement.dataset.focus = suggestion.focus;

    elements.aiSuggestions.appendChild(suggestionElement);
  });
}

function generatePredictionChallenge() {
  // Real prediction challenge text
  const predictionTexts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
    "Machine learning is a method of data analysis that automates analytical model building.",
  ];

  const randomText =
    predictionTexts[Math.floor(Math.random() * predictionTexts.length)];
  elements.predictionText.textContent = randomText;
}

function startAIPractice() {
  // Switch to timed mode for practice
  switchToMode("timed");

  // Set practice-specific settings
  state.testDuration = 60;
  state.difficulty = "easy";

  // Update UI to reflect practice settings
  elements.timeSelect.value = "60";
  elements.difficultySelect.value = "easy";
  elements.timer.textContent = "60";

  // Generate words for practice
  generateWords();

  // Reset and start test
  resetTest();

  // Focus on input to start
  setTimeout(() => {
    elements.typingInput.focus();
    startTest();
  }, 100);

  showNotification("AI Practice session started! Focus on accuracy.");
}

// Add this function near the other utility functions
function switchToMode(mode) {
  // Update active button
  elements.gameModeBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.mode === mode) {
      btn.classList.add("active");
    }
  });

  // Update active settings panel
  elements.modeSettings.forEach((panel) => {
    panel.classList.remove("active");
  });
  document.getElementById(`${mode}-settings`).classList.add("active");

  // Update state
  state.currentMode = mode;
}

function startPredictionChallenge() {
  // Switch to timed mode for challenge
  switchToMode("timed");

  // Set challenge-specific settings
  state.testDuration = 60;
  state.difficulty = "medium";
  state.punctuationEnabled = true;

  // Update UI to reflect challenge settings
  elements.timeSelect.value = "60";
  elements.difficultySelect.value = "medium";
  elements.punctuationToggle.value = "enabled";
  elements.timer.textContent = "60";

  // Generate words for challenge (with punctuation)
  generateWords();

  // Reset and start test
  resetTest();

  // Focus on input to start
  setTimeout(() => {
    elements.typingInput.focus();
    startTest();
  }, 100);

  showNotification("Prediction Challenge started! Type the text above.");
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
