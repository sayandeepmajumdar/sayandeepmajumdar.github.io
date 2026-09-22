import React, { useRef, useEffect } from 'react';
import { AlgorithmStep } from '../../engine/Step';

export interface AlgorithmTimelineProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const AlgorithmTimeline: React.FC<AlgorithmTimelineProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll timeline to keep active step centered
  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector(
        `[data-step-index="${currentStepIndex}"]`
      ) as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentStepIndex]);

  if (steps.length <= 1) {
    return null;
  }

  const getStepColor = (type: string, isCurrent: boolean) => {
    if (isCurrent) return 'bg-blue-500 ring-4 ring-blue-500/30 scale-125 z-10';
    if (type === 'compare') return 'bg-amber-500/80 hover:bg-amber-400';
    if (type === 'swap' || type === 'shift') return 'bg-purple-500/80 hover:bg-purple-400';
    if (type === 'found' || type === 'complete') return 'bg-emerald-500/80 hover:bg-emerald-400';
    return 'bg-slate-700 hover:bg-slate-500';
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/90 p-3 shadow-md w-full">
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
        <span className="font-semibold text-slate-300">Execution Timeline</span>
        <span>
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-x-auto py-3 px-2 flex items-center gap-1.5 scrollbar-thin select-none"
      >
        {/* Connecting track line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 -z-0" />

        {steps.map((step, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isPast = idx < currentStepIndex;

          return (
            <button
              key={step.id || idx}
              data-step-index={idx}
              onClick={() => onSelectStep(idx)}
              title={`Step ${idx + 1}: ${step.explanation}`}
              className="relative group z-10 flex flex-col items-center focus:outline-none cursor-pointer py-1 px-1 shrink-0"
            >
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-150 ${getStepColor(
                  step.type,
                  isCurrent
                )} ${isPast ? 'opacity-80' : 'opacity-90'}`}
              />
              <span
                className={`text-[9px] font-mono mt-1 ${
                  isCurrent ? 'text-blue-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'
                }`}
              >
                {idx + 1}
              </span>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                <div className="bg-slate-900 text-slate-200 text-[10px] font-sans py-1 px-2 rounded-md shadow-lg border border-slate-700 whitespace-nowrap max-w-xs truncate">
                  {step.explanation}
                </div>
                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-700" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
