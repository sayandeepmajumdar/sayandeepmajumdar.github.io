import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { ArrayVisualizer } from '../../arrays/components/ArrayVisualizer';
import { ArrayControls } from '../../arrays/components/ArrayControls';
import { LogicView } from '../../../components/visualization/LogicView';
import { StateDebuggerPanel } from '../../../components/visualization/StateDebuggerPanel';
import { PlaybackControls } from '../../../components/visualization/PlaybackControls';
import { AlgorithmTimeline } from '../../../components/visualization/AlgorithmTimeline';
import { PredictionModal } from '../../../components/visualization/PredictionModal';
import { useAlgorithmRunner } from '../../../hooks/useAlgorithmRunner';
import { isArraySorted } from '../algorithms/binarySearch';
import { SEARCHING_PSEUDOCODE } from '../../../lib/pseudocode';
import { Search, ArrowUpDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SearchingLab: React.FC = () => {
  const [array, setArray] = useState<number[]>([12, 18, 23, 34, 45, 67, 89, 95]);
  const [searchType, setSearchType] = useState<'linear' | 'binary'>('binary');
  const [target, setTarget] = useState<number>(23);

  const runner = useAlgorithmRunner();

  // Run on mount or search parameters change
  useEffect(() => {
    if (searchType === 'linear') {
      runner.run('linearSearch', array, { target });
    } else {
      runner.run('binarySearch', array, { target });
    }
  }, [searchType, array, target]);

  const isSorted = isArraySorted(array);

  const handleSortArray = () => {
    const sorted = [...array].sort((a, b) => a - b);
    setArray(sorted);
  };

  const handleReset = () => {
    setArray([12, 18, 23, 34, 45, 67, 89, 95]);
    setTarget(23);
  };

  const currentStepArray = runner.currentStep ? runner.currentStep.arrayState : array;
  const activeCodeLine = runner.currentStep?.codeLine;
  const pseudocodeLines =
    searchType === 'linear'
      ? SEARCHING_PSEUDOCODE.linearSearch
      : SEARCHING_PSEUDOCODE.binarySearch;

  return (
    <div className="space-y-6">
      {/* Search Type Header Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-md">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchType('linear')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              searchType === 'linear'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Linear Search
          </button>
          <button
            type="button"
            onClick={() => setSearchType('binary')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              searchType === 'binary'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Binary Search
          </button>
        </div>

        {/* Target Input and Run */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Target:</span>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-20 bg-slate-950 text-slate-100 text-xs font-mono rounded-lg border border-slate-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => runner.restart()}
            className="text-xs font-mono"
          >
            <Search className="w-3.5 h-3.5 mr-1" />
            <span>Search</span>
          </Button>
        </div>

        {/* Theoretical Complexities */}
        <div className="flex items-center gap-2">
          {searchType === 'linear' ? (
            <>
              <Badge variant="default">Best: O(1)</Badge>
              <Badge variant="accent">Worst: O(n)</Badge>
              <Badge variant="outline">Unsorted Allowed</Badge>
            </>
          ) : (
            <>
              <Badge variant="default">Best: O(1)</Badge>
              <Badge variant="accent">Worst: O(log n)</Badge>
              <Badge variant="success">Requires Sorted</Badge>
            </>
          )}
        </div>
      </div>

      {/* Unsorted Array Warning for Binary Search */}
      {searchType === 'binary' && !isSorted && (
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Binary Search requires a sorted array.</strong> Current elements are
              unsorted, which violates the monotonic invariant.
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSortArray}
            className="text-xs font-mono"
          >
            <ArrowUpDown className="w-3.5 h-3.5 mr-1" />
            <span>Sort Array Now</span>
          </Button>
        </div>
      )}

      {/* Array Controls */}
      <ArrayControls
        array={array}
        onSetArray={setArray}
        onReset={handleReset}
      />

      {/* Side-by-Side Searching Workbench */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Pane: Array Visualizer & Playback */}
        <div className="xl:col-span-7 space-y-4">
          <div className="p-4 sm:p-6 rounded-xl border border-slate-800 bg-slate-950/80 shadow-lg relative min-h-[220px] flex items-center justify-center">
            <ArrayVisualizer
              array={currentStepArray}
              currentStep={runner.currentStep}
            />
          </div>

          <div className="space-y-3">
            <PlaybackControls
              isPlaying={runner.isPlaying}
              onTogglePlay={runner.togglePlay}
              onNext={runner.nextStep}
              onPrev={runner.prevStep}
              onRestart={runner.restart}
              canGoNext={runner.currentStepIndex < runner.steps.length - 1}
              canGoPrev={runner.currentStepIndex > 0}
              speed={runner.speed}
              onSpeedChange={runner.setSpeed}
              predictionMode={runner.predictionMode}
              onTogglePredictionMode={runner.togglePredictionMode}
            />

            <AlgorithmTimeline
              steps={runner.steps}
              currentStepIndex={runner.currentStepIndex}
              onSelectStep={runner.goToStep}
            />
          </div>
        </div>

        {/* Right Pane: Live Logic View & State Debugger */}
        <div className="xl:col-span-5 space-y-4 xl:sticky xl:top-20">
          <LogicView
            lines={pseudocodeLines}
            activeLineNumber={activeCodeLine}
            algorithmName={searchType === 'linear' ? 'Linear Search Logic' : 'Binary Search Logic'}
          />
          <StateDebuggerPanel
            currentStep={runner.currentStep}
            totalSteps={runner.steps.length}
          />
        </div>
      </div>

      {/* Interactive Prediction Modal */}
      {runner.activePrediction && (
        <PredictionModal
          question={runner.activePrediction}
          onSubmit={runner.submitPrediction}
          onContinue={() => {
            runner.dismissPrediction();
            runner.nextStep();
          }}
        />
      )}
    </div>
  );
};
