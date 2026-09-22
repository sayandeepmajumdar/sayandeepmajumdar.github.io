import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  CornerDownRight,
  Trash2,
  RotateCcw,
  Cpu,
  ChevronRight,
  ChevronLeft,
  Flame,
  BookOpen,
} from 'lucide-react';
import { LinkedListOperationId, LinkedListRunnerOptions, LinkedListState } from '../types';
import { createListFromValues } from '../lib/memoryAddress';

export interface GuidedLearningPathProps {
  onTriggerOperation: (
    op: LinkedListOperationId,
    sampleState: LinkedListState,
    options: LinkedListRunnerOptions
  ) => void;
  onSwitchToSandbox: () => void;
  onOpenTheory?: () => void;
}

export const GuidedLearningPath: React.FC<GuidedLearningPathProps> = ({
  onTriggerOperation,
  onSwitchToSandbox,
  onOpenTheory,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const chapters = [
    {
      id: 'ch-1',
      number: 1,
      title: 'Meet the Node & The Pointer Chain',
      badge: 'Foundation',
      timeEstimate: '2 mins',
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      setupValues: [10, 20, 30, 40],
      operation: 'search' as LinkedListOperationId,
      options: { targetValue: 30 },
      concept:
        'A linked list is made of independent nodes in memory. Each node has a DATA value and a NEXT pointer that stores the memory address of the next node. The chain always starts at HEAD and ends at NULL.',
      keyTakeaway:
        'Nodes are NOT stored next to each other like array lockers. They are connected exclusively by reference arrows.',
      callToAction: 'Step Through Traversal',
    },
    {
      id: 'ch-2',
      number: 2,
      title: 'The Magic of Prepend (Constant O(1) Time)',
      badge: 'Core Superpower',
      timeEstimate: '3 mins',
      icon: <CornerDownRight className="w-5 h-5 text-emerald-400" />,
      setupValues: [10, 20, 30, 40],
      operation: 'prepend' as LinkedListOperationId,
      options: { value: 5 },
      concept:
        'If you add an item at index 0 of an array, every existing item must shift right (O(n)). In a linked list, inserting at the front takes just 2 pointer rewires: point newNode.next to HEAD, then move HEAD to newNode!',
      keyTakeaway:
        'No elements are shifted or moved in memory. Prepend executes in instant O(1) time regardless of list size.',
      callToAction: 'Watch Prepend Execute',
    },
    {
      id: 'ch-3',
      number: 3,
      title: 'The Bypass Trick (Safe Deletion)',
      badge: 'Reference Rewiring',
      timeEstimate: '3 mins',
      icon: <Trash2 className="w-5 h-5 text-rose-400" />,
      setupValues: [10, 20, 30, 40],
      operation: 'deleteValue' as LinkedListOperationId,
      options: { targetValue: 20 },
      concept:
        'To delete a node, we do not erase memory directly. Instead, we instruct its predecessor to look past it: prev.next = curr.next. The unreferenced node is safely detached and reclaimed by Garbage Collection.',
      keyTakeaway:
        'Notice the bypass curve in the visualizer skipping over the deleted node. The chain remains complete without shifting.',
      callToAction: 'Observe Bypass & Detach',
    },
    {
      id: 'ch-4',
      number: 4,
      title: 'The 3-Pointer Dance (Reversing In-Place)',
      badge: 'Classic Interview Boss',
      timeEstimate: '4 mins',
      icon: <RotateCcw className="w-5 h-5 text-amber-400" />,
      setupValues: [10, 20, 30, 40],
      operation: 'reverse' as LinkedListOperationId,
      options: {},
      concept:
        'The famous 3-pointer reversal algorithm slides three pointers (prev, curr, next) along the list. At each node, it saves next = curr.next, flips curr.next = prev backwards, and steps forward.',
      keyTakeaway:
        'Watch the arrows flip direction one-by-one from pointing rightward to pointing leftward!',
      callToAction: 'Step Through 3-Pointer Reversal',
    },
  ];

  const currentChapter = chapters[activeChapterIndex];

  const handleLaunchCurrent = () => {
    const listState = createListFromValues(currentChapter.setupValues);
    onTriggerOperation(currentChapter.operation, listState, currentChapter.options);
  };

  return (
    <div className="p-5 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/30 via-slate-900/80 to-slate-950/90 shadow-lg space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider">
                GUIDED LEARNING QUEST
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                Beginner Track
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 font-mono">
              Step-by-Step Path to Master Pointers
            </h3>
          </div>
        </div>

        {/* Switch to Sandbox Link */}
        <button
          type="button"
          onClick={onSwitchToSandbox}
          className="text-xs font-mono text-slate-400 hover:text-blue-300 transition-colors flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Prefer free experimentation? Jump to Sandbox</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chapter Stepper Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {chapters.map((ch, idx) => {
          const isCurrent = idx === activeChapterIndex;
          const isDone = idx < activeChapterIndex;

          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChapterIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isCurrent
                  ? 'border-blue-500/80 bg-blue-600/15 ring-1 ring-blue-500/40 shadow-md'
                  : isDone
                  ? 'border-emerald-500/40 bg-slate-900/60 hover:bg-slate-900'
                  : 'border-slate-800 bg-slate-950/50 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  Chapter {ch.number}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  ch.icon
                )}
              </div>
              <div>
                <span
                  className={`text-xs font-mono font-bold block leading-snug line-clamp-1 ${
                    isCurrent ? 'text-blue-200' : 'text-slate-300'
                  }`}
                >
                  {ch.title}
                </span>
                <span className="text-[10px] text-slate-500">{ch.timeEstimate}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Chapter Card */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-mono text-slate-100">
              Chapter {currentChapter.number}: {currentChapter.title}
            </span>
            <Badge variant="accent">{currentChapter.badge}</Badge>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Initial List: [{currentChapter.setupValues.join(', ')}]
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {currentChapter.concept}
        </p>

        {/* Key Takeaway Callout */}
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-amber-300 font-semibold font-mono">What to watch: </strong>
            {currentChapter.keyTakeaway}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleLaunchCurrent}
              className="font-mono text-xs font-bold gap-2 shadow-md shadow-blue-500/20"
            >
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{currentChapter.callToAction}</span>
            </Button>
            {onOpenTheory && (
              <button
                type="button"
                onClick={onOpenTheory}
                className="text-[11px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-900 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Full Theory</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {activeChapterIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveChapterIndex((prev) => prev - 1)}
                className="font-mono text-xs gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Chapter</span>
              </Button>
            )}

            {activeChapterIndex < chapters.length - 1 ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveChapterIndex((prev) => prev + 1)}
                className="font-mono text-xs gap-1"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={onSwitchToSandbox}
                className="font-mono text-xs gap-1 font-semibold text-emerald-400"
              >
                <span>Quest Complete • Open Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
