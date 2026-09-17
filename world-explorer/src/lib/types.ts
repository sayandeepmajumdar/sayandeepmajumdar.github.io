export type ContinentId =
  | 'africa'
  | 'asia'
  | 'europe'
  | 'north-america'
  | 'south-america'
  | 'oceania'
  | 'antarctica';

export interface FlagElementSymbolism {
  element: string; // e.g., "Red Circle (Hinomaru)" or "Green Field"
  meaning: string; // e.g., "Represents the sun and warmth"
  color?: string;  // e.g., "#BC002D"
}

export type PhraseCategory =
  | 'greetings'
  | 'courtesy'
  | 'food'
  | 'travel'
  | 'numbers'
  | 'conversation';

export interface BasicPhrase {
  category: PhraseCategory;
  english: string;
  original: string;
  phonetic: string;
  pronunciationHint?: string;
  langCode?: string; // BCP 47 code for speech synthesis, e.g. "ja-JP", "es-ES"
}

export interface Country {
  id: string; // url slug e.g. "japan"
  name: string; // "Japan"
  officialName: string; // "State of Japan"
  cca2: string; // "JP"
  cca3: string; // "JPN"
  numericCode: string; // "392" (for topojson atlas mapping)
  flag: string; // emoji "🇯🇵"
  flagSvgUrl?: string; // fallback SVG or high-res flag
  continent: ContinentId;
  continentName: string; // "Asia"
  subregion: string; // "Eastern Asia"
  capital: string; // "Tokyo"
  population: number; // 125000000
  areaKm2: number; // 377975
  coordinates: [number, number]; // [lat, lng]
  languages: string[]; // all widely spoken or recognized
  officialLanguages: string[]; // strictly official
  currency: {
    code: string; // "JPY"
    name: string; // "Japanese Yen"
    symbol: string; // "¥"
  };
  flagDescription: string;
  flagElements: FlagElementSymbolism[];
  basicPhrases: BasicPhrase[];
  facts: string[];
  landmarks: string[];
  famousFor: string[];
  borderCountryIds: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Continent {
  id: ContinentId;
  name: string;
  tagline: string;
  description: string;
  countriesCount: number;
  population: number;
  areaKm2: number;
  icon: string;
  color: string; // Tailwind color token or hex
  accentBg: string;
  highestPoint: {
    name: string;
    elevationM: number;
    country: string;
  };
  lowestPoint: {
    name: string;
    elevationM: number;
    country: string;
  };
  highlights: string[];
  primaryLanguages: string[];
}

export interface Language {
  id: string; // "japanese"
  name: string; // "Japanese"
  nativeName: string; // "日本語"
  family: string; // "Japonic"
  writingSystem: string; // "Kanji, Hiragana, Katakana"
  officialInCountryIds: string[];
  widelySpokenInCountryIds: string[];
  speakersTotalApprox: string; // "125 million"
  funFact: string;
  samplePhrases: {
    greeting: string;
    thankYou: string;
    goodbye: string;
  };
}

export type QuizQuestionType =
  | 'flag-to-country'
  | 'country-to-flag'
  | 'country-to-capital'
  | 'capital-to-country'
  | 'country-to-continent'
  | 'country-to-language'
  | 'true-false'
  | 'matching';

export interface QuizOption {
  text: string;
  flag?: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: string;
  flag?: string;
  countryId?: string;
  options: QuizOption[];
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'flags' | 'capitals' | 'geography' | 'languages' | 'culture';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'exploration' | 'quiz' | 'streak' | 'mastery';
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface DailyChallengeItem {
  date: string; // YYYY-MM-DD
  question: QuizQuestion;
  didYouKnow: string;
}

export interface SpacedRepetitionRecord {
  countryId: string;
  correctCount: number;
  incorrectCount: number;
  lastTested: number; // timestamp
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: number; // timestamp
}

export interface UserProgressState {
  learnedCountryIds: string[];
  learnedFlagIds: string[];
  quizzesTaken: number;
  quizScoreSum: number;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  unlockedBadgeIds: string[];
  completedDailyDates: string[];
  spacedRepetition: Record<string, SpacedRepetitionRecord>;
}
