import React from 'react';
import { StepStats } from '../../../engine/Step';
import { Badge } from '../../../components/ui/Badge';
import { BarChart3, Clock, Cpu } from 'lucide-react';

export interface SortingStatsProps {
  algorithmName: string;
  stats: StepStats;
  currentStepIndex: number;
  totalSteps: number;
  theoreticalComplexity: {
    best: string;
    average: string;
    worst: string;
    space: string;
    stable: boolean;
  };
}

export const SortingStats: React.FC<SortingStatsProps> = ({
  algorithmName,
  stats,
  currentStepIndex,
  totalSteps,
  theoreticalComplexity,
}) => {
  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-md">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span>SORTING COMPLEXITY & STATS</span>
        </div>
        <span className="text-slate-400">{algorithmName}</span>
      </div>

      <div className="p-4 space-y-4">
        {/* Measured Runtime Statistics */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2 block">
            Measured Operations (Current Run)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Comparisons</span>
              <span className="text-base font-bold text-amber-400">{stats.comparisons}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
              <span className="text-[10px] text-slate-400">Swaps</span>
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

        {/* Theoretical Big-O Complexity */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2 block">
            Theoretical Big-O Complexity
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Best Time</span>
              <span className="font-bold text-emerald-400">{theoreticalComplexity.best}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Average Time</span>
              <span className="font-bold text-blue-400">{theoreticalComplexity.average}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Worst Time</span>
              <span className="font-bold text-amber-400">{theoreticalComplexity.worst}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Space / Stability</span>
              <span className="font-bold text-purple-400">
                {theoreticalComplexity.space} • {theoreticalComplexity.stable ? 'Stable' : 'Unstable'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
