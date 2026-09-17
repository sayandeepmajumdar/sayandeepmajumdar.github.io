'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  MapPin,
  Languages,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUNTRIES } from '@/data/countries';
import { Country } from '@/lib/types';
import { AudioButton } from '@/components/ui/AudioButton';
import { useLearningProgress } from '@/lib/store';

export default function GuidedLearnClient({ country }: { country: Country }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const { markCountryLearned, markFlagLearned, recordQuizResult, unlockBadge } =
    useLearningProgress();

  const greeting =
    country.basicPhrases.find((p) => p.category === 'greetings') ||
    country.basicPhrases[0];

  const totalSteps = 6;

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswered) return;
    setQuizSelectedOption(idx);
    setQuizAnswered(true);

    const isCorrect = idx === 0; // option 0 is correct
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      markCountryLearned(country.id);
      markFlagLearned(country.id);
      recordQuizResult(country.id, true);
      unlockBadge('first_step');
    } else {
      recordQuizResult(country.id, false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    } else {
      // Completed!
      markCountryLearned(country.id);
      markFlagLearned(country.id);
      setCurrentStep(7); // celebration step
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const nextCountry =
    COUNTRIES.find((c) => c.id !== country.id && c.continent === country.continent) ||
    COUNTRIES[0];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1 hover:text-teal-600 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All 60s Lessons</span>
        </Link>
        <span>
          Lesson: {country.name} {country.flag}
        </span>
      </div>

      {/* Progress Stepper Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span className="text-teal-600 dark:text-teal-400">
            {currentStep <= 6 ? `Step ${currentStep} of ${totalSteps}` : 'Complete!'}
          </span>
          <span>{country.name} in 60 Seconds</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${(Math.min(currentStep, 6) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Animated Step Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl min-h-[380px] flex flex-col justify-between relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STEP 1: Continent & Location */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 text-center my-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-3xl mx-auto">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Step 1: Continent & Location
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {country.name} is in {country.continentName}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  Located in the <strong>{country.subregion}</strong> region, covering{' '}
                  <strong>{country.areaKm2.toLocaleString()} km²</strong> with a population of{' '}
                  <strong>{(country.population / 1_000_000).toFixed(1)} million</strong>.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Flag Symbolism */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 text-center my-auto"
            >
              <span className="text-8xl select-none block filter drop-shadow-md" role="img" aria-label={`Flag of ${country.name}`}>
                {country.flag}
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Step 2: National Flag Symbolism
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  The Story of the Flag
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  {country.flagDescription}
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Capital City */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 text-center my-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-3xl mx-auto">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Step 3: Capital City
                </span>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-1">
                  {country.capital}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  The official seat of national government, diplomacy, and administrative leadership of {country.name}.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Official Language */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 text-center my-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-3xl mx-auto">
                <Languages className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Step 4: Official Languages
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {country.officialLanguages.join(', ')}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Also widely spoken: {country.languages.slice(0, 3).join(', ')}
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Say Hello */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 text-center my-auto"
            >
              <span className="text-5xl block select-none">👋</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Step 5: Say Hello in {country.name}
                </span>
                <p className="text-4xl font-black text-slate-900 dark:text-white mt-2">
                  {greeting?.original || 'Hello'}
                </p>
                <p className="text-base text-slate-500 font-medium mt-1">
                  ({greeting?.phonetic || 'Hello'})
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Meaning: &ldquo;{greeting?.english || 'Hello'}&rdquo;
                </p>

                <div className="pt-4 flex justify-center">
                  <AudioButton
                    text={greeting?.original || 'Hello'}
                    langCode={greeting?.langCode}
                    label="Listen & Practice"
                    size="lg"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Quick Check Quiz */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5 my-auto"
            >
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Step 6: Quick Check Quiz
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  What is the capital of {country.name}?
                </h2>
              </div>

              <div className="space-y-2.5 max-w-md mx-auto">
                {[
                  { text: country.capital, isCorrect: true },
                  { text: 'Cairo', isCorrect: false },
                  { text: 'Vienna', isCorrect: false },
                ].map((opt, idx) => {
                  const isSelected = quizSelectedOption === idx;
                  let style =
                    'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-teal-500';

                  if (quizAnswered) {
                    if (opt.isCorrect) {
                      style =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected) {
                      style =
                        'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 line-through';
                    } else {
                      style = 'opacity-40 border-slate-200 dark:border-slate-800';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={quizAnswered}
                      className={`w-full p-3.5 rounded-2xl border text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${style}`}
                    >
                      <span>{opt.text}</span>
                      {quizAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      {quizAnswered && isSelected && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 7: Celebration */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5 text-center my-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-4xl mx-auto">
                🎉
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  You Learned {country.name}!
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  {country.name} {country.flag} has been added to your learned nations mastery in browser storage.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <Link
                  href={`/learn/${nextCountry.id}`}
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <span>Learn {nextCountry.name} {nextCountry.flag}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/countries/${country.id}`}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
                >
                  Full Profile
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation Buttons */}
        {currentStep <= 6 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                currentStep === 1
                  ? 'opacity-30 cursor-not-allowed text-slate-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{currentStep === 6 ? 'Complete Lesson' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
