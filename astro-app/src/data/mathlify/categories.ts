import type { CalculatorCategory } from '../../types/mathlify';

export const CATEGORIES: CalculatorCategory[] = [
  {
    id: 'financial',
    name: 'Financial',
    icon: '💰',
    description: 'Mortgage, loan estimation, and amortization schedules',
    slug: 'financial'
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: '🏃',
    description: 'BMI, calorie benchmarks, age, and wellness metrics',
    slug: 'health'
  },
  {
    id: 'math',
    name: 'Math',
    icon: '📐',
    description: 'Scientific operations, time, percentage, powers, and logs',
    slug: 'math'
  },
  {
    id: 'geometry',
    name: 'Geometry',
    icon: '📐',
    description: 'Triangles, 2D areas, 3D surface areas, volume, and slopes',
    slug: 'geometry'
  },
  {
    id: 'number-theory',
    name: 'Number Theory',
    icon: '🔢',
    description: 'Factors, primes, LCM, GCF, and proportional scaling',
    slug: 'number-theory'
  },
  {
    id: 'base-conversion',
    name: 'Base Conversion',
    icon: '💻',
    description: 'Binary, hexadecimal, bitwise logic, and number systems',
    slug: 'base-conversion'
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🧪',
    description: 'Percent error, radioactive half-life decay, and physics models',
    slug: 'science'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: '📊',
    description: 'Matrix linear algebra, determinants, and precision rounding',
    slug: 'advanced'
  }
];

export function getCategoryById(id: string): CalculatorCategory | undefined {
  return CATEGORIES.find(c => c.id === id);
}
