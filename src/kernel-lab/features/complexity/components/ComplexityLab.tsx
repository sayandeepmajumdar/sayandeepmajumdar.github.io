import React, { useState } from 'react';
import { Slider } from '../../../components/ui/Slider';
import { Badge } from '../../../components/ui/Badge';
import { TrendingUp, Clock, Info } from 'lucide-react';

export const ComplexityLab: React.FC = () => {
  // Slider steps on log scale
  const inputSizes = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 1000000];
  const [sizeIndex, setSizeIndex] = useState<number>(3); // 500 default

  const n = inputSizes[sizeIndex];

  // Calculations
  const o1 = 1;
  const oLogN = Math.round(Math.log2(n));
  const oN = n;
  const oNLogN = Math.round(n * Math.log2(n));
  const oN2 = n <= 5000 ? n * n : Infinity;

  const curves = [
    {
      name: 'O(1)',
      label: 'Constant',
      color: '#10b981',
      ops: o1,
      realWorld: '< 1 nanosecond (instant CPU instruction)',
      example: 'Array access by index, push/pop at end',
    },
    {
      name: 'O(log n)',
      label: 'Logarithmic',
      color: '#06b6d4',
      ops: oLogN,
      realWorld: '< 5 nanoseconds (blink of an eye)',
      example: 'Binary Search, balanced search tree query',
    },
    {
      name: 'O(n)',
      label: 'Linear',
      color: '#3b82f6',
      ops: oN,
      realWorld: n <= 10000 ? '< 0.1 millisecond' : '~1 millisecond',
      example: 'Linear Search, array insert/delete shift',
    },
    {
      name: 'O(n log n)',
      label: 'Linearithmic',
      color: '#f59e0b',
      ops: oNLogN,
      realWorld: n <= 10000 ? '~0.5 millisecond' : '~15 milliseconds',
      example: 'Merge Sort, Heap Sort, Quick Sort (avg)',
    },
    {
      name: 'O(n²)',
      label: 'Quadratic',
      color: '#ef4444',
      ops: oN2 === Infinity ? '1,000,000,000,000+' : oN2.toLocaleString(),
      realWorld:
        n <= 100
          ? '< 0.1 ms'
          : n <= 1000
          ? '~1 ms'
          : n <= 10000
          ? '~100 ms'
          : '> 16 minutes to several hours!',
      example: 'Bubble Sort, Selection Sort, nested loops',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-100">
              Big-O Algorithmic Growth Visualizer
            </h2>
            <p className="text-xs text-slate-400">
              Adjust input size n to develop mathematical intuition for computational scaling.
            </p>
          </div>
        </div>

        <Badge variant="accent">Input Size: n = {n.toLocaleString()}</Badge>
      </div>

      {/* Interactive Input Size Slider */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80 shadow-md space-y-3">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-slate-300 font-semibold">Scale Input Size (n):</span>
          <span className="text-blue-400 font-bold text-sm">{n.toLocaleString()} elements</span>
        </div>

        <Slider
          min={0}
          max={inputSizes.length - 1}
          value={sizeIndex}
          onChange={(idx) => setSizeIndex(idx)}
          leftLabel="10 (Trivial)"
          rightLabel="1,000,000 (Production Scale)"
        />

        <div className="flex flex-wrap justify-between gap-1 pt-1 text-[11px] font-mono text-slate-500">
          {inputSizes.map((val, idx) => (
            <button
              key={val}
              type="button"
              onClick={() => setSizeIndex(idx)}
              className={`px-2 py-0.5 rounded transition-colors ${
                idx === sizeIndex
                  ? 'bg-blue-600 text-white font-bold'
                  : 'hover:bg-slate-900 text-slate-400'
              }`}
            >
              {val >= 1000 ? `${val / 1000}k` : val}
            </button>
          ))}
        </div>
      </div>

      {/* Mathematical Curves & Intuition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {curves.map((curve) => (
          <div
            key={curve.name}
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 shadow-md flex flex-col justify-between space-y-3"
            style={{ borderLeftColor: curve.color, borderLeftWidth: '3px' }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-mono text-slate-100">{curve.name}</span>
                <span
                  className="text-xs font-mono font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${curve.color}20`, color: curve.color }}
                >
                  {curve.label}
                </span>
              </div>

              {/* Number of Operations */}
              <div className="mt-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 font-mono">
                <span className="text-[10px] text-slate-400 block">Operations at n = {n.toLocaleString()}:</span>
                <span className="text-lg font-bold" style={{ color: curve.color }}>
                  {typeof curve.ops === 'number' ? curve.ops.toLocaleString() : curve.ops}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/60 text-xs">
              <div className="flex items-start gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-[11px] font-mono">{curve.realWorld}</span>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                <strong className="text-slate-300">DSA Example: </strong>
                {curve.example}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SVG Growth Chart Visualizer */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/90 shadow-md space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span>Comparative Growth Trajectory</span>
        </h3>

        <div className="h-64 w-full relative">
          <svg viewBox="0 0 600 240" className="w-full h-full">
            {/* Grid lines */}
            <line x1="50" y1="20" x2="50" y2="200" stroke="#1e293b" strokeWidth="1" />
            <line x1="50" y1="200" x2="580" y2="200" stroke="#1e293b" strokeWidth="1" />
            <line x1="50" y1="140" x2="580" y2="140" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="50" y1="80" x2="580" y2="80" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="1" />

            {/* Labels */}
            <text x="30" y="205" fill="#64748b" fontSize="10" fontFamily="monospace">0</text>
            <text x="20" y="145" fill="#64748b" fontSize="10" fontFamily="monospace">Mid</text>
            <text x="20" y="85" fill="#64748b" fontSize="10" fontFamily="monospace">High</text>
            <text x="560" y="218" fill="#64748b" fontSize="10" fontFamily="monospace">n →</text>
            <text x="25" y="30" fill="#64748b" fontSize="10" fontFamily="monospace">Ops ↑</text>

            {/* O(1) Curve - Flat horizontal line */}
            <path d="M 50 196 L 580 196" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <text x="530" y="190" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">O(1)</text>

            {/* O(log n) Curve - Gentle logarithmic rise */}
            <path d="M 50 196 Q 180 186, 580 180" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
            <text x="500" y="174" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="bold">O(log n)</text>

            {/* O(n) Curve - Linear slope */}
            <path d="M 50 200 L 580 145" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="545" y="140" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">O(n)</text>

            {/* O(n log n) Curve */}
            <path d="M 50 200 Q 300 160, 580 90" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="500" y="85" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">O(n log n)</text>

            {/* O(n^2) Curve - Steep quadratic explosion */}
            <path d="M 50 200 Q 180 180, 240 30" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="248" y="45" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">O(n²)</text>
          </svg>
        </div>
      </div>
    </div>
  );
};
