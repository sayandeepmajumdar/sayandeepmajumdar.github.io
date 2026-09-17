'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Users,
  Coins,
  Compass,
  BookOpen,
  Scale,
  Check,
  Globe2,
} from 'lucide-react';
import { Country } from '@/lib/types';
import { useLearningProgress } from '@/lib/store';
import { formatNumber, formatArea } from '@/lib/utils';

export function CountryHeader({ country }: { country: Country }) {
  const { state, markCountryLearned } = useLearningProgress();
  const isLearned = state.learnedCountryIds.includes(country.id);

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl overflow-hidden">
      {/* Background soft ambient radial glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Flag & Identifiers */}
        <div className="flex items-start sm:items-center gap-6">
          <div className="relative">
            <span
              className="text-7xl sm:text-8xl select-none filter drop-shadow-md block"
              role="img"
              aria-label={`Flag of ${country.name}`}
            >
              {country.flag}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/continents/${country.continent}`}
                className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold hover:underline"
              >
                {country.continentName}
              </Link>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {country.subregion}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-500 font-mono">
                {country.cca2} / {country.cca3}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              {country.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-serif italic">
              {country.officialName}
            </p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 self-stretch sm:self-auto">
          <Link
            href={`/learn/${country.id}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Learn in 60s</span>
          </Link>

          <Link
            href={`/compare?c1=${country.id}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs shadow-xs transition-colors"
          >
            <Scale className="w-4 h-4 text-slate-500" />
            <span>Compare</span>
          </Link>

          <button
            onClick={() => markCountryLearned(country.id)}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs border transition-colors ${
              isLearned
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Check className={`w-4 h-4 ${isLearned ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isLearned ? 'Learned' : 'Mark Learned'}</span>
          </button>
        </div>
      </div>

      {/* Fast Facts Banner Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800">
        <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" /> Capital
          </span>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {country.capital}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-teal-600" /> Population
          </span>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {formatNumber(country.population)}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5 text-teal-600" /> Land Area
          </span>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {formatArea(country.areaKm2)}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-teal-600" /> Currency
          </span>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {country.currency.code} ({country.currency.symbol})
          </p>
        </div>
      </div>
    </div>
  );
}
