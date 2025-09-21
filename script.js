document.addEventListener("DOMContentLoaded", function () {
  // Firebase configuration
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
    typingInput: document.getElementById("typing-input"),
    wordsContainer: document.getElementById("words-container"),
    timer: document.getElementById("timer"),
    wpm: document.getElementById("wpm"),
    accuracy: document.getElementById("accuracy"),
    keystrokes: document.getElementById("keystrokes"),
    errors: document.getElementById("errors"),
    themeToggle: document.getElementById("theme-toggle"),
    nameModal: document.getElementById("name-modal"),
    userName: document.getElementById("user-name"),
    submitName: document.getElementById("submit-name"),
    resultsModal: document.getElementById("results-modal"),
    resultName: document.getElementById("result-name"),
    resultWpm: document.getElementById("result-wpm"),
    resultRaw: document.getElementById("result-raw"),
    resultKeystrokes: document.getElementById("result-keystrokes"),
    resultMistakes: document.getElementById("result-mistakes"),
    resultAccuracy: document.getElementById("result-accuracy"),
    resultTime: document.getElementById("result-time"),
    retryTest: document.getElementById("retry-test"),
    shareResults: document.getElementById("share-results"),
    loginBtn: document.getElementById("login-btn"),
    logoutBtn: document.getElementById("logout-btn"),
    loginModal: document.getElementById("login-modal"),
    closeLogin: document.getElementById("close-login"),
    emailLogin: document.getElementById("email-login"),
    googleLogin: document.getElementById("google-login"),
    emailRegister: document.getElementById("email-register"),
    userStatus: document.getElementById("user-status"),
    userAvatar: document.getElementById("user-avatar"),
    userNameDisplay: document.getElementById("user-name-display"),
    analysisContent: document.getElementById("analysis-content"),
    heatmapContainer: document.getElementById("heatmap-container"),
    heatmapKeys: document.getElementById("heatmap-keys"),
    errorBreakdown: document.getElementById("error-breakdown"),
    errorList: document.getElementById("error-list"),
    notificationModal: document.getElementById("notification-modal"),
    notificationMessage: document.getElementById("notification-message"),
    closeNotification: document.getElementById("close-notification"),
    applySettings: document.getElementById("apply-settings"),
    timeSelect: document.getElementById("time-select"),
    customTimeGroup: document.getElementById("custom-time-group"),
    customTime: document.getElementById("custom-time"),
    difficultySelect: document.getElementById("difficulty-select"),
    languageSelect: document.getElementById("language-select"),
    punctuationToggle: document.getElementById("punctuation-toggle"),
    gameModeBtns: document.querySelectorAll(".game-mode-btn"),
    modeSettings: document.querySelectorAll(".mode-settings"),
    survivalType: document.getElementById("survival-type"),
    maxMistakesGroup: document.getElementById("max-mistakes-group"),
    survivalTimeGroup: document.getElementById("survival-time-group"),
    survivalTime: document.getElementById("survival-time"),
    maxMistakes: document.getElementById("max-mistakes"),
    survivalDifficulty: document.getElementById("survival-difficulty"),
    survivalLanguage: document.getElementById("survival-language"),
    loginForm: document.getElementById("login-form"),
    registerForm: document.getElementById("register-form"),
    formTabs: document.querySelectorAll(".form-tab"),
    loginEmail: document.getElementById("login-email"),
    loginPassword: document.getElementById("login-password"),
    loginError: document.getElementById("login-error"),
    registerName: document.getElementById("register-name"),
    registerEmail: document.getElementById("register-email"),
    registerPassword: document.getElementById("register-password"),
    confirmPassword: document.getElementById("confirm-password"),
    registerError: document.getElementById("register-error"),
    reqLength: document.getElementById("req-length"),
    reqCapital: document.getElementById("req-capital"),
    reqNumber: document.getElementById("req-number"),
    reqSpecial: document.getElementById("req-special"),
    reqMatch: document.getElementById("req-match"),
  };

  // Game state
  let state = {
    words: [],
    currentWordIndex: 0,
    startTime: null,
    timerInterval: null,
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    errors: 0,
    isTestActive: false,
    isTestComplete: false,
    currentMode: "timed",
    timeLimit: 60,
    difficulty: "easy",
    language: "english",
    punctuation: "disabled",
    keyPressTimes: [],
    keyErrors: {},
    lastTenWPM: [],
    user: null,
    heatmapData: {},
    errorData: {},
    testDuration: 0,
    wordsGenerated: 0,
    wordList: [],
    survivalMaxMistakes: 5,
    survivalTimeLimit: 5 * 60, // 5 minutes in seconds
    survivalMistakes: 0,
  };

  // Word lists
  const wordLists = {
    english: {
      easy: [
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
        "or",
        "an",
        "will",
        "my",
        "one",
        "all",
        "would",
        "there",
        "their",
        "what",
        "so",
        "up",
        "out",
        "if",
        "about",
        "who",
        "get",
        "which",
        "go",
        "me",
        "when",
        "make",
        "can",
        "like",
        "time",
        "no",
        "just",
        "him",
        "know",
        "take",
        "people",
        "into",
        "year",
        "your",
        "good",
        "some",
        "could",
        "them",
        "see",
        "other",
        "than",
        "then",
        "now",
        "look",
        "only",
        "come",
        "its",
        "over",
        "think",
        "also",
        "back",
        "after",
        "use",
        "two",
        "how",
        "our",
        "work",
        "first",
        "well",
        "way",
        "even",
        "new",
        "want",
        "because",
        "any",
        "these",
        "give",
        "day",
        "most",
        "us",
      ],
      medium: [
        "ability",
        "absence",
        "academy",
        "account",
        "accuse",
        "achieve",
        "acquire",
        "across",
        "action",
        "active",
        "actual",
        "address",
        "adjust",
        "admit",
        "advance",
        "advice",
        "affect",
        "afford",
        "afraid",
        "after",
        "again",
        "against",
        "agency",
        "agent",
        "agree",
        "ahead",
        "allow",
        "almost",
        "alone",
        "along",
        "already",
        "also",
        "although",
        "always",
        "among",
        "amount",
        "analysis",
        "analyze",
        "animal",
        "announce",
        "annual",
        "another",
        "answer",
        "anxious",
        "anyone",
        "anything",
        "appear",
        "apply",
        "appoint",
        "approach",
        "approve",
        "argue",
        "around",
        "arrange",
        "arrive",
        "article",
        "artist",
        "assume",
        "attack",
        "attend",
        "attention",
        "attitude",
        "attract",
        "audience",
        "author",
        "average",
        "avoid",
        "award",
        "aware",
        "beautiful",
        "because",
        "become",
        "before",
        "begin",
        "behavior",
        "behind",
        "believe",
        "benefit",
        "better",
        "between",
        "beyond",
        "board",
        "bottle",
        "bottom",
        "breathe",
        "bridge",
        "bright",
        "bring",
        "brother",
        "budget",
        "build",
        "business",
        "button",
      ],
      hard: [
        "abandonment",
        "abbreviation",
        "abomination",
        "aboriginal",
        "accommodate",
        "accompaniment",
        "accomplishment",
        "accountability",
        "acknowledgment",
        "adaptation",
        "administrative",
        "advertisement",
        "aforementioned",
        "aggregation",
        "allegation",
        "alliteration",
        "amphitheater",
        "annihilation",
        "anticipation",
        "apprehension",
        "appropriation",
        "architecture",
        "articulation",
        "assassination",
        "assessment",
        "astonishment",
        "asymmetrical",
        "atmosphere",
        "authentication",
        "authorization",
        "automatically",
        "availability",
        "battleground",
        "beneficiary",
        "biodiversity",
        "biographical",
        "breakthrough",
        "breathtaking",
        "bureaucracy",
        "capitulation",
        "catastrophe",
        "celebration",
        "certificate",
        "characteristic",
        "circumference",
        "collaboration",
        "commemorate",
        "commencement",
        "communication",
        "compatibility",
        "compensation",
        "competition",
        "complication",
        "complimentary",
        "comprehension",
        "compromise",
        "concentration",
        "conceptualize",
        "condemnation",
        "conditioning",
        "confederation",
        "confidential",
        "confirmation",
        "conglomerate",
        "congratulate",
        "conscientious",
        "consciousness",
        "consequence",
        "conservation",
        "considerable",
        "consistency",
        "consolidate",
        "conspicuous",
        "constitution",
        "contamination",
        "contemporary",
        "contradiction",
        "controversial",
        "convenience",
        "cooperation",
        "coordination",
        "corporation",
        "correspondent",
        "counterattack",
        "craftsmanship",
        "credibility",
        "crystallization",
        "demonstration",
        "deprivation",
        "derivative",
        "description",
        "designation",
        "destruction",
        "detrimental",
        "development",
        "devastation",
        "differentiate",
        "disappearance",
        "disappointment",
        "disastrous",
        "disciplinary",
        "discrimination",
        "dissatisfaction",
        "distinction",
        "distinguished",
        "distribution",
        "diversification",
        "documentation",
      ],
    },
    bangla: {
      easy: [
        "আমি",
        "তুমি",
        "সে",
        "আমরা",
        "তোমরা",
        "তারা",
        "এটি",
        "ওটি",
        "কি",
        "কেন",
        "কোথায়",
        "কখন",
        "কেমন",
        "হ্যাঁ",
        "না",
        "এক",
        "দুই",
        "তিন",
        "চার",
        "পাঁচ",
        "ছয়",
        "সাত",
        "আট",
        "নয়",
        "দশ",
        "বড়",
        "ছোট",
        "ভাল",
        "খারাপ",
        "সুন্দর",
        "কুৎসিত",
        "গরম",
        "ঠান্ডা",
        "নতুন",
        "পুরানো",
        "সাদা",
        "কালো",
        "লাল",
        "নীল",
        "সবুজ",
        "খুব",
        "অল্প",
        "বেশি",
        "কম",
        "প্রথম",
        "শেষ",
        "উপর",
        "নিচ",
        "ভিতর",
        "বাহির",
        "ডানে",
        "বামে",
        "সামনে",
        "পিছনে",
        "এখানে",
        "ওখানে",
        "সেখানে",
        "কে",
        "কাকে",
        "কার",
        "কোণের",
        "জন্য",
        "সঙ্গে",
        "বিনা",
        "বিপরীত",
        "সম্পর্ক",
        "হতে",
        "হয়েছে",
        "হচ্ছে",
        "হবে",
        "যায়",
        "এল",
        "খেলে",
        "দেখে",
        "শোনে",
        "বলে",
        "নেয়",
        "দেয়",
        "পড়ে",
        "লিখে",
        "চলে",
        "বসে",
        "দাঁড়ায়",
        "ঘুমায়",
        "জাগে",
        "কাঁদে",
        "হাসে",
        "চিন্তা",
        "করে",
        "বানায়",
        "ভাঙ্গে",
        "আছে",
        "নেই",
        "পাওয়া",
        "যাওয়া",
        "আসা",
        "খাওয়া",
        "দেখা",
        "শোনা",
        "বলা",
      ],
      medium: [
        "অভিজ্ঞতা",
        "অবস্থান",
        "অংশগ্রহণ",
        "আকর্ষণীয়",
        "আনন্দদায়ক",
        "উন্নয়ন",
        "উপলব্ধি",
        "উপস্থিত",
        "উত্তেজনাপূর্ণ",
        "কর্মপরিচালক",
        "কষ্টসাধ্য",
        "গবেষণা",
        "চমকপ্রদ",
        "চ্যালেঞ্জিং",
        "জটিলতা",
        "জ্ঞানার্জন",
        "দক্ষতা",
        "দায়িত্বশীল",
        "দূরদর্শিতা",
        "ধারণা",
        "নিরাপত্তা",
        "নিয়ন্ত্রণ",
        "পরিচালনা",
        "পরিচ্ছন্ন",
        "প্রতিযোগিতা",
        "প্রতিষ্ঠান",
        "প্রভাবশালী",
        "বিবরণ",
        "বিশ্লেষণ",
        "বৈচিত্র্য",
        "ভালোবাসা",
        "মহানগর",
        "যোগাযোগ",
        "রহস্যময়",
        "শিক্ষণীয়",
        "সম্ভাবনা",
        "সৃষ্টিশীল",
        "স্বাধীনতা",
        "অধিকার",
        "অভিযান",
        "অর্থনীতি",
        "আবিষ্কার",
        "উদ্ভাবনী",
        "কম্পিউটার",
        "গবেষক",
        "চিকিৎসা",
        "জ্যোতির্বিদ্যা",
        "প্রযুক্তি",
        "বিজ্ঞান",
        "ভূগোল",
        "মহাকাশ",
        "রসায়ন",
        "শিল্পকলা",
        "সাহিত্য",
        "সাংবাদিকতা",
        "অভিনয়",
        "সংগীত",
        "ক্রীড়া",
        "পরিবেশ",
        "প্রকৃতি",
        "পরিভাষা",
        "ব্যাকরণ",
        "বানান",
        "উচ্চারণ",
        "অনুবাদ",
        "সংস্কৃতি",
        "পরম্পরা",
        "উৎসব",
        "ঐতিহ্য",
        "ধর্ম",
        "দর্শন",
        "মনোবিজ্ঞান",
        "সমাজ",
        "রাজনীতি",
        "আইন",
        "বিচার",
        "শান্তি",
        "যুদ্ধ",
        "স্বাস্থ্য",
        "শিক্ষা",
        "ব্যবসা",
        "বাণিজ্য",
        "শিল্প",
        "কৃষি",
        "পরিবহন",
        "যোগাযোগ",
        "মিডিয়া",
        "ইন্টারনেট",
        "সফটওয়্যার",
        "হার্ডওয়্যার",
        "নেটওয়ার크",
        "ডেটাবেজ",
        "প্রোগ্রামিং",
        "অ্যালগরিদম",
      ],
      hard: [
        "অসাধারণতা",
        "আন্তর্জাতিকতা",
        "উদারচরিত্র",
        "কৃত্রিমবুদ্ধিমত্তা",
        "গুণগতমান",
        "জটিলতার",
        "দক্ষতাসম্পন্ন",
        "ধারণাপ্রসূত",
        "পরমাণুবিদ্যা",
        "প্রতিসাম্যবিধান",
        "বিবর্তনবাদ",
        "ভাষাতাত্ত্বিক",
        "মহাজাগতিক",
        "যান্ত্রিকীকরণ",
        "শ্রেণীবিন্যাস",
        "সংবেদনশীলতা",
        "সাংস্কৃতিক",
        "সামাজিকতা",
        "সুষমাবন্টন",
        "স্বচ্ছন্দ্যবোধ",
        "অবিচ্ছেদ্যতা",
        "অসামঞ্জস্যতা",
        "আবেগপ্রবণতা",
        "উদ্বেগউৎকণ্ঠা",
        "কর্মকৌশল",
        "গাণিতিক",
        "চিত্তবিনোদন",
        "জ্যামিতিক",
        "দার্শনিক",
        "ধারণাগত",
        "পরীক্ষামূলক",
        "প্রকৌশলী",
        "বৈজ্ঞানিক",
        "ভাষাগত",
        "মনস্তাত্ত্বিক",
        "যৌক্তিক",
        "শৈল্পিক",
        "সৃজনশীল",
        "সামঞ্জস্যবিধান",
        "স্বতন্ত্রতা",
        "অভিযোজিত",
        "আনুপাতিক",
        "উপযোগিতা",
        "গঠনমূলক",
        "চালনাকৌশল",
        "জটিলমস্তিষ্ক",
        "তথ্যপ্রযুক্তি",
        "দক্ষতাভিত্তিক",
        "ধারাবাহিকতা",
        "পরিমার্জিত",
        "প্রতিযোগিতামূলক",
        "বিবর্তনশীল",
        "ভাষাগত দক্ষতা",
        "মৌলিকত্ব",
        "যুক্তিনির্ভর",
        "শৃঙ্খলাবদ্ধ",
        "সংগঠিত",
        "সমন্বয়সাধন",
        "স্বয়ংক্রিয়",
        "অভিজাত",
        "আধিপত্য",
        "উন্নতিশীল",
        "গবেষণামূলক",
        "চ্যালেঞ্জিং",
        "জটিল সমস্যা",
        "তাত্ত্বিক",
        "দক্ষিণামূলক",
        "ধারণা প্রসার",
        "পরিকল্পিত",
        "প্রগতিশীল",
        "বহুমুখী",
        "ভবিষ্যৎমুখী",
        "মৌলিক গবেষণা",
        "যুক্তিযুক্ত",
        "শৈল্পিক অভিব্যক্তি",
        "সংরক্ষণশীল",
        "সমন্বয়বাদী",
        "স্বতন্ত্রচিন্তা",
        "অদম্য",
        "আবিষ্কারমূলক",
        "উদ্ভাবনী",
        "গঠনাত্মক",
        "চিন্তাশীল",
        "জ্ঞানভিত্তিক",
        "তথ্যবহুল",
        "দূরদর্শী",
        "ধারাবাহিক",
        "পরীক্ষিত",
        "প্রয়োগমূলক",
        "বিশ্লেষণাত্মক",
        "ভাষাগত জ্ঞান",
        "মৌলিক অধিকার",
        "যৌক্তিকতা",
        "শিক্ষামূলক",
        "সংগঠনাত্মক",
        "সমন্বয়ী",
        "স্বাধীনচেতা",
      ],
    },
  };

  // Initialize the application
  function init() {
    loadSettings();
    setupEventListeners();
    generateWords();
    checkAuthState();
    updateUI();
  }

  // Load settings from localStorage
  function loadSettings() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      elements.themeToggle.textContent = "☀️";
    }

    const savedTime = localStorage.getItem("timeLimit");
    if (savedTime) {
      elements.timeSelect.value = savedTime;
      state.timeLimit = parseInt(savedTime);
      elements.timer.textContent = savedTime;
    }

    const savedDifficulty = localStorage.getItem("difficulty");
    if (savedDifficulty) {
      elements.difficultySelect.value = savedDifficulty;
      state.difficulty = savedDifficulty;
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      elements.languageSelect.value = savedLanguage;
      state.language = savedLanguage;
    }

    const savedPunctuation = localStorage.getItem("punctuation");
    if (savedPunctuation) {
      elements.punctuationToggle.value = savedPunctuation;
      state.punctuation = savedPunctuation;
    }

    if (elements.timeSelect.value === "custom") {
      elements.customTimeGroup.style.display = "block";
      const savedCustomTime = localStorage.getItem("customTime");
      if (savedCustomTime) {
        elements.customTime.value = savedCustomTime;
        state.timeLimit = parseInt(savedCustomTime);
        elements.timer.textContent = savedCustomTime;
      }
    }

    // Survival mode settings
    const savedSurvivalType = localStorage.getItem("survivalType");
    if (savedSurvivalType) {
      elements.survivalType.value = savedSurvivalType;
      updateSurvivalUI();
    }

    const savedMaxMistakes = localStorage.getItem("maxMistakes");
    if (savedMaxMistakes) {
      elements.maxMistakes.value = savedMaxMistakes;
      state.survivalMaxMistakes = parseInt(savedMaxMistakes);
    }

    const savedSurvivalTime = localStorage.getItem("survivalTime");
    if (savedSurvivalTime) {
      elements.survivalTime.value = savedSurvivalTime;
      state.survivalTimeLimit = parseInt(savedSurvivalTime) * 60;
    }

    const savedSurvivalDifficulty = localStorage.getItem("survivalDifficulty");
    if (savedSurvivalDifficulty) {
      elements.survivalDifficulty.value = savedSurvivalDifficulty;
    }

    const savedSurvivalLanguage = localStorage.getItem("survivalLanguage");
    if (savedSurvivalLanguage) {
      elements.survivalLanguage.value = savedSurvivalLanguage;
    }
  }

  function closeResultsModal() {
    elements.resultsModal.classList.remove("active");
  }

  // Set up event listeners
  function setupEventListeners() {
    // Theme toggle
    document
      .getElementById("close-results")
      .addEventListener("click", closeResultsModal);
    elements.themeToggle.addEventListener("click", toggleTheme);

    // Typing input events
    elements.typingInput.addEventListener("input", handleTyping);
    elements.typingInput.addEventListener("blur", handleInputBlur);
    elements.typingInput.addEventListener("focus", handleInputFocus);
    elements.typingInput.addEventListener("keydown", handleKeyDown);

    // Reset test button
    document.getElementById("reset-test").addEventListener("click", resetTest);

    // Modal buttons
    elements.submitName.addEventListener("click", saveResults);
    elements.retryTest.addEventListener("click", retryTest);
    elements.shareResults.addEventListener("click", shareResults);
    elements.closeNotification.addEventListener(
      "click",
      closeNotificationModal
    );

    // Auth buttons
    elements.loginBtn.addEventListener("click", showLoginModal);
    elements.logoutBtn.addEventListener("click", handleLogout);
    elements.closeLogin.addEventListener("click", closeLoginModal);

    // Auth form events
    elements.emailLogin.addEventListener("click", handleEmailLogin);
    elements.googleLogin.addEventListener("click", handleGoogleLogin);
    elements.emailRegister.addEventListener("click", handleEmailRegister);

    // Form tabs
    elements.formTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabName = tab.getAttribute("data-tab");
        switchAuthTab(tabName);
      });
    });

    // Password validation
    elements.registerPassword.addEventListener("input", validatePassword);
    elements.confirmPassword.addEventListener("input", validatePassword);

    // Settings
    elements.applySettings.addEventListener("click", applySettings);

    // Time select change
    elements.timeSelect.addEventListener("change", function () {
      if (this.value === "custom") {
        elements.customTimeGroup.style.display = "block";
      } else {
        elements.customTimeGroup.style.display = "none";
        state.timeLimit = parseInt(this.value);
        elements.timer.textContent = this.value;
        localStorage.setItem("timeLimit", this.value);
      }
    });

    // Game mode switching
    elements.gameModeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        elements.gameModeBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const mode = this.getAttribute("data-mode");
        state.currentMode = mode;

        elements.modeSettings.forEach((setting) => {
          setting.classList.remove("active");
        });

        document.getElementById(`${mode}-settings`).classList.add("active");
      });
    });

    // Survival type change
    elements.survivalType.addEventListener("change", updateSurvivalUI);

    // Custom time input
    elements.customTime.addEventListener("change", function () {
      state.timeLimit = parseInt(this.value);
      elements.timer.textContent = this.value;
      localStorage.setItem("customTime", this.value);
    });
  }

  // Update survival UI based on type selection
  function updateSurvivalUI() {
    const survivalType = elements.survivalType.value;
    if (survivalType === "mistakes") {
      elements.maxMistakesGroup.style.display = "block";
      elements.survivalTimeGroup.style.display = "none";
    } else {
      elements.maxMistakesGroup.style.display = "none";
      elements.survivalTimeGroup.style.display = "block";
    }
  }

  // Apply settings
  function applySettings() {
    if (state.currentMode === "timed") {
      state.difficulty = elements.difficultySelect.value;
      state.language = elements.languageSelect.value;
      state.punctuation = elements.punctuationToggle.value;

      localStorage.setItem("difficulty", state.difficulty);
      localStorage.setItem("language", state.language);
      localStorage.setItem("punctuation", state.punctuation);

      if (elements.timeSelect.value === "custom") {
        state.timeLimit = parseInt(elements.customTime.value);
        localStorage.setItem("customTime", elements.customTime.value);
      } else {
        state.timeLimit = parseInt(elements.timeSelect.value);
        localStorage.setItem("timeLimit", elements.timeSelect.value);
      }

      elements.timer.textContent = state.timeLimit;
    } else {
      // Survival mode settings
      const survivalType = elements.survivalType.value;
      localStorage.setItem("survivalType", survivalType);

      if (survivalType === "mistakes") {
        state.survivalMaxMistakes = parseInt(elements.maxMistakes.value);
        localStorage.setItem("maxMistakes", elements.maxMistakes.value);
      } else {
        state.survivalTimeLimit = parseInt(elements.survivalTime.value) * 60;
        localStorage.setItem("survivalTime", elements.survivalTime.value);
      }

      localStorage.setItem(
        "survivalDifficulty",
        elements.survivalDifficulty.value
      );
      localStorage.setItem("survivalLanguage", elements.survivalLanguage.value);
    }

    generateWords();
    showNotification("Settings applied successfully!");
  }

  // Handle input blur
  function handleInputBlur() {
    // Remove focus but don't prevent user from clicking back in
  }

  // Handle input focus
  function handleInputFocus() {
    // Only start timer if test is active but not started (first keystroke)
    if (state.isTestActive && !state.startTime) {
      // Timer will start on first keystroke, not on focus
    }
  }

  // Handle key down events
  function handleKeyDown(e) {
    // Prevent tab from changing focus
    if (e.key === "Tab") {
      e.preventDefault();
    }

    // Record key press time for heatmap
    if (state.isTestActive && state.startTime) {
      state.keyPressTimes.push({
        key: e.key,
        time: Date.now() - state.startTime,
        correct: true, // Will be updated in handleTyping if wrong
      });
    }
  }

  // Handle typing input
  function handleTyping(e) {
    const input = e.target.value;
    const currentWord = state.words[state.currentWordIndex];

    // Start the test on first keystroke
    if (!state.isTestActive) {
      state.isTestActive = true;
    }

    // Start timer on first keystroke, not when test becomes active
    if (!state.startTime) {
      state.startTime = Date.now();
      if (state.currentMode === "timed") {
        startTimer();
      } else if (state.currentMode === "survival") {
        startSurvivalTimer();
      }
    }

    // Check if space was pressed (completion of a word)
    if (input.endsWith(" ")) {
      // Remove the space and check the word
      const typedWord = input.trim();

      if (typedWord === currentWord.text) {
        // Correct word
        currentWord.element.classList.add("correct");
        state.correctKeystrokes += typedWord.length + 1; // +1 for space
      } else {
        // Incorrect word
        currentWord.element.classList.add("incorrect");
        state.errors++;

        // Track error data for AI analysis
        const errorKey = `${currentWord.text}->${typedWord}`;
        state.errorData[errorKey] = (state.errorData[errorKey] || 0) + 1;
      }

      // Move to next word
      state.currentWordIndex++;
      e.target.value = "";

      // Update word highlighting
      highlightCurrentWord();

      // Check if we need more words
      if (state.currentWordIndex >= state.words.length - 5) {
        addMoreWords();
      }

      // For survival mode, check mistakes limit
      if (
        state.currentMode === "survival" &&
        elements.survivalType.value === "mistakes"
      ) {
        if (state.errors >= state.survivalMaxMistakes) {
          endTest();
          return;
        }
      }
    } else {
      // Check current character
      const currentCharIndex = input.length;
      const wordElement = currentWord.element;
      const charElements = wordElement.querySelectorAll("span");

      // Reset all character classes
      charElements.forEach((char, index) => {
        char.className = "";
        if (index < currentCharIndex) {
          if (input[index] === currentWord.text[index]) {
            char.classList.add("correct");
          } else {
            char.classList.add("incorrect");
          }
        }
      });

      // Update keystroke count
      state.totalKeystrokes = state.correctKeystrokes + state.errors;

      // Update stats
      updateStats();
    }
  }

  // Generate words for typing test
  function generateWords() {
    state.words = [];
    state.currentWordIndex = 0;
    state.wordsGenerated = 0;
    state.wordList = [];

    elements.wordsContainer.innerHTML = "";

    const mode = state.currentMode;
    const difficulty =
      mode === "timed" ? state.difficulty : elements.survivalDifficulty.value;
    const language =
      mode === "timed" ? state.language : elements.survivalLanguage.value;

    // Get the appropriate word list
    const wordList = wordLists[language][difficulty];

    // Generate 40 words to start with
    for (let i = 0; i < 40; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      const word = wordList[randomIndex];
      state.wordList.push(word);

      const wordElement = document.createElement("div");
      wordElement.className = "word";

      // Add each character as a span
      for (let j = 0; j < word.length; j++) {
        const charSpan = document.createElement("span");
        charSpan.textContent = word[j];
        wordElement.appendChild(charSpan);
      }

      elements.wordsContainer.appendChild(wordElement);
      state.words.push({ text: word, element: wordElement });
      state.wordsGenerated++;
    }

    // Highlight the first word
    highlightCurrentWord();
  }

  // Add more words when needed
  function addMoreWords() {
    const difficulty =
      state.currentMode === "timed"
        ? state.difficulty
        : elements.survivalDifficulty.value;
    const language =
      state.currentMode === "timed"
        ? state.language
        : elements.survivalLanguage.value;
    const wordList = wordLists[language][difficulty];

    // Add 20 more words
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      const word = wordList[randomIndex];
      state.wordList.push(word);

      const wordElement = document.createElement("div");
      wordElement.className = "word";

      // Add each character as a span
      for (let j = 0; j < word.length; j++) {
        const charSpan = document.createElement("span");
        charSpan.textContent = word[j];
        wordElement.appendChild(charSpan);
      }

      elements.wordsContainer.appendChild(wordElement);
      state.words.push({ text: word, element: wordElement });
      state.wordsGenerated++;
    }
  }

  // Highlight the current word
  function highlightCurrentWord() {
    state.words.forEach((word, index) => {
      if (index === state.currentWordIndex) {
        word.element.classList.add("current");
      } else {
        word.element.classList.remove("current");
      }
    });
  }

  // Start the timer for timed mode
  function startTimer() {
    clearInterval(state.timerInterval);

    let timeLeft = state.timeLimit;
    elements.timer.textContent = timeLeft;

    state.timerInterval = setInterval(() => {
      timeLeft--;
      elements.timer.textContent = timeLeft;

      if (timeLeft <= 0) {
        endTest();
      }
    }, 1000);
  }

  // Start the timer for survival mode
  function startSurvivalTimer() {
    clearInterval(state.timerInterval);

    let timeLeft = state.survivalTimeLimit;
    elements.timer.textContent = formatTime(timeLeft);

    state.timerInterval = setInterval(() => {
      timeLeft--;
      elements.timer.textContent = formatTime(timeLeft);

      if (timeLeft <= 0) {
        endTest();
      }
    }, 1000);
  }

  // Format time in MM:SS format
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // Update statistics
  function updateStats() {
    if (!state.startTime) return;

    const elapsedTime = (Date.now() - state.startTime) / 1000 / 60; // in minutes
    const wordsTyped = state.currentWordIndex;
    const wpm = Math.round(wordsTyped / elapsedTime) || 0;
    const accuracy =
      state.totalKeystrokes > 0
        ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100)
        : 100;

    elements.wpm.textContent = wpm;
    elements.accuracy.textContent = `${accuracy}%`;
    elements.keystrokes.textContent = state.totalKeystrokes;
    elements.errors.textContent = state.errors;

    // Store last 10 WPM values for AI analysis
    if (wpm > 0) {
      state.lastTenWPM.push(wpm);
      if (state.lastTenWPM.length > 10) {
        state.lastTenWPM.shift();
      }
    }
  }

  // End the test
  function endTest() {
    clearInterval(state.timerInterval);
    state.isTestActive = false;
    state.isTestComplete = true;

    const endTime = Date.now();
    state.testDuration = (endTime - state.startTime) / 1000;

    elements.typingInput.disabled = true;

    // Calculate final stats
    const elapsedMinutes = state.testDuration / 60;
    const wordsTyped = state.currentWordIndex;
    const wpm = Math.round(wordsTyped / elapsedMinutes) || 0;
    const rawWpm = Math.round(state.totalKeystrokes / 5 / elapsedMinutes) || 0;
    const accuracy =
      state.totalKeystrokes > 0
        ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100)
        : 100;

    // Show results
    if (state.user) {
      showResultsModal(
        wpm,
        rawWpm,
        state.totalKeystrokes,
        state.errors,
        accuracy,
        state.testDuration
      );
    } else {
      showNameModal(
        wpm,
        rawWpm,
        state.totalKeystrokes,
        state.errors,
        accuracy,
        state.testDuration
      );
    }

    // Generate AI analysis
    generateAIAnalysis(wpm, accuracy);
  }

  // Reset the test
  function resetTest() {
    clearInterval(state.timerInterval);

    state.startTime = null;
    state.currentWordIndex = 0;
    state.totalKeystrokes = 0;
    state.correctKeystrokes = 0;
    state.errors = 0;
    state.isTestActive = false;
    state.isTestComplete = false;
    state.keyPressTimes = [];
    state.keyErrors = {};
    state.lastTenWPM = [];
    state.testDuration = 0;

    elements.typingInput.value = "";
    elements.typingInput.disabled = false;

    // Reset timer display based on mode
    if (state.currentMode === "timed") {
      elements.timer.textContent = state.timeLimit;
    } else {
      elements.timer.textContent = formatTime(state.survivalTimeLimit);
    }

    elements.wpm.textContent = "0";
    elements.accuracy.textContent = "100%";
    elements.keystrokes.textContent = "0";
    elements.errors.textContent = "0";

    generateWords();

    // Don't focus automatically, let user click to focus
  }

  // Show name input modal
  function showNameModal(
    wpm,
    rawWpm,
    keystrokes,
    mistakes,
    accuracy,
    duration
  ) {
    elements.nameModal.classList.add("active");
  }

  // Show results modal
  function showResultsModal(
    wpm,
    rawWpm,
    keystrokes,
    mistakes,
    accuracy,
    duration
  ) {
    elements.resultName.textContent = state.user.displayName || "User";
    elements.resultWpm.textContent = wpm;
    elements.resultRaw.textContent = rawWpm;
    elements.resultKeystrokes.textContent = keystrokes;
    elements.resultMistakes.textContent = mistakes;
    elements.resultAccuracy.textContent = `${accuracy}%`;
    elements.resultTime.textContent = `${Math.round(duration)}s`;

    elements.resultsModal.classList.add("active");

    // Show confetti for good performance
    if (wpm > 40) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }

  // Save results to Firebase
  function saveResults() {
    const userName = elements.userName.value.trim();
    if (!userName) {
      showNotification("Please enter your name to save results.");
      return;
    }

    const elapsedMinutes = state.testDuration / 60;
    const wordsTyped = state.currentWordIndex;
    const wpm = Math.round(wordsTyped / elapsedMinutes) || 0;
    const rawWpm = Math.round(state.totalKeystrokes / 5 / elapsedMinutes) || 0;
    const accuracy =
      state.totalKeystrokes > 0
        ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100)
        : 100;

    // Save to Firestore
    db.collection("results")
      .add({
        name: userName,
        wpm: wpm,
        rawWpm: rawWpm,
        accuracy: accuracy,
        keystrokes: state.totalKeystrokes,
        mistakes: state.errors,
        duration: Math.round(state.testDuration),
        mode: state.currentMode,
        difficulty: state.difficulty,
        language: state.language,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        elements.nameModal.classList.remove("active");
        showResultsModal(
          wpm,
          rawWpm,
          state.totalKeystrokes,
          state.errors,
          accuracy,
          state.testDuration
        );
      })
      .catch((error) => {
        console.error("Error saving results: ", error);
        showNotification("Error saving results. Please try again.");
      });
  }

  // Retry test
  function retryTest() {
    elements.resultsModal.classList.remove("active");
    resetTest();
  }

  // Share results
  function shareResults() {
    const resultText = `I just scored ${elements.resultWpm.textContent} WPM with ${elements.resultAccuracy.textContent} accuracy on TypeMaster! Try to beat me: ${window.location.href}`;

    if (navigator.share) {
      navigator
        .share({
          title: "TypeMaster Typing Test Results",
          text: resultText,
          url: window.location.href,
        })
        .catch((error) => {
          console.log("Sharing failed", error);
          copyToClipboard(resultText);
        });
    } else {
      copyToClipboard(resultText);
    }
  }

  // Copy text to clipboard
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Results copied to clipboard!");
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showNotification("Results copied to clipboard!");
      });
  }

  // Generate AI analysis
  function generateAIAnalysis(wpm, accuracy) {
    let analysis = "";

    // WPM analysis
    if (wpm < 20) {
      analysis +=
        "Your typing speed is beginner level. Practice regularly to improve.";
    } else if (wpm < 40) {
      analysis +=
        "You're at an intermediate typing speed. Keep practicing to reach advanced levels.";
    } else if (wpm < 60) {
      analysis += "Good typing speed! You're faster than most typists.";
    } else if (wpm < 80) {
      analysis +=
        "Excellent typing speed! You're in the top percentile of typists.";
    } else {
      analysis += "Outstanding typing speed! You're among the fastest typists.";
    }

    analysis += " ";

    // Accuracy analysis
    if (accuracy < 80) {
      analysis +=
        "Your accuracy needs improvement. Focus on typing correctly rather than quickly.";
    } else if (accuracy < 90) {
      analysis += "Your accuracy is decent, but there's room for improvement.";
    } else if (accuracy < 95) {
      analysis +=
        "Good accuracy! You maintain a solid balance between speed and precision.";
    } else if (accuracy < 98) {
      analysis +=
        "Excellent accuracy! You make very few mistakes while typing.";
    } else {
      analysis += "Perfect accuracy! Your precision is remarkable.";
    }

    analysis += " ";

    // Consistency analysis (if we have enough WPM data)
    if (state.lastTenWPM.length >= 5) {
      const minWpm = Math.min(...state.lastTenWPM);
      const maxWpm = Math.max(...state.lastTenWPM);
      const consistency = (minWpm / maxWpm) * 100;

      if (consistency < 70) {
        analysis +=
          "Your typing speed is inconsistent. Try to maintain a steady pace.";
      } else if (consistency < 85) {
        analysis +=
          "Your typing speed is fairly consistent. With practice, you can make it even steadier.";
      } else {
        analysis +=
          "Your typing speed is very consistent. Great job maintaining a steady pace!";
      }
    }

    // Error pattern analysis
    const commonErrors = Object.entries(state.errorData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    if (commonErrors.length > 0) {
      analysis += " Common errors: ";
      commonErrors.forEach(([error, count], index) => {
        const [correct, typed] = error.split("->");
        analysis += `"${correct}" instead of "${typed}" (${count}x)`;
        if (index < commonErrors.length - 1) {
          analysis += ", ";
        }
      });
      analysis += ".";
    }

    elements.analysisContent.textContent = analysis;

    // Generate heatmap if we have key press data
    if (state.keyPressTimes.length > 0) {
      generateHeatmap();
      elements.heatmapContainer.style.display = "block";
    }

    // Generate error breakdown if we have errors
    if (Object.keys(state.errorData).length > 0) {
      generateErrorBreakdown();
      elements.errorBreakdown.style.display = "block";
    }
  }

  // Generate keyboard heatmap
  function generateHeatmap() {
    // Simplified keyboard layout
    const layout = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"],
    ];

    // Count key presses
    const keyCounts = {};
    state.keyPressTimes.forEach((press) => {
      const key = press.key.toLowerCase();
      if (key.length === 1 && key.match(/[a-z0-9]/i)) {
        keyCounts[key] = (keyCounts[key] || 0) + 1;
      }
    });

    // Find max count for normalization
    const maxCount = Math.max(...Object.values(keyCounts), 1);

    // Generate heatmap
    elements.heatmapKeys.innerHTML = "";

    layout.forEach((row) => {
      const rowElement = document.createElement("div");
      rowElement.className = "heatmap-row";

      row.forEach((key) => {
        const keyElement = document.createElement("div");
        keyElement.className = "heatmap-key";
        keyElement.textContent = key;

        const count = keyCounts[key] || 0;
        const intensity = Math.floor((count / maxCount) * 100);

        if (intensity > 0) {
          keyElement.style.backgroundColor = `hsl(217, 71%, ${
            100 - intensity
          }%)`;
          keyElement.title = `${count} presses`;
        }

        rowElement.appendChild(keyElement);
      });

      elements.heatmapKeys.appendChild(rowElement);
    });
  }

  // Generate error breakdown
  function generateErrorBreakdown() {
    elements.errorList.innerHTML = "";

    const sortedErrors = Object.entries(state.errorData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    sortedErrors.forEach(([error, count]) => {
      const [correct, typed] = error.split("->");

      const errorItem = document.createElement("div");
      errorItem.className = "error-item";

      errorItem.innerHTML = `
        <span class="error-correct">"${correct}"</span>
        <span class="error-arrow">→</span>
        <span class="error-typed">"${typed}"</span>
        <span class="error-count">(${count}x)</span>
      `;

      elements.errorList.appendChild(errorItem);
    });
  }

  // Toggle theme
  function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
      elements.themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      elements.themeToggle.textContent = "🌙";
    }
  }

  // Show notification
  function showNotification(message) {
    elements.notificationMessage.textContent = message;
    elements.notificationModal.classList.add("active");
  }

  // Close notification modal
  function closeNotificationModal() {
    elements.notificationModal.classList.remove("active");
  }

  // Show login modal
  function showLoginModal() {
    elements.loginModal.classList.add("active");
  }

  // Close login modal
  function closeLoginModal() {
    elements.loginModal.classList.remove("active");
  }

  // Switch auth tab
  function switchAuthTab(tabName) {
    elements.formTabs.forEach((tab) => {
      if (tab.getAttribute("data-tab") === tabName) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    if (tabName === "login") {
      elements.loginForm.style.display = "block";
      elements.registerForm.style.display = "none";
    } else {
      elements.loginForm.style.display = "none";
      elements.registerForm.style.display = "block";
    }
  }

  // Handle email login
  function handleEmailLogin() {
    const email = elements.loginEmail.value;
    const password = elements.loginPassword.value;

    if (!email || !password) {
      elements.loginError.textContent = "Please enter both email and password.";
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        closeLoginModal();
        showNotification("Logged in successfully!");
      })
      .catch((error) => {
        elements.loginError.textContent = error.message;
      });
  }

  // Handle Google login
  function handleGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth
      .signInWithPopup(provider)
      .then((result) => {
        closeLoginModal();
        showNotification("Logged in with Google successfully!");
      })
      .catch((error) => {
        elements.loginError.textContent = error.message;
      });
  }

  // Handle email registration
  function handleEmailRegister() {
    const name = elements.registerName.value;
    const email = elements.registerEmail.value;
    const password = elements.registerPassword.value;
    const confirmPassword = elements.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
      elements.registerError.textContent = "Please fill in all fields.";
      return;
    }

    if (password !== confirmPassword) {
      elements.registerError.textContent = "Passwords do not match.";
      return;
    }

    if (!validatePasswordStrength(password)) {
      elements.registerError.textContent =
        "Password does not meet requirements.";
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Update profile with name
        return userCredential.user.updateProfile({
          displayName: name,
        });
      })
      .then(() => {
        closeLoginModal();
        showNotification("Account created successfully!");
      })
      .catch((error) => {
        elements.registerError.textContent = error.message;
      });
  }

  // Validate password strength
  function validatePasswordStrength(password) {
    const hasMinLength = password.length >= 8;
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasMinLength && hasCapital && hasNumber && hasSpecial;
  }

  // Validate password (real-time feedback)
  function validatePassword() {
    const password = elements.registerPassword.value;
    const confirmPassword = elements.confirmPassword.value;

    // Check length
    if (password.length >= 8) {
      elements.reqLength.classList.add("requirement-met");
      elements.reqLength.classList.remove("requirement-not-met");
    } else {
      elements.reqLength.classList.remove("requirement-met");
      elements.reqLength.classList.add("requirement-not-met");
    }

    // Check capital letter
    if (/[A-Z]/.test(password)) {
      elements.reqCapital.classList.add("requirement-met");
      elements.reqCapital.classList.remove("requirement-not-met");
    } else {
      elements.reqCapital.classList.remove("requirement-met");
      elements.reqCapital.classList.add("requirement-not-met");
    }

    // Check number
    if (/[0-9]/.test(password)) {
      elements.reqNumber.classList.add("requirement-met");
      elements.reqNumber.classList.remove("requirement-not-met");
    } else {
      elements.reqNumber.classList.remove("requirement-met");
      elements.reqNumber.classList.add("requirement-not-met");
    }

    // Check special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      elements.reqSpecial.classList.add("requirement-met");
      elements.reqSpecial.classList.remove("requirement-not-met");
    } else {
      elements.reqSpecial.classList.remove("requirement-met");
      elements.reqSpecial.classList.add("requirement-not-met");
    }

    // Check match
    if (password && password === confirmPassword) {
      elements.reqMatch.classList.add("requirement-met");
      elements.reqMatch.classList.remove("requirement-not-met");
    } else {
      elements.reqMatch.classList.remove("requirement-met");
      elements.reqMatch.classList.add("requirement-not-met");
    }
  }

  // Handle logout
  function handleLogout() {
    auth
      .signOut()
      .then(() => {
        showNotification("Logged out successfully!");
      })
      .catch((error) => {
        showNotification("Error logging out. Please try again.");
      });
  }

  // Check authentication state
  function checkAuthState() {
    auth.onAuthStateChanged((user) => {
      state.user = user;
      updateUI();
    });
  }

  // Update UI based on auth state
  function updateUI() {
    if (state.user) {
      // User is signed in
      elements.loginBtn.style.display = "none";
      elements.logoutBtn.style.display = "block";
      elements.userNameDisplay.textContent = state.user.displayName || "User";

      // Set avatar (first letter of name or email)
      const name = state.user.displayName || state.user.email;
      elements.userAvatar.textContent = name.charAt(0).toUpperCase();
    } else {
      // User is signed out
      elements.loginBtn.style.display = "block";
      elements.logoutBtn.style.display = "none";
      elements.userNameDisplay.textContent = "Guest";
      elements.userAvatar.textContent = "?";
    }
  }

  // Initialize the app
  init();
});
