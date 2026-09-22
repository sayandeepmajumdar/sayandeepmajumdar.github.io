import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Dices, RefreshCw, Trash2, PlusCircle, Sparkles } from 'lucide-react';
import { LinkedListState } from '../types';
import { createListFromValues, getOrderedNodes } from '../lib/memoryAddress';

export interface LinkedListControlsProps {
  listState: LinkedListState;
  onSetListState: (newState: LinkedListState) => void;
  onReset: () => void;
}

export const LinkedListControls: React.FC<LinkedListControlsProps> = ({
  listState,
  onSetListState,
  onReset,
}) => {
  const orderedNodes = getOrderedNodes(listState);
  const currentValuesStr = orderedNodes.map((n) => n.value).join(', ');

  const [customInput, setCustomInput] = useState<string>(currentValuesStr || '10, 20, 30, 40');
  const [randomSize, setRandomSize] = useState<number>(4);

  // Sync custom input when listState changes outside
  React.useEffect(() => {
    const vals = orderedNodes.map((n) => n.value).join(', ');
    if (vals) setCustomInput(vals);
  }, [listState]);

  const handleApplyCustom = () => {
    const parsed = customInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    const newState = createListFromValues(parsed);
    onSetListState(newState);
  };

  const handleGenerateRandom = () => {
    const size = Math.max(1, Math.min(8, randomSize));
    const vals: number[] = [];
    for (let i = 0; i < size; i++) {
      vals.push(Math.floor(Math.random() * 90) + 10);
    }
    const newState = createListFromValues(vals);
    onSetListState(newState);
    setCustomInput(vals.join(', '));
  };

  const handleClear = () => {
    onSetListState({ nodes: {}, headId: null, tailId: null });
    setCustomInput('');
  };

  const handlePreset = (presetValues: number[]) => {
    const newState = createListFromValues(presetValues);
    onSetListState(newState);
    setCustomInput(presetValues.join(', '));
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-md">
      {/* Top row: Custom Input & Quick Actions */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3">
        {/* Custom Comma-Separated Input */}
        <div className="flex-1">
          <Input
            label="Initial List Values (comma-separated numbers)"
            placeholder="e.g. 10, 20, 30, 40"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleApplyCustom();
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleApplyCustom}
            className="font-mono text-xs font-semibold gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create List</span>
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={handleGenerateRandom}
            className="font-mono text-xs gap-1.5"
            title={`Generate ${randomSize} random values`}
          >
            <Dices className="w-3.5 h-3.5 text-teal-400" />
            <span>Random ({randomSize})</span>
          </Button>

          <Button
            variant="ghost"
            size="md"
            onClick={onReset}
            className="font-mono text-xs gap-1.5 text-slate-400 hover:text-white"
            title="Reset to default [10, 20, 30, 40]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>

          <Button
            variant="ghost"
            size="md"
            onClick={handleClear}
            className="font-mono text-xs gap-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30"
            title="Clear all nodes (empty list)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty</span>
          </Button>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60 text-xs font-mono">
        <span className="text-slate-500 text-[11px]">Quick Presets:</span>
        <button
          type="button"
          onClick={() => handlePreset([10, 20, 30, 40])}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
        >
          Default [10, 20, 30, 40]
        </button>
        <button
          type="button"
          onClick={() => handlePreset([42])}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
        >
          Single Node [42]
        </button>
        <button
          type="button"
          onClick={() => handlePreset([15, 80])}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
        >
          Two Nodes [15, 80]
        </button>
        <button
          type="button"
          onClick={() => handlePreset([5, 12, 28, 45, 60, 75])}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
        >
          Long Chain (6 nodes)
        </button>
      </div>
    </div>
  );
};
