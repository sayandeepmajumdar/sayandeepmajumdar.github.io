'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flag, Info, Sparkles, Gamepad2 } from 'lucide-react';
import { Country } from '@/lib/types';
import { useLearningProgress } from '@/lib/store';

export function FlagSymbolism({ country }: { country: Country }) {
  const [activeElementIndex, setActiveElementIndex] = useState<number | null>(0);
  const { markFlagLearned } = useLearningProgress();

  const handleInspect = (idx: number) => {
    setActiveElementIndex(idx);
    markFlagLearned(country.id);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Flag className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              National Flag & Documented Symbolism
            </h2>
            <p className="text-xs text-slate-500">
              &ldquo;Why does this flag look like this?&rdquo;
            </p>
          </div>
        </div>

        <Link
          href={`/games/flag-quiz?focus=${country.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold hover:bg-rose-100 transition-colors self-start sm:self-auto"
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Quiz on this Flag</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Flag Visual Presentation */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center">
          <span
            className="text-8xl select-none filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
            role="img"
            aria-label={`Flag of ${country.name}`}
          >
            {country.flag}
          </span>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-4">
            Flag of {country.name}
          </p>
        </div>

        {/* Flag Meaning Narrative */}
        <div className="md:col-span-8 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-600" />
              Documented Design Heritage
            </p>
            <p>{country.flagDescription}</p>
          </div>

          {/* Interactive Symbolism Breakdown Elements */}
          {country.flagElements && country.flagElements.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Interactive Elements (Click to inspect)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {country.flagElements.map((elem, idx) => {
                  const isActive = activeElementIndex === idx;
                  return (
                    <button
                      key={elem.element}
                      onClick={() => handleInspect(idx)}
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-teal-50/90 dark:bg-teal-950/60 border-teal-500 text-teal-950 dark:text-teal-100 shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {elem.color && (
                          <span
                            className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600 shrink-0"
                            style={{ backgroundColor: elem.color }}
                          />
                        )}
                        <span className="font-bold text-xs">
                          {elem.element}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3">
                        {elem.meaning}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
