import React from 'react';
import { PointerInfo } from '../../../engine/Step';

export interface ArrayElementNodeProps {
  index: number;
  value: number;
  baseAddress?: number;
  status: 'neutral' | 'active' | 'comparison' | 'swap' | 'found' | 'eliminated' | 'selected';
  pointers?: PointerInfo[];
  onClick?: () => void;
  showAddress?: boolean;
}

export const ArrayElementNode: React.FC<ArrayElementNodeProps> = ({
  index,
  value,
  baseAddress = 0x1000,
  status = 'neutral',
  pointers = [],
  onClick,
  showAddress = true,
}) => {
  const address = `0x${(baseAddress + index * 4).toString(16).toUpperCase()}`;

  const statusStyles = {
    neutral: 'border-slate-700/80 bg-slate-900/90 text-slate-100 hover:border-slate-500',
    selected: 'border-blue-500 bg-blue-500/10 text-blue-300 ring-2 ring-blue-500/40',
    active: 'border-blue-500 bg-blue-500/20 text-blue-200 shadow-md shadow-blue-500/20',
    comparison: 'border-amber-500 bg-amber-500/20 text-amber-200 shadow-md shadow-amber-500/20 animate-pulse',
    swap: 'border-purple-500 bg-purple-500/25 text-purple-200 shadow-md shadow-purple-500/25',
    found: 'border-emerald-500 bg-emerald-500/25 text-emerald-200 shadow-lg shadow-emerald-500/25 scale-105',
    eliminated: 'border-slate-800 bg-slate-950/40 text-slate-600 border-dashed opacity-35 line-through',
  };

  return (
    <div
      className="flex flex-col items-center select-none group relative transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Top Pointers Container */}
      <div className="h-7 flex items-end justify-center gap-1 mb-1.5 min-w-[56px]">
        {pointers.map((ptr, pIdx) => (
          <div
            key={pIdx}
            className="flex flex-col items-center animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <span
              className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider"
              style={{
                backgroundColor: ptr.color ? `${ptr.color}25` : 'rgba(59, 130, 246, 0.25)',
                color: ptr.color || '#60a5fa',
                border: `1px solid ${ptr.color || '#3b82f6'}60`,
              }}
            >
              {ptr.name}
            </span>
            <div
              className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px]"
              style={{ borderTopColor: ptr.color || '#3b82f6' }}
            />
          </div>
        ))}
      </div>

      {/* Main Element Cell */}
      <div
        className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 ${statusStyles[status]}`}
      >
        <span className="text-lg sm:text-xl font-mono font-bold tracking-tight">{value}</span>
      </div>

      {/* Index Tag */}
      <div className="mt-1.5 flex flex-col items-center">
        <span className="text-xs font-mono font-semibold text-slate-400">
          [{index}]
        </span>
        {showAddress && (
          <span className="text-[9px] font-mono text-slate-600 hidden sm:block tracking-tighter">
            {address}
          </span>
        )}
      </div>
    </div>
  );
};
