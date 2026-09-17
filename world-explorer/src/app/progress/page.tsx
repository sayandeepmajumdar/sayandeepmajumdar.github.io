'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Flag,
  Globe,
  Award,
} from 'lucide-react';
import { useLearningProgress } from '@/lib/store';
import { ACHIEVEMENTS } from '@/data/achievements';
import { COUNTRIES, TOTAL_COUNTRIES_COUNT, getCountryById } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';

export default function ProgressDashboardPage() {
  const { state, getWeakAreas, getReviewQueue, resetProgress } = useLearningProgress();
  const [activeReviewCountryId, setActiveReviewCountryId] = useState<string | null>(null);

  const weakAreas = getWeakAreas();
  const reviewQueue = getReviewQueue();

  const totalQuizzes = state.quizzesTaken;
  const accuracy =
    totalQuizzes > 0 ? Math.round((state.quizScoreSum / totalQuizzes) * 100) : 100;

  // Calculate continents explored
  const continentsExplored = new Set(
    state.learnedCountryIds
      .map((id) => getCountryById(id)?.continent)
      .filter(Boolean)
  ).size;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Learning Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Your Progress & Mastery
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Real-time tracking of countries learned, vexillology recognition, quiz accuracy, and automated spaced repetition reviews.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset your learning progress to initial state?')) {
              resetProgress();
            }
          }}
          className="text-xs text-slate-400 hover:text-rose-600 transition-colors self-start md:self-auto"
        >
          Reset anonymous progress
        </button>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Countries Learned */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Countries</span>
            <Globe className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {state.learnedCountryIds.length} <span className="text-xs font-normal text-slate-400">/ {TOTAL_COUNTRIES_COUNT}</span>
          </p>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-teal-500"
              style={{
                width: `${(state.learnedCountryIds.length / TOTAL_COUNTRIES_COUNT) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Flags Learned */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Flags</span>
            <Flag className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {state.learnedFlagIds.length} <span className="text-xs font-normal text-slate-400">/ {TOTAL_COUNTRIES_COUNT}</span>
          </p>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-rose-500"
              style={{
                width: `${(state.learnedFlagIds.length / TOTAL_COUNTRIES_COUNT) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Continents Explored */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Continents</span>
            <span className="text-base">🗺️</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {continentsExplored} <span className="text-xs font-normal text-slate-400">/ 7</span>
          </p>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(continentsExplored / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Accuracy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Accuracy</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {accuracy}%
          </p>
          <p className="text-[10px] text-slate-400">
            Across {totalQuizzes} questions
          </p>
        </div>

        {/* Streak */}
        <div className="col-span-2 md:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-900/60 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-bold uppercase tracking-wider">Streak</span>
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {state.currentStreak} <span className="text-xs font-normal text-slate-500">days</span>
          </p>
          <p className="text-[10px] text-slate-500">
            Best streak: {state.bestStreak} days
          </p>
        </div>
      </div>

      {/* Spaced Repetition & Weak Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spaced Repetition Review Queue */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Spaced Repetition Review Today
                </h2>
                <p className="text-xs text-slate-500">
                  {reviewQueue.length} {reviewQueue.length === 1 ? 'nation' : 'nations'} scheduled for memory reinforcement
                </p>
              </div>
            </div>
          </div>

          {reviewQueue.length > 0 ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {reviewQueue.map((id) => {
                  const country = getCountryById(id);
                  if (!country) return null;
                  return (
                    <Link
                      key={id}
                      href={`/learn/${country.id}`}
                      className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-teal-500 transition-colors"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-left">
                        <p className="font-bold text-xs text-slate-900 dark:text-white">{country.name}</p>
                        <p className="text-[10px] text-slate-500">Due now</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Link
                href={`/learn/${reviewQueue[0]}`}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Start Review Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                All caught up for today!
              </p>
              <p>Explore more countries or take a quiz to schedule new spaced reviews.</p>
            </div>
          )}
        </div>

        {/* Weak Areas Tracker */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Weak Areas Tracker
              </h2>
              <p className="text-xs text-slate-500">
                Countries with lower quiz recognition accuracy
              </p>
            </div>
          </div>

          {weakAreas.length > 0 ? (
            <div className="space-y-3">
              {weakAreas.map((item) => {
                const country = getCountryById(item.countryId);
                if (!country) return null;

                return (
                  <div
                    key={item.countryId}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {country.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-rose-500"
                              style={{ width: `${item.accuracy}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.accuracy}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/countries/${country.id}`}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:border-teal-500 text-teal-600 dark:text-teal-400"
                    >
                      Practice
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 space-y-2">
              <Sparkles className="w-8 h-8 text-teal-500 mx-auto" />
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                No weak areas detected!
              </p>
              <p>Keep answering quizzes to identify areas for improvement.</p>
            </div>
          )}
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Achievements & Milestones</span>
            </h2>
            <p className="text-xs text-slate-500">
              Unlock badges as you expand your global literacy.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {state.unlockedBadgeIds.length} / {ACHIEVEMENTS.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((badge) => {
            const isUnlocked =
              state.unlockedBadgeIds.includes(badge.id) || badge.isUnlocked;

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-800/80 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-500/10 text-amber-500 shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {badge.title}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
