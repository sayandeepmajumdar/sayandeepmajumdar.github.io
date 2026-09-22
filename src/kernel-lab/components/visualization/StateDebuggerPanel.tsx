import React from 'react';
import { AlgorithmStep } from '../../engine/Step';
import { Terminal, Activity, HelpCircle } from 'lucide-react';

export interface StateDebuggerPanelProps {
  currentStep?: AlgorithmStep | null;
  totalSteps: number;
}

export const StateDebuggerPanel: React.FC<StateDebuggerPanelProps> = ({
  currentStep,
  totalSteps,
}) => {
  const variables = currentStep?.variables || {};
  const stats = currentStep?.stats || { comparisons: 0, swaps: 0, reads: 0, writes: 0 };
  const stepIndex = currentStep ? currentStep.stepIndex + 1 : 0;

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-md">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>CURRENT STATE</span>
        </div>
        <div className="text-slate-400">
          Step <span className="text-blue-400 font-bold">{stepIndex}</span> / {totalSteps}
        </div>
      </div>

      <div className="p-4 space-y-4 text-xs font-mono">
        {/* Variables Inspector */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>Variables Scope</span>
          </div>
          {Object.keys(variables).length === 0 ? (
            <div className="text-slate-500 italic p-2 bg-slate-900/40 rounded border border-slate-800/60">
              No variables active in current frame.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-900/60 rounded-lg border border-slate-800/80">
              {Object.entries(variables).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between px-2 py-1 bg-slate-950/50 rounded border border-slate-800/40">
                  <span className="text-slate-400">{key}</span>
                  <span className="font-semibold text-blue-300">
                    {val === null || val === undefined ? 'null' : String(val)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Runtime Operation Counters */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Operation Counters</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Comparisons</span>
              <span className="text-base font-bold text-amber-400">{stats.comparisons}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Swaps / Shifts</span>
              <span className="text-base font-bold text-purple-400">{stats.swaps}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Array Reads</span>
              <span className="text-base font-bold text-blue-400">{stats.reads}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Array Writes</span>
              <span className="text-base font-bold text-emerald-400">{stats.writes}</span>
            </div>
          </div>
        </div>

        {/* Contextual Explanation & Why */}
        {currentStep && (
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/40 text-slate-300 font-sans space-y-1.5">
            <div className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
              <span>{currentStep.explanation}</span>
            </div>
            {currentStep.detailedWhy && (
              <div className="text-xs text-slate-400 leading-relaxed flex items-start gap-1.5 pt-1 border-t border-blue-900/30">
                <HelpCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300">Why? </strong>
                  {currentStep.detailedWhy}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
