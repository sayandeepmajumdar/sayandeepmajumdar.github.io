'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Flag, Search, Shuffle, Gamepad2, ArrowRight } from 'lucide-react';
import { COUNTRIES, TOTAL_COUNTRIES_COUNT } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';
import { Country } from '@/lib/types';
import { useLearningProgress } from '@/lib/store';

export default function FlagsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [randomModalCountry, setRandomModalCountry] = useState<Country | null>(null);

  const { state, markFlagLearned } = useLearningProgress();

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((c) => {
      const matchesContinent =
        selectedContinent === 'all' || c.continent === selectedContinent;
      const matchesDifficulty =
        selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.officialName.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q);
      return matchesContinent && matchesDifficulty && matchesSearch;
    });
  }, [searchQuery, selectedContinent, selectedDifficulty]);

  const handlePickRandom = () => {
    const random = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    setRandomModalCountry(random);
    markFlagLearned(random.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold mb-2">
            <Flag className="w-3.5 h-3.5" />
            <span>Vexillology Atlas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            World Flag Explorer
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Explore national flags of sovereign nations, understand documented design symbolism, and test your recognition.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePickRandom}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors shadow-xs"
          >
            <Shuffle className="w-4 h-4 text-amber-500" />
            <span>Random Flag</span>
          </button>
          <Link
            href="/games/flag-quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play Flag Quiz</span>
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country or capital..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-rose-500"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
            <span className="text-slate-500 font-semibold">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold focus:outline-hidden"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy (Global Icons)</option>
              <option value="Medium">Medium (Regional)</option>
              <option value="Hard">Hard (Expert)</option>
            </select>
          </div>
        </div>

        {/* Continent Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setSelectedContinent('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              selectedContinent === 'all'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All ({COUNTRIES.length})
          </button>
          {CONTINENTS.filter((c) => c.id !== 'antarctica').map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedContinent(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                selectedContinent === c.id
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{c.icon}</span> {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Flags Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCountries.map((country) => {
          const isLearned = state.learnedFlagIds.includes(country.id);

          return (
            <Link
              key={country.id}
              href={`/countries/${country.id}#flag`}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/70 hover:shadow-lg transition-all flex flex-col items-center text-center group relative overflow-hidden"
            >
              {isLearned && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500" title="Flag explored" />
              )}
              <span
                className="text-6xl select-none group-hover:scale-115 transition-transform duration-200 my-2 filter drop-shadow-sm"
                role="img"
                aria-label={`Flag of ${country.name}`}
              >
                {country.flag}
              </span>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white mt-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {country.name}
              </h3>
              <span className="text-[10px] text-slate-500 mt-0.5">
                {country.continentName}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Random Flag Modal */}
      {randomModalCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-center">
            <span className="text-8xl select-none block my-2 filter drop-shadow-lg" role="img" aria-label={randomModalCountry.name}>
              {randomModalCountry.flag}
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {randomModalCountry.name}
            </h3>
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
              {randomModalCountry.continentName} • Capital: {randomModalCountry.capital}
            </p>
            <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-left leading-relaxed">
              <strong className="block text-slate-900 dark:text-white mb-1">
                Flag Symbolism:
              </strong>
              {randomModalCountry.flagDescription}
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setRandomModalCountry(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Close
              </button>
              <Link
                href={`/countries/${randomModalCountry.id}`}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
              >
                <span>Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="fixed inset-0 -z-10" onClick={() => setRandomModalCountry(null)} />
        </div>
      )}
    </div>
  );
}
