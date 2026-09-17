'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUNTRIES } from '@/data/countries';
import { useLearningProgress } from '@/lib/store';

interface TriviaItem {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'matching';
  questionType: 'capital' | 'continent' | 'language' | 'flag';
  prompt: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
}

const TRIVIA_QUESTIONS: TriviaItem[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    questionType: 'capital',
    prompt: 'What is the official capital of Australia?',
    options: [
      { text: 'Sydney', isCorrect: false },
      { text: 'Melbourne', isCorrect: false },
      { text: 'Canberra', isCorrect: true },
      { text: 'Brisbane', isCorrect: false },
    ],
    explanation: 'Canberra was chosen as the capital in 1908 as a compromise between Sydney and Melbourne.',
  },
  {
    id: 'q2',
    type: 'true-false',
    questionType: 'continent',
    prompt: 'True or False: Egypt is geographically located on both the African and Asian continents.',
    options: [
      { text: 'True (Sinai Peninsula is in Asia)', isCorrect: true },
      { text: 'False', isCorrect: false },
    ],
    explanation: 'Egypt is a transcontinental country; the Sinai Peninsula is geographically situated in Western Asia.',
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    questionType: 'language',
    prompt: 'Which official language is spoken in Kenya alongside English?',
    options: [
      { text: 'Swahili (Kiswahili)', isCorrect: true },
      { text: 'Zulu', isCorrect: false },
      { text: 'Amharic', isCorrect: false },
      { text: 'Hausa', isCorrect: false },
    ],
    explanation: 'Swahili is an official language in Kenya alongside English, serving as an East African lingua franca.',
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    questionType: 'flag',
    prompt: 'Which country has the only non-quadrilateral (five-sided) national flag in the world?',
    options: [
      { text: 'Bhutan', isCorrect: false },
      { text: 'Nepal 🇳🇵', isCorrect: true },
      { text: 'Switzerland', isCorrect: false },
      { text: 'Vatican City', isCorrect: false },
    ],
    explanation: 'Nepal is the only sovereign country with a non-rectangular flag, formed by two stacked pennants.',
  },
  {
    id: 'q5',
    type: 'true-false',
    questionType: 'capital',
    prompt: 'True or False: Rio de Janeiro is the current capital of Brazil.',
    options: [
      { text: 'True', isCorrect: false },
      { text: 'False (It is Brasília)', isCorrect: true },
    ],
    explanation: 'Brasília replaced Rio de Janeiro as Brazil\'s capital in 1960 to encourage development in the interior.',
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    questionType: 'continent',
    prompt: 'To which continent does Colombia belong?',
    options: [
      { text: 'North America', isCorrect: false },
      { text: 'South America', isCorrect: true },
      { text: 'Central America', isCorrect: false },
      { text: 'Caribbean', isCorrect: false },
    ],
    explanation: 'Colombia is located at the northern tip of South America, bordering Panama, Venezuela, Brazil, Peru, and Ecuador.',
  },
  {
    id: 'q7',
    type: 'true-false',
    questionType: 'language',
    prompt: 'True or False: Spanish is the official language of Brazil.',
    options: [
      { text: 'True', isCorrect: false },
      { text: 'False (It is Portuguese)', isCorrect: true },
    ],
    explanation: 'Portuguese is the sole official language of Brazil, spoken by more than 215 million citizens.',
  },
];

export default function CountryQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const { recordQuizResult } = useLearningProgress();

  const currentQ = TRIVIA_QUESTIONS[currentIndex];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQ.options[index].isCorrect;
    if (isCorrect) {
      setScore((s) => s + 1);
      recordQuizResult('general_quiz', true);
    } else {
      recordQuizResult('general_quiz', false);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-bold mb-1">
          <Compass className="w-3.5 h-3.5" />
          <span>Capitals, Continents & Languages</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Country & Geography Trivia
        </h1>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              Question {currentIndex + 1} of {TRIVIA_QUESTIONS.length}
            </span>
            <span className="capitalize px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
              {currentQ.questionType} • {currentQ.type.replace('-', ' ')}
            </span>
            <span>
              Score: <strong className="text-teal-600 dark:text-teal-400">{score}</strong>
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / TRIVIA_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.prompt}
            </h2>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle =
                  'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 text-slate-800 dark:text-slate-200';

                if (isAnswered) {
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
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {isAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            {isAnswered && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  💡 {currentQ.explanation}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 < TRIVIA_QUESTIONS.length ? 'Next Question' : 'View Results'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-4xl mx-auto">
            <Trophy className="w-8 h-8 text-blue-600" />
          </div>

          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Trivia Complete!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              You scored <strong>{score}</strong> out of <strong>{TRIVIA_QUESTIONS.length}</strong> (
              {Math.round((score / TRIVIA_QUESTIONS.length) * 100)}% accuracy)
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
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
