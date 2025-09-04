document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const themeToggle = document.getElementById("theme-toggle");
  const timeSelect = document.getElementById("time-select");
  const difficultySelect = document.getElementById("difficulty-select");
  const languageSelect = document.getElementById("language-select");
  const punctuationToggle = document.getElementById("punctuation-toggle");
  const timerElement = document.getElementById("timer");
  const wordsContainer = document.getElementById("words-container");
  const typingInput = document.getElementById("typing-input");
  const wpmElement = document.getElementById("wpm");
  const accuracyElement = document.getElementById("accuracy");
  const keystrokesElement = document.getElementById("keystrokes");
  const errorsElement = document.getElementById("errors");
  const analysisContent = document.getElementById("analysis-content");

  // Test state
  let testActive = false;
  let timer;
  let timeLeft;
  let words = [];
  let currentWordIndex = 0;
  let correctChars = 0;
  let totalChars = 0;
  let errors = 0;
  let startTime;
  let keystrokes = 0;
  let correctWords = 0;

  // Word lists for different languages and difficulties
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

  // Load saved preferences
  loadPreferences();

  // Event Listeners
  themeToggle.addEventListener("click", toggleTheme);
  typingInput.addEventListener("input", handleInput);
  typingInput.addEventListener("keydown", handleKeyDown);
  timeSelect.addEventListener("change", updateTime);
  difficultySelect.addEventListener("change", resetTest);
  languageSelect.addEventListener("change", resetTest);
  punctuationToggle.addEventListener("change", resetTest);

  // Initialize the test
  resetTest();

  // Functions
  function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  function loadPreferences() {
    // Load theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.textContent = "☀️";
    }

    // Load test settings
    const savedTime = localStorage.getItem("time");
    if (savedTime) {
      timeSelect.value = savedTime;
      timerElement.textContent = savedTime;
    }

    const savedDifficulty = localStorage.getItem("difficulty");
    if (savedDifficulty) difficultySelect.value = savedDifficulty;

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) languageSelect.value = savedLanguage;

    const savedPunctuation = localStorage.getItem("punctuation");
    if (savedPunctuation) punctuationToggle.value = savedPunctuation;
  }

  function savePreferences() {
    localStorage.setItem("time", timeSelect.value);
    localStorage.setItem("difficulty", difficultySelect.value);
    localStorage.setItem("language", languageSelect.value);
    localStorage.setItem("punctuation", punctuationToggle.value);
  }

  function updateTime() {
    timerElement.textContent = timeSelect.value;
    localStorage.setItem("time", timeSelect.value);
  }

  function generateWords() {
    const language = languageSelect.value;
    const difficulty = difficultySelect.value;
    // Increase word count for all difficulties
    const wordCount =
      difficulty === "easy" ? 80 : difficulty === "medium" ? 60 : 50;

    words = [];
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(
        Math.random() * wordLists[language][difficulty].length
      );
      words.push(wordLists[language][difficulty][randomIndex]);
    }

    renderWords();
  }

  function renderWords() {
    wordsContainer.innerHTML = "";
    words.forEach((word, index) => {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = word;
      wordSpan.className = "word";
      if (index === currentWordIndex) {
        wordSpan.classList.add("current");
      }
      wordsContainer.appendChild(wordSpan);
    });
  }

  function startTest() {
    if (testActive) return;

    testActive = true;
    timeLeft = parseInt(timeSelect.value);
    startTime = new Date().getTime();

    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        endTest();
      }
    }, 1000);

    typingInput.focus();
  }

  function endTest() {
    clearInterval(timer);
    testActive = false;

    // Calculate final WPM and accuracy
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000 / 60; // in minutes
    const wpm = Math.round(correctWords / timeTaken);

    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    wpmElement.textContent = wpm;
    accuracyElement.textContent = `${accuracy}%`;

    // Generate AI analysis
    generateAnalysis(wpm, accuracy);

    // Disable input for 3 seconds
    typingInput.disabled = true;
    setTimeout(() => {
      typingInput.disabled = false;
    }, 3000);
  }

  function resetTest() {
    clearInterval(timer);
    testActive = false;

    // Reset stats
    currentWordIndex = 0;
    correctChars = 0;
    totalChars = 0;
    errors = 0;
    keystrokes = 0;
    correctWords = 0;

    // Update UI
    wpmElement.textContent = "0";
    accuracyElement.textContent = "100%";
    keystrokesElement.textContent = "0";
    errorsElement.textContent = "0";
    timerElement.textContent = timeSelect.value;
    analysisContent.textContent =
      "Complete a test to get personalized feedback on your typing performance.";

    // Generate new words
    generateWords();

    // Clear input
    typingInput.value = "";

    // Save preferences
    savePreferences();
  }

  function handleInput(e) {
    if (!testActive) {
      startTest();
    }

    keystrokes++;
    keystrokesElement.textContent = keystrokes;

    const inputText = typingInput.value;
    const currentWord = words[currentWordIndex];

    // Play key sound
    playKeySound();

    // Check if space was pressed (word completed)
    if (inputText.endsWith(" ")) {
      // Check if word was typed correctly
      const typedWord = inputText.trim();
      if (typedWord === currentWord) {
        correctWords++;
      }

      // Move to next word
      typingInput.value = "";
      currentWordIndex++;

      // If we've run out of words, generate more
      if (currentWordIndex >= words.length) {
        generateWords();
      } else {
        renderWords();
      }

      return;
    }

    // Check each character
    totalChars = currentWord.length;
    let correctCount = 0;

    for (let i = 0; i < inputText.length; i++) {
      if (i < currentWord.length && inputText[i] === currentWord[i]) {
        correctCount++;
      }
    }

    correctChars = correctCount;
    errors = inputText.length - correctCount;

    // Update stats
    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    accuracyElement.textContent = `${accuracy}%`;
    errorsElement.textContent = errors;

    // Calculate WPM in real-time
    const currentTime = new Date().getTime();
    const timeTaken = (currentTime - startTime) / 1000 / 60; // in minutes
    const wpm = Math.round(
      (correctWords + correctCount / currentWord.length) / timeTaken
    );
    wpmElement.textContent = isFinite(wpm) ? wpm : 0;
  }

  function handleKeyDown(e) {
    // Tab key resets the test
    if (e.key === "Tab") {
      e.preventDefault();
      resetTest();
    }
  }

  function playKeySound() {
    // Create a simple keypress sound
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = 200;
    gainNode.gain.value = 0.01;

    oscillator.start();
    oscillator.stop(context.currentTime + 0.02);
  }

  function generateAnalysis(wpm, accuracy) {
    let analysis = "";

    if (wpm < 20) {
      analysis += `Your typing speed is ${wpm} WPM, which is below average. `;
    } else if (wpm < 40) {
      analysis += `Your typing speed is ${wpm} WPM, which is average. `;
    } else if (wpm < 60) {
      analysis += `Your typing speed is ${wpm} WPM, which is above average. `;
    } else {
      analysis += `Your typing speed is ${wpm} WPM, which is excellent! `;
    }

    if (accuracy < 80) {
      analysis += `Your accuracy is ${accuracy}%, which needs improvement. Focus on typing accurately rather than quickly. `;
    } else if (accuracy < 95) {
      analysis += `Your accuracy is ${accuracy}%, which is good but could be better. `;
    } else {
      analysis += `Your accuracy is ${accuracy}%, which is excellent! `;
    }

    if (wpm < 30 && accuracy < 90) {
      analysis +=
        "Try to focus on accuracy first. Slow down and make sure you're hitting the right keys before trying to increase your speed.";
    } else if (wpm >= 30 && accuracy < 95) {
      analysis +=
        "You have decent speed but need to work on accuracy. Consider practicing with shorter words to build muscle memory.";
    } else if (wpm < 40 && accuracy >= 95) {
      analysis +=
        "You have great accuracy! Now try to gradually increase your speed while maintaining this accuracy level.";
    } else {
      analysis +=
        "You're doing great! Keep practicing to maintain and improve your skills.";
    }

    analysisContent.textContent = analysis;
  }
});
