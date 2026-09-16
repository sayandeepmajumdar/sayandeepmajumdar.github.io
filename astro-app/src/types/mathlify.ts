export interface CalculatorCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  slug: string;
  count?: number;
}

export interface FAQEntity {
  question: string;
  answer: string;
}

export interface CalculatorMeta {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string;
  category: string;
  icon: string;
  scriptName: string;
  h1: string;
  pageDesc: string;
  sidebarHtml: string;
  guideHtml: string;
  faqs?: FAQEntity[];
  tags: string[];
}
