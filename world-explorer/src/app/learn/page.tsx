'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight, Check, Search, Globe } from 'lucide-react';
import { COUNTRIES, TOTAL_COUNTRIES_COUNT } from '@/data/countries';
import { useLearningProgress } from '@/lib/store';

export default function LearnHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useLearningProgress();

  const filtered = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.continentName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Duolingo-Style Guided Stepper</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Learn a Country in 60 Seconds
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            A step-by-step interactive 6-step guided experience. Master geography, flags, capitals, and basic greetings one sovereign nation at a time.
          </p>
        </div>

        {/* Progress pill */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-sm">
            {state.learnedCountryIds.length}
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-900 dark:text-white">
              {state.learnedCountryIds.length} / {TOTAL_COUNTRIES_COUNT} Learned
            </p>
            <p className="text-slate-500">
              {Math.round((state.learnedCountryIds.length / TOTAL_COUNTRIES_COUNT) * 100)}% Global Mastery
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search nation to learn..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-teal-500"
        />
      </div>

      {/* Countries Grid for 60s Lessons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((country) => {
          const isLearned = state.learnedCountryIds.includes(country.id);

          return (
            <Link
              key={country.id}
              href={`/learn/${country.id}`}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              {isLearned && (
                <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <Check className="w-3 h-3 stroke-[3]" /> Learned
                </span>
              )}

              <div>
                <span className="text-5xl select-none block mb-2 group-hover:scale-110 transition-transform duration-200" role="img" aria-label={country.name}>
                  {country.flag}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {country.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {country.continentName} • Capital: {country.capital}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
                <span>Start 60s Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
