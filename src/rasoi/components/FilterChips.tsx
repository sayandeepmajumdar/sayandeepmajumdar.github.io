import React from 'react';
import { FilterState } from '../types';
import { X, RotateCcw } from 'lucide-react';

interface FilterChipsProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ filters, onChange, onReset }) => {
  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.searchQuery) {
    chips.push({
      label: `"${filters.searchQuery}"`,
      onRemove: () => onChange({ ...filters, searchQuery: '' }),
    });
  }

  if (filters.region !== 'All') {
    chips.push({
      label: `Region: ${filters.region}`,
      onRemove: () => onChange({ ...filters, region: 'All' }),
    });
  }

  if (filters.diet !== 'All') {
    chips.push({
      label: `Diet: ${filters.diet}`,
      onRemove: () => onChange({ ...filters, diet: 'All' }),
    });
  }

  if (filters.category !== 'All') {
    chips.push({
      label: `Course: ${filters.category}`,
      onRemove: () => onChange({ ...filters, category: 'All' }),
    });
  }

  if (filters.cookingTime !== 'All') {
    chips.push({
      label: `Time: ${filters.cookingTime}`,
      onRemove: () => onChange({ ...filters, cookingTime: 'All' }),
    });
  }

  if (filters.spiceLevel !== 'All') {
    chips.push({
      label: `Spice: ${filters.spiceLevel}`,
      onRemove: () => onChange({ ...filters, spiceLevel: 'All' }),
    });
  }

  if (filters.difficulty !== 'All') {
    chips.push({
      label: `Difficulty: ${filters.difficulty}`,
      onRemove: () => onChange({ ...filters, difficulty: 'All' }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider mr-1">
        Active filters:
      </span>
      {chips.map((chip, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-900 shadow-2xs"
        >
          <span>{chip.label}</span>
          <button
            onClick={chip.onRemove}
            aria-label={`Remove filter ${chip.label}`}
            className="p-0.5 rounded-full hover:bg-rose-200/80 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {chips.length > 1 && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-rose-900 font-semibold ml-2 hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear all</span>
        </button>
      )}
    </div>
  );
};
