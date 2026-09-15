import React from 'react';
import { ScientificField } from '../types';
import { ALL_FIELDS, SCIENTIFIC_FIELDS } from '../data/fields';
import { Filter, X } from 'lucide-react';

interface FieldFilterBarProps {
  selectedField: ScientificField | null;
  onSelectField: (field: ScientificField | null) => void;
}

export const FieldFilterBar: React.FC<FieldFilterBarProps> = ({
  selectedField,
  onSelectField,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none py-1">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400 shrink-0 mr-1 hidden md:inline-flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <span>Filter Field:</span>
        </span>

        {ALL_FIELDS.map((field) => {
          const cfg = SCIENTIFIC_FIELDS[field];
          const isSelected = selectedField === field;

          return (
            <button
              key={field}
              type="button"
              onClick={() => onSelectField(isSelected ? null : field)}
              className={`h-10 px-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border select-none ${
                isSelected
                  ? 'bg-white/20 text-white shadow-md'
                  : 'bg-[#0e1322] text-stone-300 hover:text-white hover:bg-white/10 border-white/10'
              }`}
              style={
                isSelected
                  ? {
                      borderColor: cfg.color,
                      backgroundColor: `${cfg.color}25`,
                      color: '#ffffff',
                      boxShadow: `0 0 16px -4px ${cfg.color}50`,
                    }
                  : {}
              }
              aria-pressed={isSelected}
            >
              <span aria-hidden="true">{cfg.icon}</span>
              <span>{field}</span>
              {isSelected && <X className="w-3.5 h-3.5 ml-0.5 opacity-80" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
