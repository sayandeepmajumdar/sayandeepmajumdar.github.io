import React from 'react';
import { ArrayElementNode } from './ArrayElementNode';
import { AlgorithmStep } from '../../../engine/Step';

export interface ArrayVisualizerProps {
  array: number[];
  currentStep?: AlgorithmStep | null;
  selectedIndex?: number | null;
  onSelectIndex?: (index: number) => void;
  showAddresses?: boolean;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  currentStep,
  selectedIndex,
  onSelectIndex,
  showAddresses = true,
}) => {
  if (array.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/30 text-center">
        <span className="text-slate-400 text-sm font-mono mb-2">No array data initialized</span>
        <span className="text-slate-500 text-xs">
          Generate a random array or enter custom values using the control bar above.
        </span>
      </div>
    );
  }

  const primaryIndices = currentStep?.indices || [];
  const secondaryIndices = currentStep?.secondaryIndices || [];
  const pointers = currentStep?.pointers || [];
  const stepType = currentStep?.type || 'idle';

  return (
    <div className="flex flex-col w-full">
      {/* Scrollable Array Track */}
      <div className="overflow-x-auto py-4 px-2 flex justify-start sm:justify-center items-center gap-2 sm:gap-3 min-h-[160px]">
        {array.map((value, idx) => {
          // Determine status
          let status: 'neutral' | 'active' | 'comparison' | 'swap' | 'found' | 'eliminated' | 'selected' =
            'neutral';

          if (secondaryIndices.includes(idx)) {
            if (stepType === 'eliminate') {
              status = 'eliminated';
            } else if (stepType === 'sorted' || stepType === 'complete') {
              status = 'found';
            }
          }

          if (primaryIndices.includes(idx)) {
            if (stepType === 'compare') {
              status = 'comparison';
            } else if (stepType === 'swap') {
              status = 'swap';
            } else if (stepType === 'found') {
              status = 'found';
            } else if (stepType === 'access' || stepType === 'insert' || stepType === 'shift') {
              status = 'active';
            }
          }

          if (selectedIndex === idx && status === 'neutral') {
            status = 'selected';
          }

          // Filter pointers assigned to this index
          const elementPointers = pointers.filter((p) => p.index === idx);

          return (
            <ArrayElementNode
              key={`${idx}-${value}`}
              index={idx}
              value={value}
              status={status}
              pointers={elementPointers}
              onClick={() => onSelectIndex?.(idx)}
              showAddress={showAddresses}
            />
          );
        })}
      </div>

      {/* Semantic Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] font-mono text-slate-400 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-slate-800 border border-slate-700" />
          <span>Neutral</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-blue-500/30 border border-blue-500" />
          <span>Active / Read</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-amber-500/30 border border-amber-500" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-purple-500/30 border border-purple-500" />
          <span>Swapping / Moving</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500/30 border border-emerald-500" />
          <span>Found / Sorted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs border border-dashed border-slate-700 opacity-40" />
          <span>Eliminated</span>
        </div>
      </div>
    </div>
  );
};
