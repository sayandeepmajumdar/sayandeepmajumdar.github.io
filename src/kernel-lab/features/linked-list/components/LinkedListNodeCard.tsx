import React from 'react';
import { LinkedListNode, LinkedListStepPointer } from '../types';
import { ArrowRight, Cpu, Sparkles } from 'lucide-react';

export interface LinkedListNodeCardProps {
  node: LinkedListNode;
  pointers?: LinkedListStepPointer[];
  isSelected?: boolean;
  status?: 'neutral' | 'active' | 'compare' | 'found' | 'mutate' | 'detach' | 'selected';
  nextAddress?: string | null;
  index?: number;
  onClick?: () => void;
}

export const LinkedListNodeCard: React.FC<LinkedListNodeCardProps> = ({
  node,
  pointers = [],
  isSelected = false,
  status = 'neutral',
  nextAddress,
  index,
  onClick,
}) => {
  const effectiveStatus = isSelected && status === 'neutral' ? 'selected' : status;

  const statusStyles: Record<string, string> = {
    neutral:
      'border-slate-700/80 bg-slate-900/90 hover:border-slate-500 shadow-md',
    selected:
      'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20',
    active:
      'border-blue-400 bg-blue-500/20 ring-1 ring-blue-400 shadow-lg shadow-blue-500/30',
    compare:
      'border-amber-400 bg-amber-500/20 ring-1 ring-amber-400 shadow-lg shadow-amber-500/30 animate-pulse',
    mutate:
      'border-purple-400 bg-purple-500/25 ring-1 ring-purple-400 shadow-lg shadow-purple-500/30',
    found:
      'border-emerald-400 bg-emerald-500/25 ring-2 ring-emerald-400 shadow-xl shadow-emerald-500/30 scale-102',
    detach:
      'border-red-500/80 bg-red-950/30 border-dashed opacity-50 scale-95',
  };

  const nextDisplay = nextAddress ? nextAddress : 'NULL';

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center select-none group cursor-pointer transition-all duration-200"
    >
      {/* Pointers Shelf */}
      <div className="h-7 flex items-end justify-center gap-1 mb-1.5 min-w-[120px]">
        {pointers.map((ptr, pIdx) => {
          const color = ptr.color || '#38bdf8';
          return (
            <div
              key={pIdx}
              className="flex flex-col items-center animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm shadow-xs uppercase tracking-wider whitespace-nowrap"
                style={{
                  backgroundColor: `${color}25`,
                  color,
                  border: `1px solid ${color}60`,
                }}
              >
                {ptr.name}
              </span>
              <div
                className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px]"
                style={{ borderTopColor: color }}
              />
            </div>
          );
        })}
      </div>

      {/* Main Node Box */}
      <div
        className={`w-36 sm:w-40 rounded-xl border flex flex-col overflow-hidden transition-all duration-200 ${
          statusStyles[effectiveStatus] || statusStyles.neutral
        }`}
      >
        {/* Top Header: ID & Simulated RAM Address */}
        <div className="flex items-center justify-between px-2.5 py-1 bg-slate-950/80 border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1 font-bold text-slate-300">
            <span>{node.label || `Node`}</span>
            {index !== undefined && <span className="text-slate-500">[{index}]</span>}
          </div>
          <div className="flex items-center gap-1 text-slate-400" title="Simulated RAM heap address">
            <Cpu className="w-2.5 h-2.5 text-blue-400" />
            <span className="font-semibold text-blue-300">{node.address}</span>
          </div>
        </div>

        {/* Node Compartments: [ VALUE | NEXT ] */}
        <div className="grid grid-cols-2 divide-x divide-slate-800">
          {/* Value Cell */}
          <div className="p-3 sm:p-3.5 flex flex-col items-center justify-center bg-slate-900/40">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-0.5">
              DATA
            </span>
            <span className="text-lg sm:text-xl font-mono font-black text-slate-100 tracking-tight">
              {node.value}
            </span>
          </div>

          {/* Next Pointer Cell */}
          <div className="p-2 sm:p-2.5 flex flex-col items-center justify-center bg-slate-950/40 group-hover:bg-slate-900/60 transition-colors">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-0.5">
              NEXT
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono font-bold">
              <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
              <span
                className={
                  nextDisplay === 'NULL'
                    ? 'text-rose-400 font-bold'
                    : 'text-emerald-300'
                }
              >
                {nextDisplay}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Reference Subtext */}
      <div className="mt-1 text-[10px] font-mono text-slate-500 flex items-center gap-1">
        <span>ref → </span>
        <span className="text-slate-400 font-semibold">{nextDisplay}</span>
      </div>
    </div>
  );
};
