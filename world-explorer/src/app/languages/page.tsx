'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Languages as LangIcon, Globe, Info, ArrowRight } from 'lucide-react';
import { LANGUAGES } from '@/data/languages';
import { getCountryById } from '@/data/countries';
import { AudioButton } from '@/components/ui/AudioButton';
import { SYNTHESIZED_SPEECH_DISCLAIMER } from '@/lib/audio';

export default function LanguagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = LANGUAGES.filter((lang) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.family.toLowerCase().includes(q) ||
      lang.writingSystem.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-bold mb-2">
          <LangIcon className="w-3.5 h-3.5" />
          <span>Linguistic Geography</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          World Languages Explorer
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Discover major world languages, writing systems, official constitutional roles, and practice beginner phrases with audio pronunciation.
        </p>

        {/* Search */}
        <div className="relative max-w-md mt-6">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search language (e.g. Japanese, Portuguese, Hindi, Arabic)..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 shadow-xs"
          />
        </div>
      </div>

      {/* Language Classification Disclosure */}
      <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Linguistic Precision Note:</strong> Countries frequently have multiple official, national, or regional languages. Below, we clearly distinguish between countries where each tongue is an <strong>official constitutional language</strong> versus where it is <strong>widely spoken or recognized</strong>.
        </p>
      </div>

      {/* Languages List */}
      <div className="space-y-8">
        {filteredLanguages.map((lang) => {
          const officialCountries = lang.officialInCountryIds
            .map((id) => getCountryById(id))
            .filter(Boolean);
          const widelySpokenCountries = lang.widelySpokenInCountryIds
            .map((id) => getCountryById(id))
            .filter(Boolean);

          return (
            <div
              key={lang.id}
              id={lang.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 scroll-mt-20"
            >
              {/* Language Name & Native Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      {lang.name}
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                      {lang.nativeName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Family: <strong>{lang.family}</strong> • Approx. {lang.speakersTotalApprox} speakers worldwide
                  </p>
                </div>

                <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto font-medium">
                  Writing: {lang.writingSystem}
                </span>
              </div>

              {/* Geographic Distribution: Official vs Widely Spoken */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Official In */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 block">
                    Official / National Language In:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {officialCountries.map((c) => (
                      <Link
                        key={c!.id}
                        href={`/countries/${c!.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-teal-500 transition-colors shadow-xs"
                      >
                        <span>{c!.flag}</span>
                        <span>{c!.name}</span>
                      </Link>
                    ))}
                    {officialCountries.length === 0 && (
                      <span className="text-xs text-slate-400 italic">None officially designated</span>
                    )}
                  </div>
                </div>

                {/* Widely Spoken In */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                    Widely Spoken / Recognized Minority In:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {widelySpokenCountries.map((c) => (
                      <Link
                        key={c!.id}
                        href={`/countries/${c!.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-colors shadow-xs"
                      >
                        <span>{c!.flag}</span>
                        <span>{c!.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample Phrases & Audio */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Beginner Example Phrases:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Greeting</span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                        {lang.samplePhrases.greeting}
                      </p>
                    </div>
                    <AudioButton
                      text={lang.samplePhrases.greeting.split('-')[0].trim()}
                      label="Audio"
                      size="sm"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Gratitude</span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                        {lang.samplePhrases.thankYou}
                      </p>
                    </div>
                    <AudioButton
                      text={lang.samplePhrases.thankYou.split('-')[0].trim()}
                      label="Audio"
                      size="sm"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Farewell</span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                        {lang.samplePhrases.goodbye}
                      </p>
                    </div>
                    <AudioButton
                      text={lang.samplePhrases.goodbye.split('-')[0].trim()}
                      label="Audio"
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              {/* Fun Fact */}
              <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200">
                <p>💡 <strong>Linguistic Fact:</strong> {lang.funFact}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
