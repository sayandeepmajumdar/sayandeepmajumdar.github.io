'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Calendar,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DAILY_CHALLENGES } from '@/data/achievements';
import { useLearningProgress } from '@/lib/store';
import { getTodayDateString } from '@/lib/utils';

export default function DailyChallengePage() {
  const today = getTodayDateString();
  const challenge =
    DAILY_CHALLENGES.find((d) => d.date === today) || DAILY_CHALLENGES[0];

  const { state, recordDailyChallenge, unlockBadge } = useLearningProgress();
  const isAlreadyCompletedToday = state.completedDailyDates.includes(today);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(isAlreadyCompletedToday);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(
    isAlreadyCompletedToday ? true : null
  );

  const handleSelect = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const correct = challenge.question.options[idx].isCorrect;
    setIsCorrect(correct);

    if (correct) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
      recordDailyChallenge(today, true);
      unlockBadge('streak_7');
    } else {
      recordDailyChallenge(today, false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span>Daily Global Habit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Today&apos;s World Challenge
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          One curated geography question every single day. Build your daily streak and sharpen your world knowledge.
        </p>
      </div>

      {/* Streak Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-200 dark:border-amber-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Current Learning Streak
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {state.currentStreak} {state.currentStreak === 1 ? 'Day' : 'Days'}
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-500">
          <span>Best: <strong>{state.bestStreak} days</strong></span>
        </div>
      </div>

      {/* Challenge Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
            <Sparkles className="w-3.5 h-3.5" /> Today&apos;s Challenge
          </span>
          <span>{today}</span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {challenge.question.prompt}
        </h2>

        {/* Options */}
        <div className="space-y-2.5">
          {challenge.question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let btnStyle =
              'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-amber-500 text-slate-800 dark:text-slate-200';

            if (hasAnswered) {
              if (opt.isCorrect) {
                btnStyle =
                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (isSelected) {
                btnStyle =
                  'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 line-through';
              } else {
                btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
              }
            }

            return (
              <button
                key={opt.text}
                onClick={() => handleSelect(idx)}
                disabled={hasAnswered}
                className={`w-full p-4 rounded-2xl border text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  {opt.flag && <span className="text-xl">{opt.flag}</span>}
                  <span>{opt.text}</span>
                </div>
                {hasAnswered && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {hasAnswered && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Did You Know */}
        {hasAnswered && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="block text-slate-900 dark:text-white mb-1 font-bold">
                {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
              </strong>
              <p>{challenge.question.explanation}</p>
              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-teal-700 dark:text-teal-300">
                <strong>Did you know?</strong> {challenge.didYouKnow}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Link
                href="/progress"
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>View Progress Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/games"
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs"
              >
                Play More Games
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
