export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
];

export const DEFAULT_CATEGORIES = [
  {
    id: "food",
    name: "Food & Dining",
    icon: "🍽️",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "groceries",
    name: "Groceries",
    icon: "🛒",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "transport",
    name: "Transport",
    icon: "🚗",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "🛍️",
    color: "from-pink-400 to-purple-500",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎬",
    color: "from-violet-400 to-purple-500",
  },
  {
    id: "bills",
    name: "Bills & Utilities",
    icon: "💡",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "health",
    name: "Health",
    icon: "🏥",
    color: "from-red-400 to-pink-500",
  },
  {
    id: "education",
    name: "Education",
    icon: "📚",
    color: "from-cyan-400 to-blue-500",
  },
];

export const ONBOARDING_FEATURES = [
  {
    title: "Smart Bill Scanning",
    description:
      "Scan receipts with your camera and let AI extract all details automatically",
    icon: "📸",
  },
  {
    title: "AI-Powered Tagging",
    description:
      "Expenses are automatically categorized using advanced machine learning",
    icon: "🤖",
  },
  {
    title: "Multi-Source Tracking",
    description:
      "Import from SMS, add manually, use voice input, or scan receipts",
    icon: "📊",
  },
  {
    title: "Works Offline",
    description:
      "Track expenses even without internet. Data syncs automatically when online",
    icon: "📱",
  },
];
