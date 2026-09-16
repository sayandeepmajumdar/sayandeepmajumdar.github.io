import type { GameCategory } from '../../types/games';

export const GAME_CATEGORIES: GameCategory[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    slug: 'beginner',
    icon: '🟢',
    description: 'Accessible, fun browser duels and puzzles with zero learning curve.',
  },
  {
    id: 'arcade',
    name: '2D Arcade',
    slug: 'arcade',
    icon: '🚀',
    description: 'Retro-inspired 2D arcade dogfights, infinite runners, and aerial navigation.',
  },
  {
    id: 'brain',
    name: 'Brain & Logic',
    slug: 'brain',
    icon: '🧠',
    description: 'Cognitive deduction, chess tactics, Sudoku grids, and pattern memory tests.',
  },
  {
    id: 'action',
    name: 'Action & Reflex',
    slug: 'action',
    icon: '⚡',
    description: 'High-speed reflex sprints, motorsport drift racing, and precision timing duels.',
  },
  {
    id: 'classic',
    name: 'Classic Duels',
    slug: 'classic',
    icon: '⚔️',
    description: 'Time-honored tabletop, parlor, and strategy games powered by WebRTC P2P.',
  },
];
