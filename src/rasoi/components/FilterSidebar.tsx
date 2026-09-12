import React from 'react';
import { FilterState, Region, DietType, Category, Difficulty, SpiceLevel } from '../types';
import { REGIONS, CATEGORIES, DIETS } from '../data/recipes';
import { RotateCcw, X, SlidersHorizontal, Flame, Clock, ChefHat } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalFilteredCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  isOpenMobile,
  onCloseMobile,
  totalFilteredCount,
}) => {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  const spiceLevels: SpiceLevel[] = ['Mild', 'Medium', 'Spicy'];
  const timeOptions: FilterState['cookingTime'][] = [
    'All',
    'Under 30 min',
    '30–60 min',
    'Over 60 min',
  ];

  const hasActiveFilters =
    filters.region !== 'All' ||
    filters.diet !== 'All' ||
    filters.category !== 'All' ||
    filters.difficulty !== 'All' ||
    filters.cookingTime !== 'All' ||
    filters.spiceLevel !== 'All' ||
    filters.searchQuery !== '';

  const content = (
    <div className="space-y-6 text-sm text-stone-800">
      {/* Header with Results Count & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-rose-800" />
          <h2 className="font-serif font-bold text-base text-stone-900">Filter Recipes</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-rose-800 hover:text-rose-950 font-semibold hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all
          </button>
        )}
      </div>

      {/* 1. Cuisine / Region */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
          Cuisine / Region
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => updateFilter('region', 'All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filters.region === 'All'
                ? 'bg-rose-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Regions
          </button>
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() =>
                updateFilter('region', filters.region === region ? 'All' : region)
              }
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filters.region === region
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-rose-50 hover:text-rose-900'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Dietary Preference */}
      <div className="space-y-2.5 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
          Dietary Preference
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => updateFilter('diet', 'All')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
              filters.diet === 'All'
                ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Diets
          </button>
          {DIETS.map((diet) => (
            <button
              key={diet}
              onClick={() => updateFilter('diet', filters.diet === diet ? 'All' : diet)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                filters.diet === diet
                  ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-rose-50 hover:text-rose-900'
              }`}
            >
              {diet === 'Vegetarian' && '🟢 '}
              {diet === 'Non-Vegetarian' && '🔴 '}
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Category */}
      <div className="space-y-2.5 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => updateFilter('category', 'All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filters.category === 'All'
                ? 'bg-rose-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Courses
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                updateFilter('category', filters.category === cat ? 'All' : cat)
              }
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filters.category === cat
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-rose-50 hover:text-rose-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Cooking Time */}
      <div className="space-y-2.5 pt-2 border-t border-stone-100">
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>Cooking Time</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {timeOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => updateFilter('cookingTime', opt)}
              className={`px-2.5 py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                filters.cookingTime === opt
                  ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Spice Level */}
      <div className="space-y-2.5 pt-2 border-t border-stone-100">
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>Spice Level</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => updateFilter('spiceLevel', 'All')}
            className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
              filters.spiceLevel === 'All'
                ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All
          </button>
          {spiceLevels.map((spice) => (
            <button
              key={spice}
              onClick={() =>
                updateFilter('spiceLevel', filters.spiceLevel === spice ? 'All' : spice)
              }
              className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                filters.spiceLevel === spice
                  ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {spice}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Difficulty */}
      <div className="space-y-2.5 pt-2 border-t border-stone-100">
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500">
          <ChefHat className="w-3.5 h-3.5 text-stone-400" />
          <span>Difficulty</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => updateFilter('difficulty', 'All')}
            className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
              filters.difficulty === 'All'
                ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All
          </button>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() =>
                updateFilter('difficulty', filters.difficulty === diff ? 'All' : diff)
              }
              className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                filters.difficulty === diff
                  ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-28 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-stone-200/80 shadow-xs">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer Sheet */}
          <div className="relative ml-auto w-full max-w-sm h-full bg-[#faf7f2] shadow-2xl p-6 overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
              <span className="font-serif font-bold text-lg text-stone-900">
                Filters ({totalFilteredCount} recipes)
              </span>
              <button
                onClick={onCloseMobile}
                className="p-2 rounded-full text-stone-600 hover:bg-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {content}

            <div className="mt-8 pt-4 border-t border-stone-200 sticky bottom-0 bg-[#faf7f2] pb-2">
              <button
                onClick={onCloseMobile}
                className="w-full py-3.5 rounded-full bg-rose-900 hover:bg-rose-950 text-white font-bold text-sm shadow-md"
              >
                Show {totalFilteredCount} Recipes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
