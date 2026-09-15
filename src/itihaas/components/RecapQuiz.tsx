import React, { useState } from 'react';
import { EraQuiz, EraId } from '../types';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { ERAS } from '../data/eras';

interface RecapQuizProps {
  quiz: EraQuiz;
  eraName: string;
  accentColor: string;
  onNavigateToNextEra?: (nextEraId: EraId) => void;
}

export const RecapQuiz: React.FC<RecapQuizProps> = ({
  quiz,
  eraName,
  accentColor,
  onNavigateToNextEra,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (selectedAnswers[questionIndex] !== undefined) return; // Prevent changing after selection
    const updated = {
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    };
    setSelectedAnswers(updated);

    if (Object.keys(updated).length === totalQuestions) {
      setIsCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  // Find next era in sequence
  const currentEraIndex = ERAS.findIndex((e) => e.id === quiz.eraId);
  const nextEra =
    currentEraIndex >= 0 && currentEraIndex < ERAS.length - 1
      ? ERAS[currentEraIndex + 1]
      : ERAS[0];

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <section
      className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-3xl border border-white/15 bg-gradient-to-b from-[#121626] to-[#0a0d16] shadow-2xl relative overflow-hidden"
      aria-label={`Recap Quiz for ${eraName}`}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl" aria-hidden="true">
              📜
            </span>
            <span
              className="text-xs uppercase font-bold tracking-widest font-mono"
              style={{ color: accentColor }}
            >
              End-of-Era Knowledge Check
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            {quiz.title}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
            {quiz.subtitle}
          </p>
        </div>

        {/* Score pill */}
        <div className="flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-2xl bg-white/5 border border-white/10 font-mono text-sm">
          <HelpCircle className="w-4 h-4 text-stone-400" />
          <span className="text-stone-300">Answered:</span>
          <strong className="text-white">
            {answeredCount} / {totalQuestions}
          </strong>
        </div>
      </div>

      {/* Question Cards */}
      <div className="mt-8 space-y-8">
        {quiz.questions.map((question, qIdx) => {
          const selectedOption = selectedAnswers[qIdx];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = hasAnswered && selectedOption === question.correctAnswer;

          const themeBadgeLabel =
            question.theme === 'date'
              ? 'Date & Chronology'
              : question.theme === 'figure'
              ? 'Historical Figure'
              : 'Cause & Effect';

          return (
            <div
              key={question.id}
              className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#0e1220]/70 space-y-4"
            >
              {/* Question Header & Theme Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-stone-400">
                  Question {qIdx + 1} of {totalQuestions}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-stone-300 border border-white/10 font-medium">
                  {themeBadgeLabel}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-base sm:text-lg font-semibold text-white leading-snug">
                {question.question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {question.options.map((option, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrectAnswer = question.correctAnswer === optIdx;

                  let optionStyle =
                    'border-white/10 bg-white/5 hover:bg-white/10 text-stone-200';

                  if (hasAnswered) {
                    if (isThisCorrectAnswer) {
                      optionStyle =
                        'border-emerald-500/80 bg-emerald-500/20 text-emerald-200 font-semibold shadow-md shadow-emerald-500/10';
                    } else if (isThisSelected && !isCorrect) {
                      optionStyle =
                        'border-rose-500/80 bg-rose-500/20 text-rose-200 font-semibold';
                    } else {
                      optionStyle = 'border-white/5 bg-white/[0.02] text-stone-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`text-left p-4 rounded-xl border transition-all text-sm flex items-start justify-between gap-3 ${optionStyle}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </div>

                      {hasAnswered && isThisCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {hasAnswered && isThisSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Block upon answer */}
              {hasAnswered && (
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm border leading-relaxed animate-fade-in ${
                    isCorrect
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                      : 'border-rose-500/30 bg-rose-500/10 text-stone-300'
                  }`}
                >
                  <p className="font-bold mb-1 flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Correct! Well done.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span className="text-rose-300">
                          Incorrect. Correct answer is option {String.fromCharCode(65 + question.correctAnswer)}.
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-stone-300 pl-5">{question.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Summary Card */}
      {isCompleted && (
        <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-[#131929] to-[#0f1422] text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 p-[2px] mx-auto shadow-xl shadow-amber-500/20">
            <div className="w-full h-full rounded-full bg-[#0d121f] flex items-center justify-center text-3xl">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black font-display text-white">
              Quiz Complete: {score} of {totalQuestions} Correct ({percentage}%)
            </h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto">
              {score === totalQuestions
                ? 'Flawless score! You possess an exceptional grasp of this pivotal historical epoch.'
                : score >= totalQuestions / 2
                ? 'Commendable effort! You have grasped the key turning points and figures.'
                : 'Good attempt! Review the explanations above to sharpen your historical insights.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs sm:text-sm font-semibold border border-white/15 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>

            {onNavigateToNextEra && (
              <button
                onClick={() => onNavigateToNextEra(nextEra.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all hover:scale-105"
                style={{
                  backgroundColor: nextEra.accentColor,
                  boxShadow: `0 0 20px -5px ${nextEra.accentColor}60`,
                }}
              >
                <span>Continue to {nextEra.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
