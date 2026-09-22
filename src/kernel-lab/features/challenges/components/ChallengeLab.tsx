import React, { useState } from 'react';
import { CHALLENGES, Challenge } from '../data/challengeData';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { ArrayElementNode } from '../../arrays/components/ArrayElementNode';
import { Trophy, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';

export const ChallengeLab: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const challenge: Challenge = CHALLENGES[currentIdx];

  const handleElementClick = (index: number) => {
    if (submitted || challenge.type !== 'select-elements') return;
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleCheckAnswer = () => {
    if (challenge.type === 'select-elements') {
      const targets = challenge.targetIndices || [];
      const correct =
        targets.length === selectedIndices.length &&
        targets.every((idx) => selectedIndices.includes(idx));
      setIsCorrect(correct);
      setSubmitted(true);
      if (correct && !completedIds.includes(challenge.id)) {
        setCompletedIds([...completedIds, challenge.id]);
      }
    } else {
      const selected = challenge.options?.find((opt) => opt.id === selectedOptionId);
      const correct = !!selected?.isCorrect;
      setIsCorrect(correct);
      setSubmitted(true);
      if (correct && !completedIds.includes(challenge.id)) {
        setCompletedIds([...completedIds, challenge.id]);
      }
    }
  };

  const handleResetChallenge = () => {
    setSelectedIndices([]);
    setSelectedOptionId(null);
    setSubmitted(false);
  };

  const handleNextChallenge = () => {
    if (currentIdx < CHALLENGES.length - 1) {
      setCurrentIdx(currentIdx + 1);
      handleResetChallenge();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-100">
              Interactive DSA Challenges & Practice
            </h2>
            <p className="text-xs text-slate-400">
              Test your mechanical understanding of array shifts, pointers, and sorting behavior.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Progress:</span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {completedIds.length} / {CHALLENGES.length} Completed
          </span>
        </div>
      </div>

      {/* Challenge Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-950/70 border border-slate-800 rounded-xl">
        {CHALLENGES.map((ch, idx) => {
          const isDone = completedIds.includes(ch.id);
          const isActive = idx === currentIdx;

          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => {
                setCurrentIdx(idx);
                handleResetChallenge();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full border border-slate-600 text-[9px] flex items-center justify-center">
                  {idx + 1}
                </span>
              )}
              <span>{ch.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Current Challenge Card */}
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/90 shadow-lg space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="accent">{challenge.category}</Badge>
            <span className="text-xs font-mono text-slate-500">
              Challenge {currentIdx + 1} of {CHALLENGES.length}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-100">{challenge.title}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{challenge.prompt}</p>
        </div>

        {/* Array Visualization for interactive clicking */}
        <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/40 flex justify-center items-center overflow-x-auto">
          <div className="flex items-center gap-3">
            {challenge.array.map((val, idx) => {
              const isSelected = selectedIndices.includes(idx);
              let status: 'neutral' | 'selected' | 'found' | 'eliminated' = isSelected
                ? 'selected'
                : 'neutral';

              if (submitted && challenge.type === 'select-elements') {
                const isTarget = challenge.targetIndices?.includes(idx);
                if (isSelected && isTarget) status = 'found';
                if (isSelected && !isTarget) status = 'eliminated';
              }

              return (
                <ArrayElementNode
                  key={idx}
                  index={idx}
                  value={val}
                  status={status}
                  onClick={() => handleElementClick(idx)}
                />
              );
            })}
          </div>
        </div>

        {/* Multiple Choice Options if applicable */}
        {challenge.type === 'multiple-choice' && challenge.options && (
          <div className="space-y-2 max-w-xl">
            {challenge.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let styles = 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800';

              if (submitted) {
                if (opt.isCorrect) styles = 'bg-emerald-950/50 text-emerald-300 border-emerald-500';
                else if (isSelected && !opt.isCorrect)
                  styles = 'bg-red-950/50 text-red-300 border-red-500';
              } else if (isSelected) {
                styles = 'bg-blue-600/20 text-blue-300 border-blue-500 ring-1 ring-blue-500';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => !submitted && setSelectedOptionId(opt.id)}
                  className={`w-full text-left p-3 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-between ${styles}`}
                >
                  <span>{opt.label}</span>
                  {submitted && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {!submitted ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleCheckAnswer}
              disabled={
                (challenge.type === 'select-elements' && selectedIndices.length === 0) ||
                (challenge.type === 'multiple-choice' && !selectedOptionId)
              }
              className="text-xs font-mono font-semibold"
            >
              Check Answer
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetChallenge}
                className="text-xs font-mono"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                <span>Try Again</span>
              </Button>

              {currentIdx < CHALLENGES.length - 1 && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNextChallenge}
                  className="text-xs font-mono"
                >
                  <span>Next Challenge</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              )}
            </>
          )}
        </div>

        {/* Answer Feedback & Explanation */}
        {submitted && (
          <div
            className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/30 border-red-500/40 text-red-200'
            }`}
          >
            <div className="font-bold flex items-center gap-2 text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct! Well done.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>Not quite right.</span>
                </>
              )}
            </div>
            <div className="text-slate-300 leading-relaxed flex items-start gap-2 pt-1 border-t border-slate-800">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Why? </strong>
                {challenge.explanation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
