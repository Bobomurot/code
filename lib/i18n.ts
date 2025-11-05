export const LANGUAGES = {
  uz: { name: "O'zbekcha", flag: "🇺🇿" },
  ru: { name: "Русский", flag: "🇷🇺" },
  en: { name: "English", flag: "🇬🇧" },
} as const

export type Language = keyof typeof LANGUAGES

export const defaultLanguage: Language = "en"

export const translations = {
  uz: {
    // Navigation
    home: "Bosh sahifa",
    courses: "Kurslar",
    tests: "Testlar",
    community: "Forum",
    profile: "Profil",
    logout: "Chiqish",

    // Home
    welcome: "AI o'rganing, endilikda",
    subtitle:
      "Sun'iy intellekt, Machine Learning va Data Science asoslari bilan tanishib, o'z bilimingizni sinab ko'ring",
    getStarted: "Boshlash",
    featured: "Eng sof",

    // General
    myProfile: "Mening profilim",
    myResults: "Natijalarim",
    certificates: "Sertifikatlar",
    achievements: "Yutuqlari",
    score: "Natija",
  },
  ru: {
    // Navigation
    home: "Главная",
    courses: "Курсы",
    tests: "Тесты",
    community: "Форум",
    profile: "Профиль",
    logout: "Выход",

    // Home
    welcome: "Учитесь искусственному интеллекту прямо сейчас",
    subtitle: "Ознакомьтесь с основами AI, машинного обучения и науки о данных, пройдите тесты и проверьте свои знания",
    getStarted: "Начать",
    featured: "Рекомендуемые",

    // General
    myProfile: "Мой профиль",
    myResults: "Мои результаты",
    certificates: "Сертификаты",
    achievements: "Достижения",
    score: "Результат",
  },
  en: {
    // Navigation
    home: "Home",
    courses: "Courses",
    tests: "Tests",
    community: "Community",
    profile: "Profile",
    logout: "Sign Out",

    // Home
    welcome: "Learn AI, Start Today",
    subtitle:
      "Master the fundamentals of Artificial Intelligence, Machine Learning, and Data Science. Take tests to evaluate your knowledge.",
    getStarted: "Get Started",
    featured: "Featured Courses",

    // General
    myProfile: "My Profile",
    myResults: "My Results",
    certificates: "Certificates",
    achievements: "Achievements",
    score: "Score",
  },
} as const

export function t(key: keyof (typeof translations)["en"], language: Language): string {
  return translations[language][key] || key
}
