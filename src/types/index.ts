export type Category =
  | 'developer'
  | 'pdf-documents'
  | 'images'
  | 'design'
  | 'data'
  | 'text'
  | 'security'
  | 'business'
  | 'finance'
  | 'marketing'
  | 'media'
  | 'productivity';

export interface CategoryInfo {
  id: Category;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isStub?: boolean;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  secondaryCategories?: Category[];
  icon: string;
  tags: string[];
  popular?: boolean;
  localProcessing: boolean; // drives whether the privacy badge shows
  badge?: string;
  componentPath?: string;
}

export interface FavoriteTool {
  id: string;
  addedAt: number;
}

export interface RecentTool {
  id: string;
  visitedAt: number;
}
