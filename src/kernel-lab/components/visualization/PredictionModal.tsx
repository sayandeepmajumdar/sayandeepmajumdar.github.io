import React, { useState } from 'react';
import { PredictionQuestion } from '../../engine/Step';
import { HelpCircle, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export interface PredictionModalProps {
  question: PredictionQuestion;
  onSubmit: (optionId: string) => { isCorrect: boolean; explanation: string } | null;
  onContinue: () => void;
}

export const PredictionModal: React.FC<PredictionModalProps> = ({
  question,
  onSubmit,
  onContinue,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [result, setResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const handleSelect = (id: string) => {
    if (result !== null) return;
    setSelectedOptionId(id);
    const res = onSubmit(id);
    setResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-slate-900 border border-purple-500/40 rounded-xl shadow-2xl overflow-hidden z-10 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              Algorithm Checkpoint • Prediction Mode
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              What happens next?
            </h3>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-sm font-medium text-slate-200">
          {question.prompt}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let optionStyles =
              'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700';

            if (result !== null) {
              if (option.isCorrect) {
                optionStyles =
                  'bg-emerald-950/40 text-emerald-300 border-emerald-500/80 ring-1 ring-emerald-500/50';
              } else if (isSelected && !option.isCorrect) {
                optionStyles = 'bg-red-950/40 text-red-300 border-red-500/80';
              } else {
                optionStyles = 'bg-slate-900/40 text-slate-500 border-slate-800 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={result !== null}
                className={`w-full text-left p-3.5 rounded-lg border text-xs font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${optionStyles}`}
              >
                <span>{option.label}</span>
                {result !== null && option.isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {result !== null && isSelected && !option.isCorrect && (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Feedback */}
        {result && (
          <div
            className={`p-3.5 rounded-lg border text-xs space-y-1.5 animate-in fade-in duration-200 ${
              result.isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/30 border-red-500/40 text-red-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {result.isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>Not quite!</span>
                </>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">{result.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        {result && (
          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={onContinue}
              className="gap-2 font-semibold"
            >
              <span>Continue Algorithm</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
