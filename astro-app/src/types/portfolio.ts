export interface MetricItem {
  value: string;
  label: string;
}

export interface WorkExperience {
  title: string;
  pill: string;
  role: string;
  description: string;
  tags: string[];
}

export interface PillarItem {
  title: string;
  description: string;
}

export interface AiProjectItem {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  category: string;
  href: string;
  featured?: boolean;
}

export interface EducationItem {
  title: string;
  institution: string;
  period?: string;
  description: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}
