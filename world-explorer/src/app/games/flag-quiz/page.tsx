'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Flag,
  CheckCircle2,
  XCircle,
  Flame,
  Timer,
  Trophy,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUNTRIES } from '@/data/countries';
import { Country } from '@/lib/types';
import { useLearningProgress } from '@/lib/store';
import { shuffleArray } from '@/lib/utils';

interface QuestionState {
  targetCountry: Country;
  options: Country[];
}

export default function FlagQuizPage() {
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [useTimer, setUseTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameActive, setIsGameActive] = useState(true);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const { recordQuizResult, markFlagLearned, unlockBadge } = useLearningProgress();

  const totalQuestions = 10;

  // Filter pool by difficulty
  const countryPool = useMemo(() => {
    return COUNTRIES.filter((c) => c.difficulty === difficulty);
  }, [difficulty]);

  // Generate question deck
  const [deck, setDeck] = useState<QuestionState[]>([]);

  const generateDeck = (pool: Country[]) => {
    const shuffledPool = shuffleArray(pool);
    const selected = shuffledPool.slice(0, totalQuestions);

    return selected.map((target) => {
      // Pick 3 distractors
      const distractors = shuffleArray(
        COUNTRIES.filter((c) => c.id !== target.id)
      ).slice(0, 3);
      const options = shuffleArray([target, ...distractors]);
      return { targetCountry: target, options };
    });
  };

  useEffect(() => {
    const newDeck = generateDeck(countryPool.length > 5 ? countryPool : COUNTRIES);
    setDeck(newDeck);
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswerId(null);
    setIsAnswerSubmitted(false);
    setIsGameActive(true);
  }, [difficulty, countryPool]);

  const currentQuestion = deck[questionIndex];

  const handleSelectAnswer = React.useCallback(
    (selectedId: string) => {
      if (isAnswerSubmitted || !currentQuestion) return;

      setSelectedAnswerId(selectedId);
      setIsAnswerSubmitted(true);

      const isCorrect = selectedId === currentQuestion.targetCountry.id;

      if (isCorrect) {
        setScore((s) => s + 1);
        const newStreak = streak + 1;
        setStreak(newStreak);
        setBestStreak((b) => Math.max(b, newStreak));

        markFlagLearned(currentQuestion.targetCountry.id);
        recordQuizResult(currentQuestion.targetCountry.id, true);

        if (newStreak >= 3) {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.7 },
          });
        }

        if (newStreak >= 5) {
          unlockBadge('flag_master');
        }
      } else {
        setStreak(0);
        recordQuizResult(currentQuestion.targetCountry.id, false);
      }
    },
    [
      isAnswerSubmitted,
      currentQuestion,
      streak,
      markFlagLearned,
      recordQuizResult,
      unlockBadge,
    ]
  );

  // Timer tick
  useEffect(() => {
    if (!useTimer || isAnswerSubmitted || !isGameActive || deck.length === 0) return;

    if (timeLeft <= 0) {
      // Time up! Submit incorrect
      handleSelectAnswer('TIMEOUT');
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [useTimer, timeLeft, isAnswerSubmitted, isGameActive, deck, handleSelectAnswer]);

  const handleNextQuestion = () => {
    if (questionIndex + 1 < deck.length) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswerId(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(15);
    } else {
      setIsGameActive(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    const newDeck = generateDeck(countryPool.length > 5 ? countryPool : COUNTRIES);
    setDeck(newDeck);
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswerId(null);
    setIsAnswerSubmitted(false);
    setIsGameActive(true);
    setTimeLeft(15);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold mb-1">
            <Flag className="w-3.5 h-3.5" />
            <span>National Flag Quiz</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Identify the Flag
          </h1>
        </div>

        {/* Configuration Toolbar */}
        <div className="flex items-center gap-3">
          {/* Difficulty selector */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
            disabled={isAnswerSubmitted}
            className="py-1.5 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="Easy">Easy (Global Icons)</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard (Vexillology Pro)</option>
          </select>

          {/* Timer Toggle */}
          <button
            type="button"
            onClick={() => setUseTimer(!useTimer)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              useTimer
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>15s Timer</span>
          </button>
        </div>
      </div>

      {isGameActive && currentQuestion ? (
        <div className="space-y-6">
          {/* Progress & Stat Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Question {questionIndex + 1} of {totalQuestions}
              </span>
              <div className="w-32 sm:w-48 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all duration-300"
                  style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-300">
                Score: <strong className="text-teal-600 dark:text-teal-400">{score}</strong>
              </span>

              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{streak} streak</span>
              </span>

              {useTimer && (
                <span
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ${
                    timeLeft <= 5
                      ? 'bg-rose-100 text-rose-700 font-black animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>{timeLeft}s</span>
                </span>
              )}
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Which country does this flag belong to?
            </span>

            {/* Huge Flag */}
            <div className="py-2">
              <span
                className="text-8xl select-none inline-block filter drop-shadow-lg hover:scale-105 transition-transform duration-200"
                role="img"
                aria-label="National Flag Challenge"
              >
                {currentQuestion.targetCountry.flag}
              </span>
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswerId === option.id;
                const isCorrect = option.id === currentQuestion.targetCountry.id;

                let btnStyle =
                  'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-teal-500 text-slate-800 dark:text-slate-200';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle =
                      'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 line-through';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                  }
                }

                const optionLetter = String.fromCharCode(65 + idx);

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(option.id)}
                    disabled={isAnswerSubmitted}
                    className={`p-4 rounded-2xl border text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                        {optionLetter}
                      </span>
                      <span>{option.name}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Next Action */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-left space-y-3 animate-in fade-in">
                <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                      {currentQuestion.targetCountry.name} ({currentQuestion.targetCountry.continentName})
                    </strong>
                    <p>{currentQuestion.targetCountry.flagDescription}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                  <Link
                    href={`/countries/${currentQuestion.targetCountry.id}`}
                    className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    View Country Profile →
                  </Link>

                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>
                      {questionIndex + 1 < totalQuestions ? 'Next Question' : 'Finish Quiz'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-4xl mx-auto">
            🏆
          </div>

          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Quiz Completed!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong> (
              {Math.round((score / totalQuestions) * 100)}% accuracy)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Best Streak</span>
              <p className="text-xl font-bold text-amber-500 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 fill-amber-500" />
                {bestStreak}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Difficulty</span>
              <p className="text-xl font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                {difficulty}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <Link
              href="/games"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              Back to Games
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
