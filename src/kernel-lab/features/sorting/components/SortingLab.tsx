import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { ArrayVisualizer } from '../../arrays/components/ArrayVisualizer';
import { ArrayControls } from '../../arrays/components/ArrayControls';
import { LogicView } from '../../../components/visualization/LogicView';
import { StateDebuggerPanel } from '../../../components/visualization/StateDebuggerPanel';
import { PlaybackControls } from '../../../components/visualization/PlaybackControls';
import { AlgorithmTimeline } from '../../../components/visualization/AlgorithmTimeline';
import { PredictionModal } from '../../../components/visualization/PredictionModal';
import { SortingStats } from './SortingStats';
import { useAlgorithmRunner } from '../../../hooks/useAlgorithmRunner';
import { SORTING_PSEUDOCODE } from '../../../lib/pseudocode';
import { Layers, GitCompare } from 'lucide-react';

export interface SortingLabProps {
  onGoToComparison?: () => void;
}

export const SortingLab: React.FC<SortingLabProps> = ({ onGoToComparison }) => {
  const [array, setArray] = useState<number[]>([29, 10, 14, 37, 13, 22, 45, 18]);
  const [selectedSort, setSelectedSort] = useState<'bubbleSort' | 'selectionSort' | 'insertionSort'>('bubbleSort');

  const runner = useAlgorithmRunner();

  useEffect(() => {
    runner.run(selectedSort, array);
  }, [selectedSort, array]);

  const handleReset = () => {
    setArray([29, 10, 14, 37, 13, 22, 45, 18]);
  };

  const currentStepArray = runner.currentStep ? runner.currentStep.arrayState : array;
  const activeCodeLine = runner.currentStep?.codeLine;
  const pseudocodeLines = SORTING_PSEUDOCODE[selectedSort];

  const theoreticalMap = {
    bubbleSort: {
      name: 'Bubble Sort',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: true,
    },
    selectionSort: {
      name: 'Selection Sort',
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: false,
    },
    insertionSort: {
      name: 'Insertion Sort',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stable: true,
    },
  };

  const sortAlgorithms: Array<{ id: 'bubbleSort' | 'selectionSort' | 'insertionSort'; label: string }> = [
    { id: 'bubbleSort', label: 'Bubble Sort' },
    { id: 'selectionSort', label: 'Selection Sort' },
    { id: 'insertionSort', label: 'Insertion Sort' },
  ];

  return (
    <div className="space-y-6">
      {/* Algorithm Switcher Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          {sortAlgorithms.map((sort) => (
            <button
              key={sort.id}
              type="button"
              onClick={() => setSelectedSort(sort.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedSort === sort.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>

        {onGoToComparison && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onGoToComparison}
            className="text-xs font-mono gap-1.5"
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-400" />
            <span>Compare All 3 Side-by-Side</span>
          </Button>
        )}
      </div>

      {/* Array Controls */}
      <ArrayControls
        array={array}
        onSetArray={setArray}
        onReset={handleReset}
      />

      {/* Side-by-Side Sorting Workbench */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Pane: Array Visualizer, Playback & Stats */}
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

          <SortingStats
            algorithmName={theoreticalMap[selectedSort].name}
            stats={runner.currentStep?.stats || { comparisons: 0, swaps: 0, reads: 0, writes: 0 }}
            currentStepIndex={runner.currentStepIndex}
            totalSteps={runner.steps.length}
            theoreticalComplexity={theoreticalMap[selectedSort]}
          />
        </div>

        {/* Right Pane: Live Logic View & State Debugger */}
        <div className="xl:col-span-5 space-y-4 xl:sticky xl:top-20">
          <LogicView
            lines={pseudocodeLines}
            activeLineNumber={activeCodeLine}
            algorithmName={`${theoreticalMap[selectedSort].name} Logic`}
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
