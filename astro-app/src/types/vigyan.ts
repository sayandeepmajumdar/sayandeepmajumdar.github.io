export type ScientificField =
  | 'Physics'
  | 'Biology'
  | 'Chemistry'
  | 'Medicine'
  | 'Astronomy'
  | 'Space'
  | 'Technology';

export interface FieldConfig {
  field: ScientificField;
  icon: string;
  color: string;
  badgeClass: string;
  borderClass: string;
  textClass: string;
  bgGlowClass: string;
  description: string;
}

export interface Discovery {
  id: string;
  year: number | string;
  displayYear: string;
  century: string; // e.g. "1500s", "1600s", "1700s", "1800s", "1900s", "2000s"
  name: string; // plain language discovery name
  who: string; // primary figure & brief collaborator credit
  field: ScientificField;
  explanation: string; // 2-3 sentences for general audience (ages 10-60)
  impact: string; // "Why it transformed our world" one-liner
  tags: string[];
}
