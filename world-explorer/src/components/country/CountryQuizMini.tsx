'use client';

import React, { useState } from 'react';
import { Gamepad2, CheckCircle2, XCircle, Sparkles, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Country } from '@/lib/types';
import { useLearningProgress } from '@/lib/store';

export function CountryQuizMini({ country }: { country: Country }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { markCountryLearned, recordQuizResult } = useLearningProgress();

  const question = {
    prompt: `What is the capital city of ${country.name}?`,
    options: [
      { text: country.capital, isCorrect: true },
      { text: 'Geneva', isCorrect: false },
      { text: 'Alexandria', isCorrect: false },
      { text: 'Kyoto', isCorrect: false },
    ].sort(() => 0.5 - Math.random()),
    explanation: `${country.capital} is the official capital and political center of ${country.name}.`,
  };

  const handleSelect = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = question.options[idx].isCorrect;
    if (isCorrect) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
      });
      markCountryLearned(country.id);
      recordQuizResult(country.id, true);
    } else {
      recordQuizResult(country.id, false);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Quick Mastery Check
          </h2>
        </div>
        {hasAnswered && (
          <button
            onClick={() => {
              setSelectedOption(null);
              setHasAnswered(false);
            }}
            className="text-xs text-slate-500 hover:text-teal-600 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>
        )}
      </div>

      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {question.prompt}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          let style =
            'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-teal-500 text-slate-800 dark:text-slate-200';

          if (hasAnswered) {
            if (opt.isCorrect) {
              style =
                'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
            } else if (isSelected) {
              style =
                'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 line-through';
            } else {
              style = 'opacity-40 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={hasAnswered}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${style}`}
            >
              <span>{opt.text}</span>
              {hasAnswered && opt.isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              )}
              {hasAnswered && isSelected && !opt.isCorrect && (
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 animate-in fade-in">
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
