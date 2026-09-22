import React, { useState, useMemo } from 'react';
import { generateBubbleSortSteps } from '../algorithms/bubbleSort';
import { generateSelectionSortSteps } from '../algorithms/selectionSort';
import { generateInsertionSortSteps } from '../algorithms/insertionSort';
import { ArrayControls } from '../../arrays/components/ArrayControls';
import { Badge } from '../../../components/ui/Badge';
import { GitCompare, CheckCircle2, Award, Zap, HardDrive } from 'lucide-react';

export const SortingComparison: React.FC = () => {
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 44, 23]);

  // Compute final steps and stats for all 3 algorithms on the exact same array
  const comparisonData = useMemo(() => {
    const bubbleSteps = generateBubbleSortSteps(array);
    const selectionSteps = generateSelectionSortSteps(array);
    const insertionSteps = generateInsertionSortSteps(array);

    const lastBubble = bubbleSteps[bubbleSteps.length - 1];
    const lastSelection = selectionSteps[selectionSteps.length - 1];
    const lastInsertion = insertionSteps[insertionSteps.length - 1];

    return [
      {
        id: 'bubble',
        name: 'Bubble Sort',
        steps: bubbleSteps.length,
        comparisons: lastBubble?.stats.comparisons || 0,
        swaps: lastBubble?.stats.swaps || 0,
        reads: lastBubble?.stats.reads || 0,
        writes: lastBubble?.stats.writes || 0,
        bestFor: 'Simple education and detecting already sorted data',
        tradeoff: 'Very high number of writes and swaps on average.',
      },
      {
        id: 'selection',
        name: 'Selection Sort',
        steps: selectionSteps.length,
        comparisons: lastSelection?.stats.comparisons || 0,
        swaps: lastSelection?.stats.swaps || 0,
        reads: lastSelection?.stats.reads || 0,
        writes: lastSelection?.stats.writes || 0,
        bestFor: 'Minimizing write operations (at most n-1 swaps)',
        tradeoff: 'Always O(n²) comparisons even if already sorted; unstable.',
      },
      {
        id: 'insertion',
        name: 'Insertion Sort',
        steps: insertionSteps.length,
        comparisons: lastInsertion?.stats.comparisons || 0,
        swaps: lastInsertion?.stats.swaps || 0,
        reads: lastInsertion?.stats.reads || 0,
        writes: lastInsertion?.stats.writes || 0,
        bestFor: 'Nearly sorted arrays & small datasets (runs in linear O(n))',
        tradeoff: 'Shifts many elements when minimums appear near the end.',
      },
    ];
  }, [array]);

  const maxComparisons = Math.max(...comparisonData.map((c) => c.comparisons), 1);
  const maxSwaps = Math.max(...comparisonData.map((c) => c.swaps), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-100">
              Sorting Algorithm Comparison & Benchmarks
            </h2>
            <p className="text-xs text-slate-400">
              Run Bubble Sort, Selection Sort, and Insertion Sort simultaneously on the exact same dataset.
            </p>
          </div>
        </div>

        <Badge variant="accent">3 Algorithms Compared</Badge>
      </div>

      {/* Dataset Controls */}
      <ArrayControls
        array={array}
        onSetArray={setArray}
        onReset={() => setArray([45, 12, 85, 32, 89, 39, 69, 44, 23])}
      />

      {/* Comparative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparisonData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-5 rounded-xl border border-slate-800 bg-slate-950/80 shadow-md space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-100 font-mono">{item.name}</h3>
                <span className="text-xs font-mono text-slate-400">{item.steps} total steps</span>
              </div>

              {/* Progress Bars for Comparisons */}
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 text-slate-400">
                    <span>Comparisons:</span>
                    <span className="font-bold text-amber-400">{item.comparisons}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${(item.comparisons / maxComparisons) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Progress Bars for Swaps */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1 text-slate-400">
                    <span>Swaps / Shifts:</span>
                    <span className="font-bold text-purple-400">{item.swaps}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${(item.swaps / maxSwaps) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-[10px]">
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 text-slate-400">
                    Reads: <strong className="text-blue-400">{item.reads}</strong>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 text-slate-400">
                    Writes: <strong className="text-emerald-400">{item.writes}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs">
              <div className="text-emerald-400/90 text-[11px] flex items-start gap-1.5">
                <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{item.bestFor}</span>
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                <strong className="text-slate-300">Tradeoff: </strong>
                {item.tradeoff}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tradeoff Explanation Callout */}
      <div className="p-5 rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-300 space-y-2 text-xs leading-relaxed">
        <h4 className="font-semibold text-blue-300 text-sm">
          Why isn't one algorithm always "best"?
        </h4>
        <p>
          In computer science, algorithm selection is about matching constraints to requirements:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
          <li>
            <strong className="text-slate-200">EEPROM / Flash Memory:</strong> In hardware where memory writes wear out the disk, <strong>Selection Sort</strong> is historically favored because it performs at most $O(n)$ writes, even though it does $O(n^2)$ comparisons.
          </li>
          <li>
            <strong className="text-slate-200">Nearly Sorted Streams:</strong> If data arrives mostly sorted, <strong>Insertion Sort</strong> achieves near-linear $O(n)$ efficiency, outperforming even Quick Sort on tiny inputs.
          </li>
          <li>
            <strong className="text-slate-200">Simplicity & Early Exits:</strong> <strong>Bubble Sort</strong> with a swapped flag can detect an already-sorted list in a single pass of $n-1$ comparisons.
          </li>
        </ul>
      </div>
    </div>
  );
};
