import React, { useState, useEffect } from 'react';
import { ArrayVisualizer } from '../features/arrays/components/ArrayVisualizer';
import { ArrayControls } from '../features/arrays/components/ArrayControls';
import { LogicView } from '../components/visualization/LogicView';
import { StateDebuggerPanel } from '../components/visualization/StateDebuggerPanel';
import { PlaybackControls } from '../components/visualization/PlaybackControls';
import { AlgorithmTimeline } from '../components/visualization/AlgorithmTimeline';
import { PredictionModal } from '../components/visualization/PredictionModal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useAlgorithmRunner } from '../hooks/useAlgorithmRunner';
import { ARRAY_PSEUDOCODE } from '../lib/pseudocode';
import { AlgorithmId, RunnerOptions } from '../engine/AlgorithmRunner';
import {
  Layers,
  Eye,
  CornerDownRight,
  Trash2,
  Edit,
  ArrowRightLeft,
  RotateCw,
  Cpu,
  HelpCircle,
  Play,
  Sparkles,
} from 'lucide-react';

export const ArrayLabPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([12, 45, 23, 67, 18, 34]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<AlgorithmId>('access');

  // Input states for operations
  const [accessIndex, setAccessIndex] = useState<number>(2);
  const [insertIndex, setInsertIndex] = useState<number>(2);
  const [insertValue, setInsertValue] = useState<number>(99);
  const [deleteIndex, setDeleteIndex] = useState<number>(2);
  const [updateIndex, setUpdateIndex] = useState<number>(1);
  const [updateValue, setUpdateValue] = useState<number>(55);
  const [swapIndexA, setSwapIndexA] = useState<number>(0);
  const [swapIndexB, setSwapIndexB] = useState<number>(3);
  const [rotatePositions, setRotatePositions] = useState<number>(2);

  const runner = useAlgorithmRunner();

  // Run initial access step on mount or array reset
  useEffect(() => {
    const validIdx = Math.min(accessIndex, Math.max(0, array.length - 1));
    runner.run('access', array, { index: validIdx });
  }, [array]);

  // Sync array state when an in-place mutation completes
  useEffect(() => {
    if (runner.isComplete && runner.currentStep) {
      if (
        runner.currentStep.arrayState.length !== array.length ||
        runner.currentStep.arrayState.some((val, idx) => val !== array[idx])
      ) {
        setArray(runner.currentStep.arrayState);
      }
    }
  }, [runner.isComplete, runner.currentStep]);

  const handleReset = () => {
    const defaultArr = [12, 45, 23, 67, 18, 34];
    setArray(defaultArr);
    setSelectedIndex(null);
    setAccessIndex(2);
    runner.run('access', defaultArr, { index: 2 });
  };

  // Operation executor
  const handleExecute = (op: AlgorithmId = activeTab) => {
    if (op === 'access') {
      const idx = Math.min(Math.max(0, accessIndex), array.length - 1);
      runner.run('access', array, { index: idx });
      setSelectedIndex(idx);
    } else if (op === 'insert') {
      const idx = Math.min(Math.max(0, insertIndex), array.length);
      runner.run('insert', array, { index: idx, value: insertValue });
    } else if (op === 'delete') {
      const idx = Math.min(Math.max(0, deleteIndex), array.length - 1);
      runner.run('delete', array, { index: idx });
    } else if (op === 'update') {
      const idx = Math.min(Math.max(0, updateIndex), array.length - 1);
      runner.run('update', array, { index: idx, value: updateValue });
    } else if (op === 'swap') {
      runner.run('swap', array, { indexA: swapIndexA, indexB: swapIndexB });
    } else if (op === 'reverse') {
      runner.run('reverse', array, {});
    } else if (op === 'rotate') {
      runner.run('rotate', array, { kPositions: rotatePositions });
    }
  };

  // Switch operation tab and automatically execute
  const handleSelectTab = (tab: AlgorithmId) => {
    setActiveTab(tab);
    if (tab === 'access') {
      const idx = selectedIndex !== null ? selectedIndex : 2;
      setAccessIndex(idx);
      runner.run('access', array, { index: idx });
    } else if (tab === 'reverse') {
      runner.run('reverse', array, {});
    } else if (tab === 'insert') {
      runner.run('insert', array, { index: insertIndex, value: insertValue });
    } else if (tab === 'delete') {
      runner.run('delete', array, { index: deleteIndex });
    } else if (tab === 'update') {
      runner.run('update', array, { index: updateIndex, value: updateValue });
    } else if (tab === 'swap') {
      runner.run('swap', array, { indexA: swapIndexA, indexB: swapIndexB });
    } else if (tab === 'rotate') {
      runner.run('rotate', array, { kPositions: rotatePositions });
    }
  };

  // Interactive Click on Array Element:
  // In Access mode: immediately accesses that cell and runs step.
  // In other modes: syncs the input index to the clicked cell.
  const handleElementClick = (idx: number) => {
    setSelectedIndex(idx);
    if (activeTab === 'access') {
      setAccessIndex(idx);
      runner.run('access', array, { index: idx });
    } else if (activeTab === 'insert') {
      setInsertIndex(idx);
    } else if (activeTab === 'delete') {
      setDeleteIndex(idx);
    } else if (activeTab === 'update') {
      setUpdateIndex(idx);
    } else if (activeTab === 'swap') {
      setSwapIndexB(idx);
    }
  };

  const currentStepArray = runner.currentStep ? runner.currentStep.arrayState : array;
  const activeCodeLine = runner.currentStep?.codeLine;
  const pseudocodeLines = ARRAY_PSEUDOCODE[runner.pseudocodeKey] || ARRAY_PSEUDOCODE.access;

  // Metadata for operations
  const operations: Array<{
    id: AlgorithmId;
    label: string;
    icon: React.ReactNode;
    time: string;
    space: string;
    badgeColor: string;
  }> = [
    {
      id: 'access',
      label: 'Access',
      icon: <Eye className="w-3.5 h-3.5 text-blue-400" />,
      time: 'O(1)',
      space: 'O(1)',
      badgeColor: 'border-blue-500/40 text-blue-400',
    },
    {
      id: 'insert',
      label: 'Insert',
      icon: <CornerDownRight className="w-3.5 h-3.5 text-emerald-400" />,
      time: 'O(n)',
      space: 'O(1)',
      badgeColor: 'border-emerald-500/40 text-emerald-400',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 className="w-3.5 h-3.5 text-red-400" />,
      time: 'O(n)',
      space: 'O(1)',
      badgeColor: 'border-red-500/40 text-red-400',
    },
    {
      id: 'update',
      label: 'Update',
      icon: <Edit className="w-3.5 h-3.5 text-blue-400" />,
      time: 'O(1)',
      space: 'O(1)',
      badgeColor: 'border-blue-500/40 text-blue-400',
    },
    {
      id: 'swap',
      label: 'Swap',
      icon: <ArrowRightLeft className="w-3.5 h-3.5 text-purple-400" />,
      time: 'O(1)',
      space: 'O(1)',
      badgeColor: 'border-purple-500/40 text-purple-400',
    },
    {
      id: 'reverse',
      label: 'Reverse',
      icon: <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />,
      time: 'O(n)',
      space: 'O(1)',
      badgeColor: 'border-amber-500/40 text-amber-400',
    },
    {
      id: 'rotate',
      label: 'Rotate',
      icon: <RotateCw className="w-3.5 h-3.5 text-teal-400" />,
      time: 'O(n)',
      space: 'O(1)',
      badgeColor: 'border-teal-500/40 text-teal-400',
    },
  ];

  // Calculation details for Access mode
  const currentAccessIdx =
    runner.currentStep?.variables?.index !== undefined
      ? Number(runner.currentStep.variables.index)
      : accessIndex;
  const baseAddressHex = 0x1000;
  const effectiveAddressHex = `0x${(baseAddressHex + currentAccessIdx * 4).toString(16).toUpperCase()}`;
  const accessedValue = array[currentAccessIdx];

  return (
    <div className="space-y-5 w-full">
      {/* Top Header & Operation Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/70 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100 font-mono tracking-tight">
                Array Laboratory • Side-by-Side Debugger
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                Live Logic View
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Observe memory cell pointers on the left while code lines execute on the right.
            </p>
          </div>
        </div>

        {/* Operation Selection Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {operations.map((op) => {
            const isSelected = activeTab === op.id;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => handleSelectTab(op.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                    : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {op.icon}
                <span>{op.label}</span>
                <span
                  className={`text-[9px] px-1 rounded ${
                    isSelected ? 'bg-blue-700/80 text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {op.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Array Controls Generator Bar */}
      <ArrayControls
        array={array}
        onSetArray={(newArr) => {
          setArray(newArr);
          setSelectedIndex(null);
        }}
        onReset={handleReset}
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SIDE-BY-SIDE WORKBENCH GRID                                   */}
      {/* Left Column (7 cols): Visualizer, Memory Formula, Controls    */}
      {/* Right Column (5 cols): Live Logic View + State Debugger       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT PANE (VISUALIZER & ACTIONS) ================= */}
        <div className="xl:col-span-7 space-y-4">
          {/* Main Visualizer Stage */}
          <div className="p-4 sm:p-6 rounded-xl border border-slate-800 bg-slate-950/80 shadow-lg relative min-h-[220px] flex flex-col justify-between">
            {/* Click-to-Access Interactive Hint */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {activeTab === 'access'
                    ? '💡 Click any array cell below to immediately test O(1) memory access'
                    : `Active Operation: ${activeTab.toUpperCase()} • Click an element to target`}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 hidden sm:block">
                Base RAM: <span className="text-slate-400 font-bold">0x1000</span>
              </div>
            </div>

            {/* Array Elements Track */}
            <div className="py-2 flex items-center justify-center">
              <ArrayVisualizer
                array={currentStepArray}
                currentStep={runner.currentStep}
                selectedIndex={selectedIndex}
                onSelectIndex={handleElementClick}
              />
            </div>
          </div>

          {/* Dedicated Hardware Memory Dereference Box (Prominent for Access) */}
          {activeTab === 'access' && (
            <div className="p-4 rounded-xl border border-blue-500/40 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-950/80 shadow-md space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-300">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>HARDWARE MEMORY ARITHMETIC (CONSTANT TIME O(1))</span>
                </div>
                <Badge variant="accent">Single CPU Cycle</Badge>
              </div>

              {/* Mathematical Equation Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase">Base Address</span>
                  <span className="text-slate-200 font-bold">0x1000</span>
                </div>
                <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-slate-800 pt-1 sm:pt-0 sm:pl-3">
                  <span className="text-[10px] text-slate-500 uppercase">
                    Offset = Index ({currentAccessIdx}) × 4B
                  </span>
                  <span className="text-blue-400 font-bold">
                    +{currentAccessIdx * 4} bytes
                  </span>
                </div>
                <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-slate-800 pt-1 sm:pt-0 sm:pl-3">
                  <span className="text-[10px] text-slate-500 uppercase">Target RAM Cell</span>
                  <span className="text-emerald-400 font-bold">
                    {effectiveAddressHex} → {accessedValue ?? 'null'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-sans pt-1">
                <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-blue-200">Why O(1)? </strong>
                  The CPU does not search or loop. It calculates the exact hardware byte location
                  using one multiplication and one addition, retrieving{' '}
                  <code className="px-1 py-0.5 rounded bg-slate-800 font-mono text-blue-300">
                    arr[{currentAccessIdx}] = {accessedValue}
                  </code>{' '}
                  instantly.
                </span>
              </div>
            </div>
          )}

          {/* Playback Controls Bar */}
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

          {/* Operation Parameter Controls & Quick Runner */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="font-semibold text-slate-200 uppercase tracking-wider">
                Configure & Run: {activeTab.toUpperCase()}
              </span>
              <span className="text-slate-500 text-[11px]">
                Array Length: {array.length}
              </span>
            </div>

            {/* Dynamic Inputs per Operation */}
            {activeTab === 'access' && (
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Quick Access Index:</span>
                  <div className="flex flex-wrap items-center gap-1">
                    {array.map((val, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleElementClick(i)}
                        className={`w-7 h-7 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                          currentAccessIdx === i
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                        title={`Access index [${i}] = ${val}`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1">
                    <Input
                      label={`Custom Index [0..${Math.max(0, array.length - 1)}]`}
                      type="number"
                      min={0}
                      max={Math.max(0, array.length - 1)}
                      value={accessIndex}
                      onChange={(e) => setAccessIndex(Number(e.target.value))}
                    />
                  </div>
                  <div className="pt-5">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleExecute('access')}
                      className="gap-2 font-mono text-xs font-semibold whitespace-nowrap"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Access arr[{accessIndex}]</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insert' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <Input
                  label="Value to Insert"
                  type="number"
                  value={insertValue}
                  onChange={(e) => setInsertValue(Number(e.target.value))}
                />
                <Input
                  label={`Index [0..${array.length}]`}
                  type="number"
                  min={0}
                  max={array.length}
                  value={insertIndex}
                  onChange={(e) => setInsertIndex(Number(e.target.value))}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleExecute('insert')}
                  className="gap-2 font-mono text-xs font-semibold"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Insert at [{insertIndex}]</span>
                </Button>
              </div>
            )}

            {activeTab === 'delete' && (
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Input
                    label={`Index to Delete [0..${Math.max(0, array.length - 1)}]`}
                    type="number"
                    min={0}
                    max={Math.max(0, array.length - 1)}
                    value={deleteIndex}
                    onChange={(e) => setDeleteIndex(Number(e.target.value))}
                  />
                </div>
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => handleExecute('delete')}
                  className="gap-2 font-mono text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete at [{deleteIndex}]</span>
                </Button>
              </div>
            )}

            {activeTab === 'update' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <Input
                  label={`Target Index [0..${Math.max(0, array.length - 1)}]`}
                  type="number"
                  min={0}
                  max={Math.max(0, array.length - 1)}
                  value={updateIndex}
                  onChange={(e) => setUpdateIndex(Number(e.target.value))}
                />
                <Input
                  label="New Value"
                  type="number"
                  value={updateValue}
                  onChange={(e) => setUpdateValue(Number(e.target.value))}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleExecute('update')}
                  className="gap-2 font-mono text-xs font-semibold"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Update arr[{updateIndex}]</span>
                </Button>
              </div>
            )}

            {activeTab === 'swap' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <Input
                  label={`Index A [0..${Math.max(0, array.length - 1)}]`}
                  type="number"
                  min={0}
                  max={Math.max(0, array.length - 1)}
                  value={swapIndexA}
                  onChange={(e) => setSwapIndexA(Number(e.target.value))}
                />
                <Input
                  label={`Index B [0..${Math.max(0, array.length - 1)}]`}
                  type="number"
                  min={0}
                  max={Math.max(0, array.length - 1)}
                  value={swapIndexB}
                  onChange={(e) => setSwapIndexB(Number(e.target.value))}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleExecute('swap')}
                  className="gap-2 font-mono text-xs font-semibold"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Swap [{swapIndexA}] ⇄ [{swapIndexB}]</span>
                </Button>
              </div>
            )}

            {activeTab === 'reverse' && (
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-300 font-mono">
                  Two-pointer swap convergence inward: ⌊{array.length}/2⌋ ={' '}
                  {Math.floor(array.length / 2)} steps.
                </span>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleExecute('reverse')}
                  className="gap-2 font-mono text-xs font-semibold"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Full Reverse</span>
                </Button>
              </div>
            )}

            {activeTab === 'rotate' && (
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Input
                    label="Positions to Rotate (k)"
                    type="number"
                    min={1}
                    max={array.length * 2}
                    value={rotatePositions}
                    onChange={(e) => setRotatePositions(Number(e.target.value))}
                  />
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleExecute('rotate')}
                  className="gap-2 font-mono text-xs font-semibold"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate by {rotatePositions}</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT PANE (LOGIC VIEW & DEBUGGER) ================= */}
        <div className="xl:col-span-5 space-y-4 xl:sticky xl:top-20">
          {/* Live Code Logic View */}
          <LogicView
            lines={pseudocodeLines}
            activeLineNumber={activeCodeLine}
            algorithmName={`Array ${activeTab.toUpperCase()} Logic`}
          />

          {/* State Debugger & Variables Scope */}
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
