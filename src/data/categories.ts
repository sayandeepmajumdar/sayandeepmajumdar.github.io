import { Category, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'developer',
    name: 'Developer',
    slug: 'developer',
    description: 'Formatters, validators, regex engines, database diagrammers, and dev utilities.',
    icon: 'Code2',
  },
  {
    id: 'pdf-documents',
    name: 'PDF & Documents',
    slug: 'pdf-documents',
    description: 'PDF compressors, document converters, and spreadsheet transformers.',
    icon: 'FileText',
  },
  {
    id: 'images',
    name: 'Images',
    slug: 'images',
    description: 'Image converters, SVG vector optimizers, and EXIF privacy scrubbers.',
    icon: 'Image',
  },
  {
    id: 'design',
    name: 'Design',
    slug: 'design',
    description: 'CSS shadows, palettes, animations, Mermaid diagrams, and BPMN process modelers.',
    icon: 'Palette',
  },
  {
    id: 'data',
    name: 'Data',
    slug: 'data',
    description: 'JSON ⇄ CSV, XML converters, diff checkers, and dataset parsers.',
    icon: 'Database',
  },
  {
    id: 'text',
    name: 'Text',
    slug: 'text',
    description: 'Lorem Ipsum generators, Markdown editors, and rich-text transformers.',
    icon: 'AlignLeft',
  },
  {
    id: 'security',
    name: 'Security & Privacy',
    slug: 'security',
    description: 'AES encryption, RSA key generation, Hash/HMAC, CSP headers, and password generators.',
    icon: 'Shield',
  },
  {
    id: 'business',
    name: 'Business',
    slug: 'business',
    description: 'Invoice makers, quotation proposals, payment receipts, and business card designers.',
    icon: 'Briefcase',
  },
  {
    id: 'finance',
    name: 'Finance',
    slug: 'finance',
    description: 'EMI amortization calculators, loan comparison, and mathematical formulas.',
    icon: 'Calculator',
  },
  {
    id: 'marketing',
    name: 'Marketing & SEO',
    slug: 'marketing',
    description: 'XML sitemap builders, meta tag analyzers, and web crawler assets.',
    icon: 'TrendingUp',
  },
  {
    id: 'media',
    name: 'Media',
    slug: 'media',
    description: 'Audio, video, and multimedia editing and transcoding tools.',
    icon: 'Video',
    isStub: true,
  },
  {
    id: 'productivity',
    name: 'Productivity',
    slug: 'productivity',
    description: 'Time trackers, flashcard study apps, quick note organizers, and workflow helpers.',
    icon: 'CheckSquare',
  },
];

export const CATEGORY_MAP = new Map<Category, CategoryInfo>(
  CATEGORIES.map((cat) => [cat.id, cat])
);
