'use client';

import React, { useState } from 'react';
import { Languages, Volume2, Info } from 'lucide-react';
import { BasicPhrase, PhraseCategory } from '@/lib/types';
import { AudioButton } from '@/components/ui/AudioButton';
import { SYNTHESIZED_SPEECH_DISCLAIMER } from '@/lib/audio';

const CATEGORY_TABS: { id: PhraseCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Phrases', icon: '✨' },
  { id: 'greetings', label: 'Greetings', icon: '👋' },
  { id: 'courtesy', label: 'Courtesy', icon: '🙏' },
  { id: 'food', label: 'Food & Dining', icon: '🍜' },
  { id: 'travel', label: 'Travel & Wayfinding', icon: '🧭' },
  { id: 'numbers', label: 'Numbers', icon: '🔢' },
  { id: 'conversation', label: 'Conversation', icon: '🙂' },
];

export function PhraseList({
  phrases,
  countryName,
  languageName,
}: {
  phrases: BasicPhrase[];
  countryName: string;
  languageName: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory | 'all'>('all');

  const filtered = phrases.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Languages className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Essential Beginner Phrases
            </h2>
            <p className="text-xs text-slate-500">
              Primary language: <strong>{languageName}</strong> in {countryName}
            </p>
          </div>
        </div>

        {/* Synthesized voice disclaimer badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-teal-600" />
          <span>Browser synthesized pronunciation</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORY_TABS.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count =
            cat.id === 'all'
              ? phrases.length
              : phrases.filter((p) => p.category === cat.id).length;

          if (cat.id !== 'all' && count === 0) return null;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                isSelected
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="opacity-60 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((phrase, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-3 hover:border-teal-500/40 transition-colors"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 capitalize">
                {phrase.category}
              </span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {phrase.original}
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 italic">
                {phrase.phonetic}
              </p>
              {phrase.pronunciationHint && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                  Sounds like: &ldquo;{phrase.pronunciationHint}&rdquo;
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {phrase.english}
              </span>
              <AudioButton
                text={phrase.original}
                langCode={phrase.langCode}
                label="Pronounce"
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-400 dark:text-slate-500 italic text-center">
        * {SYNTHESIZED_SPEECH_DISCLAIMER}
      </p>
    </div>
  );
}
