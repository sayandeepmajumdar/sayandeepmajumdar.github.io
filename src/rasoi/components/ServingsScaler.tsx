import React, { useState } from 'react';
import { Minus, Plus, Check, Copy, CheckCheck } from 'lucide-react';
import { IngredientGroup } from '../types';

interface ServingsScalerProps {
  baseServings: number;
  currentServings: number;
  onServingsChange: (newServings: number) => void;
  ingredients: IngredientGroup[];
}

export const ServingsScaler: React.FC<ServingsScalerProps> = ({
  baseServings,
  currentServings,
  onServingsChange,
  ingredients,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const scaleFactor = currentServings / baseServings;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatQuantity = (amount: number): string => {
    const scaled = amount * scaleFactor;
    if (scaled <= 0) return '';
    // Format nicely without ugly long decimals
    if (Number.isInteger(scaled)) return scaled.toString();
    const rounded = Math.round(scaled * 10) / 10;
    if (rounded === 0.5) return '1/2';
    if (rounded === 0.25) return '1/4';
    if (rounded === 0.75) return '3/4';
    if (rounded === 1.5) return '1 1/2';
    if (rounded === 2.5) return '2 1/2';
    return rounded.toString();
  };

  const handleCopyIngredients = () => {
    const text = ingredients
      .map((group) => {
        const items = group.items
          .map(
            (item) =>
              `- ${formatQuantity(item.amount)} ${item.unit} ${item.name}${
                item.notes ? ` (${item.notes})` : ''
              }`
          )
          .join('\n');
        return `[${group.name}]\n${items}`;
      })
      .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar: Scaler + Copy Grocery List */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Servings:
          </span>
          <div className="flex items-center gap-2 bg-white rounded-xl border border-stone-300 p-1 shadow-2xs">
            <button
              onClick={() => onServingsChange(Math.max(1, currentServings - 1))}
              disabled={currentServings <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Decrease servings"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-8 text-center font-bold text-base text-rose-950 font-serif">
              {currentServings}
            </span>

            <button
              onClick={() => onServingsChange(currentServings + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Increase servings"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {currentServings !== baseServings && (
            <button
              onClick={() => onServingsChange(baseServings)}
              className="text-xs font-semibold text-rose-800 hover:underline"
            >
              Reset ({baseServings})
            </button>
          )}
        </div>

        <button
          onClick={handleCopyIngredients}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs transition-colors self-start sm:self-auto"
        >
          {copied ? (
            <>
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-stone-500" />
              <span>Copy Ingredients</span>
            </>
          )}
        </button>
      </div>

      {/* Grouped Ingredients Checklist */}
      <div className="space-y-6">
        {ingredients.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-3">
            <h4 className="font-serif font-bold text-base text-rose-950 pb-1.5 border-b border-stone-200/90 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {group.name}
            </h4>

            <ul className="space-y-2">
              {group.items.map((item, itemIdx) => {
                const itemId = `${groupIdx}-${itemIdx}`;
                const isChecked = !!checkedItems[itemId];

                return (
                  <li
                    key={itemIdx}
                    onClick={() => toggleCheck(itemId)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-stone-50/80 border-stone-200 text-stone-400'
                        : 'bg-white border-stone-200/90 text-stone-800 hover:border-amber-400 shadow-2xs'
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <div className="text-sm flex-1 leading-snug">
                      <span className={`font-bold ${isChecked ? 'line-through' : 'text-rose-950'}`}>
                        {formatQuantity(item.amount)} {item.unit}
                      </span>{' '}
                      <span className={`capitalize ${isChecked ? 'line-through' : 'text-stone-900'}`}>
                        {item.name}
                      </span>
                      {item.notes && (
                        <span className="text-xs text-stone-500 italic block sm:inline sm:ml-1.5">
                          — {item.notes}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
