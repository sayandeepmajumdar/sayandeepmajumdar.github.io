import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { Play, ArrowRightLeft, CornerDownRight, Trash2, Edit, Eye, RotateCw } from 'lucide-react';
import { AlgorithmId, RunnerOptions } from '../../../engine/AlgorithmRunner';

export interface ArrayInspectorProps {
  array: number[];
  selectedIndex: number | null;
  onExecute: (op: AlgorithmId, options: RunnerOptions) => void;
}

export const ArrayInspector: React.FC<ArrayInspectorProps> = ({
  array,
  selectedIndex,
  onExecute,
}) => {
  const [activeTab, setActiveTab] = useState<AlgorithmId>('insert');

  // Input states
  const [insertValue, setInsertValue] = useState<number>(42);
  const [insertIndex, setInsertIndex] = useState<number>(
    selectedIndex !== null ? selectedIndex : Math.min(3, array.length)
  );

  const [deleteIndex, setDeleteIndex] = useState<number>(
    selectedIndex !== null ? selectedIndex : 2
  );

  const [updateIndex, setUpdateIndex] = useState<number>(
    selectedIndex !== null ? selectedIndex : 1
  );
  const [updateValue, setUpdateValue] = useState<number>(99);

  const [accessIndex, setAccessIndex] = useState<number>(
    selectedIndex !== null ? selectedIndex : 0
  );

  const [swapIndexA, setSwapIndexA] = useState<number>(0);
  const [swapIndexB, setSwapIndexB] = useState<number>(Math.min(2, Math.max(0, array.length - 1)));

  const [rotatePositions, setRotatePositions] = useState<number>(2);

  // Sync selected index from array visualizer clicks
  React.useEffect(() => {
    if (selectedIndex !== null) {
      if (activeTab === 'insert') setInsertIndex(selectedIndex);
      if (activeTab === 'delete') setDeleteIndex(selectedIndex);
      if (activeTab === 'update') setUpdateIndex(selectedIndex);
      if (activeTab === 'access') setAccessIndex(selectedIndex);
    }
  }, [selectedIndex, activeTab]);

  const n = array.length;

  const metadata: Record<
    AlgorithmId,
    {
      title: string;
      icon: React.ReactNode;
      time: string;
      space: string;
      explanation: string;
    }
  > = {
    access: {
      title: 'Direct Memory Access',
      icon: <Eye className="w-4 h-4 text-blue-400" />,
      time: 'O(1)',
      space: 'O(1)',
      explanation:
        'Calculates effective memory address Base + (index × 4) bytes. Zero iterations required.',
    },
    insert: {
      title: 'Insert at Index',
      icon: <CornerDownRight className="w-4 h-4 text-emerald-400" />,
      time: 'O(n)',
      space: 'O(1) auxiliary',
      explanation: `Elements from index ${insertIndex} to ${n - 1} must shift right one slot to make room for ${insertValue}.`,
    },
    delete: {
      title: 'Delete at Index',
      icon: <Trash2 className="w-4 h-4 text-red-400" />,
      time: 'O(n)',
      space: 'O(1)',
      explanation: `Elements after index ${deleteIndex} must shift left one slot to close the vacant memory hole.`,
    },
    update: {
      title: 'Update Value',
      icon: <Edit className="w-4 h-4 text-blue-400" />,
      time: 'O(1)',
      space: 'O(1)',
      explanation: 'Overwrites existing memory cell in-place. No elements need to shift.',
    },
    swap: {
      title: 'Swap Elements',
      icon: <ArrowRightLeft className="w-4 h-4 text-purple-400" />,
      time: 'O(1)',
      space: 'O(1)',
      explanation: 'Exchanges two memory cells using a temporary storage variable.',
    },
    reverse: {
      title: 'Reverse Array',
      icon: <ArrowRightLeft className="w-4 h-4 text-amber-400" />,
      time: 'O(n)',
      space: 'O(1)',
      explanation:
        'Uses two converging pointers (left & right) swapping symmetric opposite elements inward.',
    },
    rotate: {
      title: 'Rotate Array',
      icon: <RotateCw className="w-4 h-4 text-teal-400" />,
      time: 'O(n × k)',
      space: 'O(1)',
      explanation: 'Cycles elements rightward by k positions with tail elements wrapping to index 0.',
    },
    linearSearch: { title: '', icon: null, time: '', space: '', explanation: '' },
    binarySearch: { title: '', icon: null, time: '', space: '', explanation: '' },
    bubbleSort: { title: '', icon: null, time: '', space: '', explanation: '' },
    selectionSort: { title: '', icon: null, time: '', space: '', explanation: '' },
    insertionSort: { title: '', icon: null, time: '', space: '', explanation: '' },
  };

  const handleExecute = () => {
    if (activeTab === 'access') {
      onExecute('access', { index: accessIndex });
    } else if (activeTab === 'insert') {
      onExecute('insert', { index: insertIndex, value: insertValue });
    } else if (activeTab === 'delete') {
      onExecute('delete', { index: deleteIndex });
    } else if (activeTab === 'update') {
      onExecute('update', { index: updateIndex, value: updateValue });
    } else if (activeTab === 'swap') {
      onExecute('swap', { indexA: swapIndexA, indexB: swapIndexB });
    } else if (activeTab === 'reverse') {
      onExecute('reverse', {});
    } else if (activeTab === 'rotate') {
      onExecute('rotate', { kPositions: rotatePositions });
    }
  };

  const operations: Array<{ id: AlgorithmId; label: string }> = [
    { id: 'access', label: 'Access' },
    { id: 'insert', label: 'Insert' },
    { id: 'delete', label: 'Delete' },
    { id: 'update', label: 'Update' },
    { id: 'swap', label: 'Swap' },
    { id: 'reverse', label: 'Reverse' },
    { id: 'rotate', label: 'Rotate' },
  ];

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-md">
      {/* Operation Tabs Header */}
      <div className="flex overflow-x-auto p-1.5 bg-slate-900/90 border-b border-slate-800 scrollbar-none gap-1">
        {operations.map((op) => (
          <button
            key={op.id}
            type="button"
            onClick={() => setActiveTab(op.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === op.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {op.label}
          </button>
        ))}
      </div>

      {/* Operation Content & Controls */}
      <div className="p-4 space-y-4">
        {/* Title and Complexity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-slate-200 text-sm">
            {metadata[activeTab].icon}
            <span>{metadata[activeTab].title}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="accent">Time: {metadata[activeTab].time}</Badge>
            <Badge variant="outline">Space: {metadata[activeTab].space}</Badge>
          </div>
        </div>

        {/* Dynamic Inputs per Operation */}
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 space-y-3">
          {activeTab === 'access' && (
            <Input
              label={`Index to Access [0..${n > 0 ? n - 1 : 0}]`}
              type="number"
              min={0}
              max={Math.max(0, n - 1)}
              value={accessIndex}
              onChange={(e) => setAccessIndex(Number(e.target.value))}
            />
          )}

          {activeTab === 'insert' && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Value to Insert"
                type="number"
                value={insertValue}
                onChange={(e) => setInsertValue(Number(e.target.value))}
              />
              <Input
                label={`Insert Index [0..${n}]`}
                type="number"
                min={0}
                max={n}
                value={insertIndex}
                onChange={(e) => setInsertIndex(Number(e.target.value))}
              />
            </div>
          )}

          {activeTab === 'delete' && (
            <Input
              label={`Index to Delete [0..${n > 0 ? n - 1 : 0}]`}
              type="number"
              min={0}
              max={Math.max(0, n - 1)}
              value={deleteIndex}
              onChange={(e) => setDeleteIndex(Number(e.target.value))}
            />
          )}

          {activeTab === 'update' && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={`Index [0..${n > 0 ? n - 1 : 0}]`}
                type="number"
                min={0}
                max={Math.max(0, n - 1)}
                value={updateIndex}
                onChange={(e) => setUpdateIndex(Number(e.target.value))}
              />
              <Input
                label="New Value"
                type="number"
                value={updateValue}
                onChange={(e) => setUpdateValue(Number(e.target.value))}
              />
            </div>
          )}

          {activeTab === 'swap' && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={`Index A [0..${n > 0 ? n - 1 : 0}]`}
                type="number"
                min={0}
                max={Math.max(0, n - 1)}
                value={swapIndexA}
                onChange={(e) => setSwapIndexA(Number(e.target.value))}
              />
              <Input
                label={`Index B [0..${n > 0 ? n - 1 : 0}]`}
                type="number"
                min={0}
                max={Math.max(0, n - 1)}
                value={swapIndexB}
                onChange={(e) => setSwapIndexB(Number(e.target.value))}
              />
            </div>
          )}

          {activeTab === 'reverse' && (
            <div className="text-xs text-slate-300">
              Reverses all {n} elements in-place with ⌊{n}/2⌋ = {Math.floor(n / 2)} pairwise swaps.
            </div>
          )}

          {activeTab === 'rotate' && (
            <Input
              label="Positions to Rotate Right (k)"
              type="number"
              min={1}
              max={n * 2}
              value={rotatePositions}
              onChange={(e) => setRotatePositions(Number(e.target.value))}
            />
          )}

          <Button
            variant="primary"
            size="md"
            onClick={handleExecute}
            disabled={n === 0 && activeTab !== 'insert'}
            className="w-full gap-2 font-mono text-xs font-semibold"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute {activeTab.toUpperCase()} Step-by-Step</span>
          </Button>
        </div>

        {/* Pedagogical Description */}
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          {metadata[activeTab].explanation}
        </p>
      </div>
    </div>
  );
};
