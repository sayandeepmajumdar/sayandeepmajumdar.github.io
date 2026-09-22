import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Dices, RotateCcw, Plus, Minus, Edit3, ArrowUpDown, Trash2 } from 'lucide-react';

export interface ArrayControlsProps {
  array: number[];
  onSetArray: (newArray: number[]) => void;
  onReset: () => void;
  maxSize?: number;
  minSize?: number;
}

export const ArrayControls: React.FC<ArrayControlsProps> = ({
  array,
  onSetArray,
  onReset,
  maxSize = 14,
  minSize = 3,
}) => {
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customInput, setCustomInput] = useState(array.join(', '));
  const [customError, setCustomError] = useState<string | null>(null);

  const generateRandomArray = (size: number = array.length) => {
    const s = Math.max(minSize, Math.min(maxSize, size));
    const newArr: number[] = [];
    while (newArr.length < s) {
      const val = Math.floor(Math.random() * 90) + 10;
      if (!newArr.includes(val)) newArr.push(val);
    }
    onSetArray(newArr);
  };

  const handleSizeChange = (delta: number) => {
    const newSize = array.length + delta;
    if (newSize < minSize || newSize > maxSize) return;

    if (delta > 0) {
      const randomVal = Math.floor(Math.random() * 90) + 10;
      onSetArray([...array, randomVal]);
    } else {
      onSetArray(array.slice(0, newSize));
    }
  };

  const handleSetSorted = () => {
    const sorted = [...array].sort((a, b) => a - b);
    onSetArray(sorted);
  };

  const handleSetReversed = () => {
    const reversed = [...array].sort((a, b) => b - a);
    onSetArray(reversed);
  };

  const handleClear = () => {
    onSetArray([]);
  };

  const handleSaveCustom = () => {
    setCustomError(null);
    const parts = customInput.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length < minSize) {
      setCustomError(`Please enter at least ${minSize} numbers.`);
      return;
    }
    if (parts.length > maxSize) {
      setCustomError(`Maximum array size is ${maxSize} elements.`);
      return;
    }

    const numbers: number[] = [];
    for (const p of parts) {
      const n = Number(p);
      if (isNaN(n) || !Number.isInteger(n)) {
        setCustomError(`'${p}' is not a valid integer. Enter numbers separated by commas.`);
        return;
      }
      if (n < -99 || n > 999) {
        setCustomError(`Numbers should be between -99 and 999.`);
        return;
      }
      numbers.push(n);
    }

    onSetArray(numbers);
    setCustomModalOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/80 shadow-md">
      {/* Array Size Stepper */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-slate-400">Size:</span>
        <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => handleSizeChange(-1)}
            disabled={array.length <= minSize}
            className="px-2 py-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 transition-colors"
            title="Decrease array size"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 py-1 text-xs font-mono font-bold text-blue-400 border-x border-slate-800 min-w-[32px] text-center">
            {array.length}
          </span>
          <button
            type="button"
            onClick={() => handleSizeChange(1)}
            disabled={array.length >= maxSize}
            className="px-2 py-1.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 transition-colors"
            title="Increase array size"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Generation Actions */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => generateRandomArray()}
          className="text-xs font-mono"
          title="Generate fresh random array"
        >
          <Dices className="w-3.5 h-3.5 mr-1 text-blue-400" />
          <span>Random</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setCustomInput(array.join(', '));
            setCustomError(null);
            setCustomModalOpen(true);
          }}
          className="text-xs font-mono"
          title="Enter custom array"
        >
          <Edit3 className="w-3.5 h-3.5 mr-1 text-purple-400" />
          <span>Custom</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleSetSorted}
          className="text-xs font-mono"
          title="Sort in ascending order"
        >
          <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-emerald-400" />
          <span>Sort</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleSetReversed}
          className="text-xs font-mono"
          title="Reverse array elements"
        >
          <span>Reverse</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs font-mono text-slate-400 hover:text-slate-200"
          title="Reset to default array"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          <span>Reset</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10"
          title="Clear array"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Custom Array Modal */}
      <Modal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        title="Custom Array Input"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Enter integer values separated by commas (minimum {minSize}, maximum {maxSize} elements).
          </p>

          <Input
            label="Array Elements"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. 12, 45, 23, 67, 18, 34"
            error={customError || undefined}
            hint="Example: 10, 20, 30, 42, 50"
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setCustomModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveCustom}>
              Apply Array
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
