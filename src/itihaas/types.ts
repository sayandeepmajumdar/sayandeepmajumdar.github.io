export type EraId =
  | 'ancient'
  | 'medieval'
  | 'colonial'
  | 'freedom-struggle'
  | 'post-independence';

export interface EraInfo {
  id: EraId;
  slug: string;
  name: string;
  hindiName: string;
  period: string;
  shortDescription: string;
  fullDescription: string;
  accentColor: string; // e.g. '#f97316'
  accentClass: string;
  borderClass: string;
  bgGlowClass: string;
  badgeClass: string;
  textAccentClass: string;
  icon: string;
  milestoneCount: number;
}

export interface HistoricalEvent {
  id: string;
  year: number | string;
  displayDate: string;
  era: EraId;
  title: string;
  keyFigures: string[];
  narrative: string;
  whyItMatters: string;
  category: string;
  location?: string;
  image?: string;
  tags: string[];
}

export type QuizTheme = 'date' | 'figure' | 'cause-effect';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  theme: QuizTheme;
}

export interface EraQuiz {
  eraId: EraId;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}

export interface FigureTimelineFilter {
  figure: string;
  totalEvents: number;
}
