import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Gamepad2,
  Flag,
  MapPin,
  Brain,
  Map,
  Trophy,
  Flame,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Geography Games & Challenges | World Explorer',
  description:
    'Test your world knowledge with interactive Flag Quiz, Capital Quiz, 3D Flag Memory Matching, and Continent Sorting games.',
};

const GAMES = [
  {
    href: '/games/flag-quiz',
    title: 'National Flag Quiz',
    tagline: 'Vexillology Recognition Challenge',
    description:
      'Can you identify the nation behind the flag? Features streak counters, difficulty tiers (Easy, Medium, Hard), timer mode, and documented historical flag explanations.',
    icon: '🚩',
    color: 'from-rose-500 to-red-600',
    border: 'hover:border-rose-500',
    badge: 'Most Popular',
    stats: '195 Flags • Streaks • Explanations',
  },
  {
    href: '/games/country-quiz',
    title: 'Country & Capital Trivia',
    tagline: 'Multi-Format Geography Arena',
    description:
      'Beyond simple multiple choice: test Country → Capital, Country → Continent, Language → Country, and True/False world facts.',
    icon: '🏙️',
    color: 'from-blue-500 to-indigo-600',
    border: 'hover:border-blue-500',
    badge: 'Comprehensive',
    stats: 'Capitals • Continents • Languages',
  },
  {
    href: '/games/memory',
    title: 'Flag Memory Match',
    tagline: '3D Spatial Concentration Game',
    description:
      'Turn cards face down and flip pairs to match national flags with their sovereign country names. Smooth 3D card flips with timer and move tracker.',
    icon: '🃏',
    color: 'from-emerald-500 to-teal-600',
    border: 'hover:border-emerald-500',
    badge: 'Mind & Memory',
    stats: '3D Flips • Moves & Timer • Star Rating',
  },
  {
    href: '/games/continents',
    title: 'Continent Sorter',
    tagline: 'Tactile Continental Placement',
    description:
      'Drag or tap country cards into their corresponding continental zones across Africa, Asia, Europe, North America, South America, and Oceania.',
    icon: '🧩',
    color: 'from-purple-500 to-violet-600',
    border: 'hover:border-purple-500',
    badge: 'Interactive Placement',
    stats: 'Drag & Drop • Instant Feedback',
  },
];

export default function GamesHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Interactive Game Arcade</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Geography Games Hub
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Reinforce your geographic knowledge through interactive gameplay. Every quiz session updates your spaced repetition mastery and unlocks achievements.
          </p>
        </div>

        <Link
          href="/daily-challenge"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-bold text-xs hover:bg-amber-100 transition-colors self-start md:self-auto"
        >
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>Play Today&apos;s Challenge</span>
        </Link>
      </div>

      {/* Games Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAMES.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className={`rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${game.border} p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xs">
                  {game.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
                  {game.badge}
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {game.title}
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 my-1">
                {game.tagline}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {game.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">
                {game.stats}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-xs text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                <span>Start Game</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
