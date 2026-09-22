import React, { useState, useEffect } from 'react';
import {
  LinkedListOperationId,
  LinkedListRunnerOptions,
  LinkedListState,
} from '../features/linked-list/types';
import {
  cloneListState,
  createListFromValues,
  getOrderedNodes,
} from '../features/linked-list/lib/memoryAddress';
import { useLinkedListRunner } from '../features/linked-list/hooks/useLinkedListRunner';
import { getPseudocodeForLinkedList } from '../features/linked-list/engine/LinkedListRunner';
import { LinkedListVisualizer } from '../features/linked-list/components/LinkedListVisualizer';
import { LinkedListMemoryView } from '../features/linked-list/components/LinkedListMemoryView';
import { LinkedListControls } from '../features/linked-list/components/LinkedListControls';
import { LinkedListInspector } from '../features/linked-list/components/LinkedListInspector';
import { PointerInspector } from '../features/linked-list/components/PointerInspector';
import { GuidedLearningPath } from '../features/linked-list/components/GuidedLearningPath';
import { QuickTourModal } from '../features/linked-list/components/QuickTourModal';
import { LinkedListTheoryModal } from '../features/linked-list/components/LinkedListTheoryModal';
import { LogicView } from '../components/visualization/LogicView';
import { PlaybackControls } from '../components/visualization/PlaybackControls';
import { AlgorithmTimeline } from '../components/visualization/AlgorithmTimeline';
import { PredictionModal } from '../components/visualization/PredictionModal';
import {
  GitFork,
  Eye,
  HardDrive,
  CornerDownRight,
  ArrowRight,
  Trash2,
  Search,
  Hash,
  RotateCcw,
  Edit,
  ArrowRightLeft,
  Sparkles,
  Compass,
  FlaskConical,
  PlusCircle,
  Flame,
  BookOpen,
} from 'lucide-react';

type OperationCategory = 'insert' | 'delete' | 'search' | 'transform';

interface CategoryGroup {
  id: OperationCategory;
  label: string;
  icon: React.ReactNode;
  operations: Array<{
    id: LinkedListOperationId;
    label: string;
    icon: React.ReactNode;
    time: string;
    recommendedBadge?: string;
  }>;
}

const CATEGORIES: CategoryGroup[] = [
  {
    id: 'insert',
    label: 'Insert (4)',
    icon: <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />,
    operations: [
      {
        id: 'prepend',
        label: 'Prepend',
        icon: <CornerDownRight className="w-3.5 h-3.5 text-emerald-400" />,
        time: 'O(1)',
        recommendedBadge: '⭐ Start Here',
      },
      {
        id: 'append',
        label: 'Append',
        icon: <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />,
        time: 'O(1)',
      },
      {
        id: 'insertAt',
        label: 'Insert at Index',
        icon: <CornerDownRight className="w-3.5 h-3.5 text-teal-400" />,
        time: 'O(n)',
      },
      {
        id: 'insertAfter',
        label: 'Insert After Node',
        icon: <ArrowRightLeft className="w-3.5 h-3.5 text-blue-400" />,
        time: 'O(1)',
      },
    ],
  },
  {
    id: 'delete',
    label: 'Delete (4)',
    icon: <Trash2 className="w-3.5 h-3.5 text-rose-400" />,
    operations: [
      {
        id: 'deleteBeginning',
        label: 'Delete Head',
        icon: <Trash2 className="w-3.5 h-3.5 text-rose-400" />,
        time: 'O(1)',
      },
      {
        id: 'deleteEnd',
        label: 'Delete Tail',
        icon: <Trash2 className="w-3.5 h-3.5 text-rose-400" />,
        time: 'O(n)',
      },
      {
        id: 'deleteAt',
        label: 'Delete at Index',
        icon: <Trash2 className="w-3.5 h-3.5 text-rose-400" />,
        time: 'O(n)',
      },
      {
        id: 'deleteValue',
        label: 'Delete by Value',
        icon: <Trash2 className="w-3.5 h-3.5 text-rose-400" />,
        time: 'O(n)',
      },
    ],
  },
  {
    id: 'search',
    label: 'Search & Traverse (2)',
    icon: <Search className="w-3.5 h-3.5 text-blue-400" />,
    operations: [
      {
        id: 'search',
        label: 'Search Target',
        icon: <Search className="w-3.5 h-3.5 text-blue-400" />,
        time: 'O(n)',
      },
      {
        id: 'length',
        label: 'Count Length',
        icon: <Hash className="w-3.5 h-3.5 text-teal-400" />,
        time: 'O(n)',
      },
    ],
  },
  {
    id: 'transform',
    label: 'Transform (2)',
    icon: <RotateCcw className="w-3.5 h-3.5 text-amber-400" />,
    operations: [
      {
        id: 'reverse',
        label: 'Reverse List',
        icon: <RotateCcw className="w-3.5 h-3.5 text-amber-400" />,
        time: 'O(n)',
        recommendedBadge: '⭐ Flagship',
      },
      {
        id: 'update',
        label: 'Update Value',
        icon: <Edit className="w-3.5 h-3.5 text-purple-400" />,
        time: 'O(n)',
      },
    ],
  },
];

export const LinkedListLabPage: React.FC = () => {
  // Mode: guided learning quest vs sandbox workbench
  const [labMode, setLabMode] = useState<'guided' | 'sandbox'>('guided');
  const [tourOpen, setTourOpen] = useState(false);
  const [theoryOpen, setTheoryOpen] = useState(false);

  // Initial list state: [10, 20, 30, 40]
  const [listState, setListState] = useState<LinkedListState>(() =>
    createListFromValues([10, 20, 30, 40])
  );

  const [activeCategory, setActiveCategory] = useState<OperationCategory>('insert');
  const [activeTab, setActiveTab] = useState<LinkedListOperationId>('prepend');
  const [viewMode, setViewMode] = useState<'visual' | 'memory'>('visual');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const runner = useLinkedListRunner();

  // Run initial preview on mount or listState change
  useEffect(() => {
    runner.run(activeTab, listState, {});
  }, [listState]);

  // Sync state after mutation operations complete
  useEffect(() => {
    if (runner.isComplete && runner.currentStep) {
      const stepState = runner.currentStep.listState;
      const currentNodes = Object.keys(listState.nodes);
      const stepNodes = Object.keys(stepState.nodes);

      const hasChanged =
        currentNodes.length !== stepNodes.length ||
        stepState.headId !== listState.headId ||
        stepState.tailId !== listState.tailId ||
        stepNodes.some(
          (id) =>
            !listState.nodes[id] ||
            listState.nodes[id].value !== stepState.nodes[id].value ||
            listState.nodes[id].next !== stepState.nodes[id].next
        );

      if (hasChanged) {
        setListState(cloneListState(stepState));
      }
    }
  }, [runner.isComplete, runner.currentStep]);

  const handleReset = () => {
    const defaultState = createListFromValues([10, 20, 30, 40]);
    setListState(defaultState);
    setSelectedNodeId(null);
    runner.run(activeTab, defaultState, {});
  };

  const handleSelectTab = (tab: LinkedListOperationId) => {
    setActiveTab(tab);
    runner.run(tab, listState, {});
  };

  const handleExecuteOperation = (
    op: LinkedListOperationId,
    options: LinkedListRunnerOptions
  ) => {
    runner.run(op, listState, options);
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId === selectedNodeId ? null : nodeId);
  };

  // Trigger from Guided Path
  const handleTriggerGuidedOperation = (
    op: LinkedListOperationId,
    sampleState: LinkedListState,
    options: LinkedListRunnerOptions
  ) => {
    setListState(sampleState);
    setActiveTab(op);

    // Find and activate the appropriate category
    const cat = CATEGORIES.find((c) => c.operations.some((o) => o.id === op));
    if (cat) {
      setActiveCategory(cat.id);
    }

    runner.run(op, sampleState, options);
  };

  const currentStepListState = runner.currentStep
    ? runner.currentStep.listState
    : listState;

  const pseudocodeLines = getPseudocodeForLinkedList(runner.currentOperation);
  const activeCodeLine = runner.currentStep?.codeLine;

  const currentCategoryGroup =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  // Convert LinkedListAlgorithmStep to compatible structure for AlgorithmTimeline
  const timelineSteps = runner.steps.map((s) => ({
    id: s.id,
    stepIndex: s.stepIndex,
    type: s.type as any,
    arrayState: [],
    explanation: s.explanation,
    stats: {
      comparisons: s.stats.comparisons,
      swaps: s.stats.pointerWrites,
      reads: s.stats.traversals,
      writes: s.stats.pointerWrites,
    },
  }));

  return (
    <div className="space-y-5 w-full">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* TOP HEADER: Mode Switcher & Quick Tour Bar                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/80 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100 font-mono tracking-tight">
                Linked List Laboratory
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                Singly Linked List V1
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive node references, pointer rewiring, and simulated RAM heap visualizer.
            </p>
          </div>
        </div>

        {/* Action Controls: Mode Switcher + 1-Click Quick Tour + Read Theory */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Read Theory Button */}
          <button
            type="button"
            onClick={() => setTheoryOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/40 text-blue-300 hover:bg-blue-500/25 hover:text-blue-200 transition-all font-mono text-xs font-bold shadow-xs cursor-pointer"
            title="Read in-depth theory, pointer mechanics, Big-O table, and common traps"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Read Theory</span>
          </button>

          {/* 1-Click Quick Tour Button */}
          <button
            type="button"
            onClick={() => setTourOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 hover:text-amber-200 transition-all font-mono text-xs font-bold shadow-xs cursor-pointer"
            title="Open 45-second visual tour for beginners"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Quick Tour (45s)</span>
          </button>

          {/* Mode Switcher: Guided vs Sandbox */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => setLabMode('guided')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                labMode === 'guided'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Guided Quest</span>
            </button>
            <button
              type="button"
              onClick={() => setLabMode('sandbox')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                labMode === 'sandbox'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-teal-300" />
              <span>Sandbox Lab</span>
            </button>
          </div>

          {/* View Mode Switcher: Visual vs RAM Memory */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode('visual')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                viewMode === 'visual'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visual node cards with SVG arrows"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Visual</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('memory')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                viewMode === 'memory'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Simulated heap memory addresses table"
            >
              <HardDrive className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">RAM</span>
            </button>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* GUIDED LEARNING PATH BANNER (when in Guided mode)            */}
      {/* ───────────────────────────────────────────────────────────── */}
      {labMode === 'guided' && (
        <GuidedLearningPath
          onTriggerOperation={handleTriggerGuidedOperation}
          onSwitchToSandbox={() => setLabMode('sandbox')}
          onOpenTheory={() => setTheoryOpen(true)}
        />
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CATEGORIZED OPERATION SELECTOR (when in Sandbox mode)         */}
      {/* ───────────────────────────────────────────────────────────── */}
      {labMode === 'sandbox' && (
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-3 shadow-md">
          {/* Top Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-mono font-bold text-slate-500 mr-1 uppercase">
                Categories:
              </span>
              {CATEGORIES.map((cat) => {
                const isActiveCat = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      handleSelectTab(cat.operations[0].id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      isActiveCat
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 shadow-xs'
                        : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Choose an operation to configure and test below
            </span>
          </div>

          {/* Sub-Operations Row */}
          <div className="flex flex-wrap items-center gap-2">
            {currentCategoryGroup.operations.map((op) => {
              const isSelected = activeTab === op.id;
              return (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => handleSelectTab(op.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
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
                  {op.recommendedBadge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {op.recommendedBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* LIST CONTROLS GENERATOR BAR (Sandbox mode only)               */}
      {/* ───────────────────────────────────────────────────────────── */}
      {labMode === 'sandbox' && (
        <LinkedListControls
          listState={listState}
          onSetListState={(newState) => {
            setListState(newState);
            setSelectedNodeId(null);
          }}
          onReset={handleReset}
        />
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SIDE-BY-SIDE WORKBENCH GRID                                   */}
      {/* Left Column (7 cols): Visual Stage, Playback, Inspector       */}
      {/* Right Column (5 cols): Logic View, Pointer Debugger           */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT PANE (VISUALIZER & CONTROLS) ================= */}
        <div className="xl:col-span-7 space-y-4">
          {/* Main Visualizer Stage */}
          <div className="p-4 sm:p-6 rounded-xl border border-slate-800 bg-slate-950/80 shadow-lg relative min-h-[240px] flex flex-col justify-between">
            {/* Stage Header Info */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {viewMode === 'visual'
                    ? '💡 Click any node card below to inspect its data and next pointer'
                    : 'Heap Memory Table • Observe non-contiguous allocation gaps'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 hidden sm:block">
                Chain Length: <span className="text-blue-400 font-bold">{getOrderedNodes(currentStepListState).length}</span>
              </div>
            </div>

            {/* Display Visual Nodes or Simulated Memory Table */}
            {viewMode === 'visual' ? (
              <LinkedListVisualizer
                listState={currentStepListState}
                currentStep={runner.currentStep}
                selectedNodeId={selectedNodeId}
                onSelectNode={handleNodeClick}
              />
            ) : (
              <LinkedListMemoryView
                listState={currentStepListState}
                currentStep={runner.currentStep}
                selectedNodeId={selectedNodeId}
                onSelectNode={handleNodeClick}
              />
            )}
          </div>

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
              steps={timelineSteps}
              currentStepIndex={runner.currentStepIndex}
              onSelectStep={runner.goToStep}
            />
          </div>

          {/* Operation Configuration & Execution Inspector */}
          <LinkedListInspector
            listState={currentStepListState}
            activeOperation={activeTab}
            selectedNodeId={selectedNodeId}
            onExecute={handleExecuteOperation}
          />
        </div>

        {/* ================= RIGHT PANE (LOGIC VIEW & POINTER DEBUGGER) ================= */}
        <div className="xl:col-span-5 space-y-4 xl:sticky xl:top-20">
          {/* Live Code Logic View */}
          <LogicView
            lines={pseudocodeLines}
            activeLineNumber={activeCodeLine}
            algorithmName={`Linked List ${activeTab.toUpperCase()} Logic`}
          />

          {/* Dedicated Pointer State Debugger Panel */}
          <PointerInspector
            currentStep={runner.currentStep}
            totalSteps={runner.steps.length}
            listState={currentStepListState}
            selectedNodeId={selectedNodeId}
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

      {/* Quick Tour Modal */}
      <QuickTourModal
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
        onStartGuidedPath={() => {
          setLabMode('guided');
          setTourOpen(false);
        }}
      />

      {/* Comprehensive Read Theory Modal */}
      <LinkedListTheoryModal
        isOpen={theoryOpen}
        onClose={() => setTheoryOpen(false)}
      />
    </div>
  );
};
