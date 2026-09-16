import type { ScientificField, FieldConfig } from '../../types/vigyan';

export const SCIENTIFIC_FIELDS: Record<ScientificField, FieldConfig> = {
  Physics: {
    field: 'Physics',
    icon: '⚛️',
    color: '#0284c7',
    badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    borderClass: 'border-sky-500/40 hover:border-sky-400',
    textClass: 'text-sky-400',
    bgGlowClass: 'shadow-sky-500/20',
    description: 'Matter, energy, motion, and the fundamental forces of the universe.',
  },
  Biology: {
    field: 'Biology',
    icon: '🧬',
    color: '#059669',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400',
    textClass: 'text-emerald-400',
    bgGlowClass: 'shadow-emerald-500/20',
    description: 'Living organisms, evolution, genetics, and ecosystems.',
  },
  Chemistry: {
    field: 'Chemistry',
    icon: '🧪',
    color: '#d97706',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    borderClass: 'border-amber-500/40 hover:border-amber-400',
    textClass: 'text-amber-400',
    bgGlowClass: 'shadow-amber-500/20',
    description: 'Elements, molecules, chemical reactions, and the building blocks of matter.',
  },
  Medicine: {
    field: 'Medicine',
    icon: '🩺',
    color: '#e11d48',
    badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    borderClass: 'border-rose-500/40 hover:border-rose-400',
    textClass: 'text-rose-400',
    bgGlowClass: 'shadow-rose-500/20',
    description: 'Human health, disease prevention, vaccines, and lifesaving treatments.',
  },
  Astronomy: {
    field: 'Astronomy',
    icon: '🔭',
    color: '#9333ea',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    borderClass: 'border-purple-500/40 hover:border-purple-400',
    textClass: 'text-purple-400',
    bgGlowClass: 'shadow-purple-500/20',
    description: 'Stars, planets, galaxies, cosmic origins, and celestial phenomena.',
  },
  Space: {
    field: 'Space',
    icon: '🚀',
    color: '#ea580c',
    badgeClass: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    borderClass: 'border-orange-500/40 hover:border-orange-400',
    textClass: 'text-orange-400',
    bgGlowClass: 'shadow-orange-500/20',
    description: 'Spacecraft missions, planetary exploration, and human voyages beyond Earth.',
  },
  Technology: {
    field: 'Technology',
    icon: '💻',
    color: '#0d9488',
    badgeClass: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    borderClass: 'border-teal-500/40 hover:border-teal-400',
    textClass: 'text-teal-400',
    bgGlowClass: 'shadow-teal-500/20',
    description: 'Computers, communications, electronics, and digital innovations.',
  },
};

export const getFieldConfig = (field: ScientificField): FieldConfig => {
  return SCIENTIFIC_FIELDS[field];
};

export const ALL_FIELDS: ScientificField[] = [
  'Physics',
  'Biology',
  'Chemistry',
  'Medicine',
  'Astronomy',
  'Space',
  'Technology',
];
