'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, MapPin, Users, Check } from 'lucide-react';
import { Country } from '@/lib/types';
import { useLearningProgress } from '@/lib/store';
import { formatNumber } from '@/lib/utils';

export function CountryCard({ country }: { country: Country }) {
  const { state } = useLearningProgress();
  const isLearned = state.learnedCountryIds.includes(country.id);

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/60 dark:hover:border-teal-500/60 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Learned Badge Indicator */}
      {isLearned && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Learned</span>
        </div>
      )}

      <div>
        {/* Top: Flag & Name */}
        <div className="flex items-center gap-3.5 mb-3">
          <span className="text-4xl select-none group-hover:scale-110 transition-transform duration-200" role="img" aria-label={country.name}>
            {country.flag}
          </span>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {country.name}
            </h3>
            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
              {country.continentName}
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 my-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3 h-3 text-teal-600" /> Capital:
            </span>
            <strong className="text-slate-800 dark:text-slate-200 font-medium">
              {country.capital}
            </strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-500">
              <Users className="w-3 h-3 text-teal-600" /> Population:
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              {formatNumber(country.population)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Language:</span>
            <span className="text-slate-700 dark:text-slate-300 truncate max-w-[130px] text-right" title={country.officialLanguages.join(', ')}>
              {country.officialLanguages[0] || country.languages[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Link
          href={`/countries/${country.id}`}
          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-semibold text-xs transition-colors"
        >
          <span>Explore</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <Link
          href={`/learn/${country.id}`}
          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
        >
          <BookOpen className="w-3 h-3 text-amber-500" />
          <span>60s Guide</span>
        </Link>
      </div>
    </div>
  );
}
