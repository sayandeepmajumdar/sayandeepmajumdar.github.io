'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe,
  Compass,
  Gamepad2,
  Flag,
  Languages,
  BookOpen,
  Trophy,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  MapPin,
  Scale,
} from 'lucide-react';
import { COUNTRIES, TOTAL_COUNTRIES_COUNT } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';
import { ExpressLearnWidget } from '@/components/home/ExpressLearnWidget';
import { InteractiveWorldMap } from '@/components/map/InteractiveWorldMap';
import { CountryCard } from '@/components/country/CountryCard';
import { useLearningProgress } from '@/lib/store';

export default function HomePage() {
  const { state } = useLearningProgress();

  // Featured starter countries for showcase
  const featuredCountries = COUNTRIES.slice(0, 8);

  return (
    <div className="flex flex-col w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-gradient-to-b from-teal-500/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold">
                <span className="text-lg">🌍</span>
                <span>The Interactive World Atlas & Geography Academy</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                WORLD EXPLORER
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-teal-700 dark:text-teal-300 italic">
                &ldquo;Learn the world. One country at a time.&rdquo;
              </p>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Explore countries, discover fascinating flags, learn languages, and test your
                knowledge through interactive challenges, audio pronunciation, and guided 60-second lessons.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-600/25 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>Start Exploring</span>
                </Link>
                <Link
                  href="/games/flag-quiz"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Gamepad2 className="w-4 h-4 text-amber-500" />
                  <span>Take a Quiz</span>
                </Link>
                <Link
                  href="/daily-challenge"
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-semibold text-xs"
                >
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>Daily Challenge</span>
                </Link>
              </div>

              {/* Statistics Row */}
              <div className="grid grid-cols-4 gap-2 pt-6 border-t border-slate-200 dark:border-slate-800 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {TOTAL_COUNTRIES_COUNT}
                  </p>
                  <p className="text-xs text-slate-500">countries</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">7</p>
                  <p className="text-xs text-slate-500">continents</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">100+</p>
                  <p className="text-xs text-slate-500">languages</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-black text-teal-600 dark:text-teal-400">∞</p>
                  <p className="text-xs text-slate-500">to discover</p>
                </div>
              </div>
            </div>

            {/* Right Col: 5-Second Instant Interactive Demo Widget */}
            <div className="lg:col-span-6 w-full">
              <ExpressLearnWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: INTERACTIVE WORLD MAP ================= */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Cartography & Geography
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Explore the World Map
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                Accurate Natural Earth boundaries. Zoom into continents, hover to view key stats,
                and click any country to dive into its detailed profile.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-xs transition-colors self-start md:self-auto"
            >
              <span>Full Screen Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <InteractiveWorldMap height={460} showControls={true} />
        </div>
      </section>

      {/* ================= SECTION 2: LEARN A COUNTRY ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Bite-Sized Guided Lessons
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Learn a Country in 60 Seconds
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Step-by-step interactive walk-throughs covering geography, flag symbolism, capital, and basic phrases.
              </p>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              <span>View all lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCountries.slice(0, 4).map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: EXPLORE CONTINENTS ================= */}
      <section className="py-16 bg-slate-100/60 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                The 7 Major Landmasses
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Explore the Continents
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Dive into sovereign nations, regional cultures, and geographic extremes across Earth&apos;s continents.
              </p>
            </div>
            <Link
              href="/continents"
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              <span>All 7 continents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTINENTS.slice(0, 6).map((continent) => (
              <Link
                key={continent.id}
                href={`/continents/${continent.id}`}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {continent.icon}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {continent.countriesCount} countries
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {continent.name}
                  </h3>
                  <p className="text-xs font-medium text-teal-700 dark:text-teal-400 my-1">
                    {continent.tagline}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {continent.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
                  <span>Explore {continent.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: TEST YOUR KNOWLEDGE (GAMES) ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Interactive Gamification
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Test Your World Knowledge
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Engaging quizzes, 3D memory card matching, and drag-and-drop continent sorting.
              </p>
            </div>
            <Link
              href="/games"
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              <span>Games hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Flag Quiz */}
            <Link
              href="/games/flag-quiz"
              className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/20 dark:to-slate-900 border border-rose-200 dark:border-rose-900/60 hover:shadow-xl transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xl mb-3 shadow-xs">
                🚩
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Flag Quiz
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Identify nations by their flags with streaks, difficulty levels, and answer explanations.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                <span>Play now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Country Quiz */}
            <Link
              href="/games/country-quiz"
              className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-900 border border-blue-200 dark:border-blue-900/60 hover:shadow-xl transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center text-xl mb-3 shadow-xs">
                🏙️
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Country & Capital Quiz
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Multi-format trivia spanning capitals, languages, and continents.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Play now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Memory Game */}
            <Link
              href="/games/memory"
              className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900 border border-emerald-200 dark:border-emerald-900/60 hover:shadow-xl transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl mb-3 shadow-xs">
                🃏
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Flag Memory Game
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Flip cards with 3D animations and pair national flags with their countries.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Play now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Continent Sorting */}
            <Link
              href="/games/continents"
              className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-slate-900 border border-purple-200 dark:border-purple-900/60 hover:shadow-xl transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center text-xl mb-3 shadow-xs">
                🧩
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Continent Sorter
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Drag or tap country cards into their corresponding continental zones.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                <span>Play now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: TRACK YOUR PROGRESS ================= */}
      <section className="py-16 bg-gradient-to-tr from-teal-900 via-slate-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">
                <Trophy className="w-3.5 h-3.5 text-teal-400" />
                Spaced Repetition & Progress
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">
                Master the World with Spaced Repetition
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                World Explorer remembers what you answer correctly and automatically schedules
                difficult nations for review. Strengthen weak areas, maintain streaks, and earn
                educational badges.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/progress"
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                >
                  View Your Progress Dashboard
                </Link>
                <Link
                  href="/compare"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                >
                  Compare Countries
                </Link>
              </div>
            </div>

            {/* Live Progress Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-slate-400">Current Streak</p>
                  <p className="text-2xl font-black text-amber-400 flex items-center gap-1">
                    <Flame className="w-5 h-5 fill-amber-400" />
                    {state.currentStreak} Days
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Countries Learned</p>
                  <p className="text-2xl font-black text-teal-400">
                    {state.learnedCountryIds.length} / {TOTAL_COUNTRIES_COUNT}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                  <span>Global Exploration Mastery</span>
                  <span>{Math.round((state.learnedCountryIds.length / TOTAL_COUNTRIES_COUNT) * 100)}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                    style={{
                      width: `${Math.max(
                        3,
                        (state.learnedCountryIds.length / TOTAL_COUNTRIES_COUNT) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>Anonymous browser storage</span>
                <span className="text-teal-300">Ready for user login & database</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
