'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCountryById } from '@/data/countries';
import { AudioButton } from '@/components/ui/AudioButton';
import { useLearningProgress } from '@/lib/store';

interface ExpressDemoCountry {
  continentId: string;
  continentName: string;
  continentIcon: string;
  countryId: string;
  question: {
    prompt: string;
    options: { text: string; isCorrect: boolean }[];
    explanation: string;
  };
}

const DEMO_ITEMS: ExpressDemoCountry[] = [
  {
    continentId: 'asia',
    continentName: 'Asia',
    continentIcon: '🌏',
    countryId: 'japan',
    question: {
      prompt: 'What does the red disc on Japan\'s flag symbolize?',
      options: [
        { text: 'The Moon', isCorrect: false },
        { text: 'The Sun (Land of the Rising Sun)', isCorrect: true },
        { text: 'Mount Fuji', isCorrect: false },
        { text: 'Cherry Blossom', isCorrect: false },
      ],
      explanation: 'The red disc (Hinomaru) symbolizes the sun, referencing Japan\'s ancient moniker as the Land of the Rising Sun.',
    },
  },
  {
    continentId: 'europe',
    continentName: 'Europe',
    continentIcon: '🌍',
    countryId: 'france',
    question: {
      prompt: 'What is the capital city of France?',
      options: [
        { text: 'Marseille', isCorrect: false },
        { text: 'Lyon', isCorrect: false },
        { text: 'Paris', isCorrect: true },
        { text: 'Nice', isCorrect: false },
      ],
      explanation: 'Paris is the historic capital of France, home to the Eiffel Tower, the Louvre, and Notre-Dame.',
    },
  },
  {
    continentId: 'africa',
    continentName: 'Africa',
    continentIcon: '🌍',
    countryId: 'kenya',
    question: {
      prompt: 'Which famous wildlife spectacle takes place annually in Kenya?',
      options: [
        { text: 'The Great Wildebeest Migration', isCorrect: true },
        { text: 'Polar Bear Trek', isCorrect: false },
        { text: 'Amazon Dolphin Run', isCorrect: false },
        { text: 'Monarch Butterfly Wave', isCorrect: false },
      ],
      explanation: 'Millions of wildebeests, zebras, and gazelles cross the Mara River between the Serengeti and Kenya\'s Maasai Mara.',
    },
  },
  {
    continentId: 'south-america',
    continentName: 'Americas',
    continentIcon: '🌎',
    countryId: 'brazil',
    question: {
      prompt: 'Which official language is spoken in Brazil?',
      options: [
        { text: 'Spanish', isCorrect: false },
        { text: 'Portuguese', isCorrect: true },
        { text: 'French', isCorrect: false },
        { text: 'Italian', isCorrect: false },
      ],
      explanation: 'Brazil is the largest Portuguese-speaking country in the world, with over 215 million native speakers.',
    },
  },
];

export function ExpressLearnWidget() {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const { markCountryLearned, recordQuizResult } = useLearningProgress();

  const currentDemo = DEMO_ITEMS[selectedDemoIndex];
  const country = getCountryById(currentDemo.countryId);

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = currentDemo.question.options[idx].isCorrect;
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      markCountryLearned(currentDemo.countryId);
      recordQuizResult(currentDemo.countryId, true);
    } else {
      recordQuizResult(currentDemo.countryId, false);
    }
  };

  const handleReset = (newIndex: number) => {
    setSelectedDemoIndex(newIndex);
    setSelectedOption(null);
    setHasAnswered(false);
  };

  if (!country) return null;

  const greetingPhrase = country.basicPhrases.find((p) => p.category === 'greetings') || country.basicPhrases[0];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            5-Second Interactive Experience
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Instant Explore & Learn
          </h3>
        </div>

        {/* Step Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <span className="text-teal-600 dark:text-teal-400 font-bold">1. Continent</span>
          <span>→</span>
          <span className="text-teal-600 dark:text-teal-400 font-bold">2. Country</span>
          <span>→</span>
          <span className="text-teal-600 dark:text-teal-400 font-bold">3. Flag</span>
          <span>→</span>
          <span className="text-teal-600 dark:text-teal-400 font-bold">4. Audio</span>
          <span>→</span>
          <span className="text-amber-600 dark:text-amber-400 font-bold">5. Quiz</span>
        </div>
      </div>

      {/* Step 1: Select Continent Pill */}
      <div className="py-4">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Step 1: Choose Continent
        </label>
        <div className="flex flex-wrap gap-2">
          {DEMO_ITEMS.map((item, idx) => {
            const isSelected = idx === selectedDemoIndex;
            return (
              <button
                key={item.continentId}
                onClick={() => handleReset(idx)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{item.continentIcon}</span>
                <span>{item.continentName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Steps 2-4: Country Card preview with Flag, Capital, and Language Phrase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
        {/* Left Side: Country Overview */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-5xl select-none" role="img" aria-label={country.name}>
              {country.flag}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-black text-slate-900 dark:text-white">
                  {country.name}
                </h4>
                <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 text-[10px] font-bold">
                  {country.continentName}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Capital: <strong className="text-slate-800 dark:text-slate-200">{country.capital}</strong>
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1 mb-1">
              🚩 Flag Symbolism:
            </span>
            <p className="line-clamp-2">{country.flagDescription}</p>
          </div>

          {/* Audio Greeting Phrase */}
          {greetingPhrase && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-teal-500/10 dark:bg-teal-500/5 border border-teal-200/60 dark:border-teal-900/50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  Say Hello:
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {greetingPhrase.original} <span className="font-normal text-xs text-slate-500">({greetingPhrase.phonetic})</span>
                </p>
              </div>
              <AudioButton
                text={greetingPhrase.original}
                langCode={greetingPhrase.langCode}
                label="Listen"
                size="sm"
              />
            </div>
          )}
        </div>

        {/* Right Side: Step 5 Instant 1-Click Quiz */}
        <div className="flex flex-col justify-between space-y-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Step 5: Quick Quiz
              </span>
              {hasAnswered && (
                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setHasAnswered(false);
                  }}
                  className="text-[11px] text-slate-500 hover:text-teal-600 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              {currentDemo.question.prompt}
            </p>

            {/* Options */}
            <div className="space-y-2">
              {currentDemo.question.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                let btnStyle =
                  'border-slate-200 dark:border-slate-700 hover:border-teal-500 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200';

                if (hasAnswered) {
                  if (opt.isCorrect) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle =
                      'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 line-through';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                  }
                }

                return (
                  <button
                    key={opt.text}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={hasAnswered}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs border transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {hasAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                    {hasAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Deep Dive Link */}
          {hasAnswered && (
            <div className="pt-2 text-xs border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                {currentDemo.question.explanation}
              </p>
              <Link
                href={`/countries/${country.id}`}
                className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline text-xs"
              >
                <span>Explore full {country.name} profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
