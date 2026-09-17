'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Map,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUNTRIES } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';
import { Country, ContinentId } from '@/lib/types';
import { useLearningProgress } from '@/lib/store';
import { shuffleArray } from '@/lib/utils';

export default function ContinentGamePage() {
  const [questions, setQuestions] = useState<Country[]>(() =>
    shuffleArray(COUNTRIES).slice(0, 10)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedZone, setSelectedZone] = useState<ContinentId | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const { recordQuizResult, unlockBadge } = useLearningProgress();

  const currentCountry = questions[currentIndex];
  const activeContinents = CONTINENTS.filter((c) => c.id !== 'antarctica');

  const handlePlaceInZone = (continentId: ContinentId) => {
    if (feedback !== null || !currentCountry) return;

    setSelectedZone(continentId);
    const isCorrect = currentCountry.continent === continentId;

    if (isCorrect) {
      setFeedback('correct');
      setScore((s) => s + 1);
      recordQuizResult(currentCountry.id, true);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
      });
    } else {
      setFeedback('incorrect');
      recordQuizResult(currentCountry.id, false);
    }

    // Auto advance after 1.2s
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelectedZone(null);
        setFeedback(null);
      } else {
        setIsCompleted(true);
        if (score >= 8) {
          unlockBadge('geography_master');
        }
      }
    }, 1200);
  };

  const handleRestart = () => {
    setQuestions(shuffleArray(COUNTRIES).slice(0, 10));
    setCurrentIndex(0);
    setSelectedZone(null);
    setFeedback(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-bold mb-1">
          <Map className="w-3.5 h-3.5" />
          <span>Tactile Continental Sorting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Continent Sorting Challenge
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Drag or click a continental zone to place each nation into its correct geographic continent.
        </p>
      </div>

      {!isCompleted && currentCountry ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              Nation {currentIndex + 1} of {questions.length}
            </span>
            <span>
              Score: <strong className="text-purple-600 dark:text-purple-400">{score}</strong>
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Draggable / Selectable Country Token */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-300 dark:border-purple-800 shadow-xl text-center space-y-3">
            <span className="text-7xl sm:text-8xl select-none block filter drop-shadow-md" role="img" aria-label={currentCountry.name}>
              {currentCountry.flag}
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {currentCountry.name}
              </h2>
              <p className="text-xs text-slate-500">
                Capital: <strong>{currentCountry.capital}</strong>
              </p>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 pt-1">
              Which continent does this country belong to?
            </p>
          </div>

          {/* Continental Drop / Click Zones */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {activeContinents.map((continent) => {
              const isChosen = selectedZone === continent.id;
              const isCorrectTarget = currentCountry.continent === continent.id;

              let zoneStyle =
                'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-500 text-slate-800 dark:text-slate-200';

              if (feedback !== null) {
                if (isCorrectTarget) {
                  zoneStyle =
                    'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold scale-102';
                } else if (isChosen && !isCorrectTarget) {
                  zoneStyle =
                    'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-900 dark:text-rose-200 line-through opacity-70';
                } else {
                  zoneStyle = 'opacity-30 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={continent.id}
                  onClick={() => handlePlaceInZone(continent.id)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${zoneStyle}`}
                >
                  <span className="text-3xl">{continent.icon}</span>
                  <span className="text-xs font-bold">{continent.name}</span>
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback Banner */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold animate-in fade-in ${
                feedback === 'correct'
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 border border-rose-300'
              }`}
            >
              {feedback === 'correct' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct! {currentCountry.name} is in {currentCountry.continentName}.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Incorrect. {currentCountry.name} is in {currentCountry.continentName}.</span>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Completed Screen */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-4xl mx-auto">
            <Trophy className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Sorting Complete!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You placed <strong>{score}</strong> out of <strong>{questions.length}</strong> nations
            into their correct continents!
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <Link
              href="/games"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
            >
              Back to Games
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
