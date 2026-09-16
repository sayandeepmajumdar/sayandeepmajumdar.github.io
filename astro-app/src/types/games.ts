export interface Game {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  categories: string[];
  tags: string[];
  badges: string[];
  features: string[];
  accentColor: 'indigo' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'purple' | 'teal';
  gradient: string;
}

export interface GameCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}
