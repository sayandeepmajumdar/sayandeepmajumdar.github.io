import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, Check, X, Shield, Star, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { TOOLS } from '../../data/tools';
import { Category } from '../../types';

interface CategoryNavProps {
  selectedCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
  sortBy: 'popular' | 'all' | 'name' | 'starred';
  onSortChange: (sort: 'popular' | 'all' | 'name' | 'starred') => void;
  localOnly: boolean;
  onLocalOnlyToggle: () => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  totalToolsCount: number;
}

const SORT_OPTIONS: { id: 'popular' | 'all' | 'name' | 'starred'; label: string }[] = [
  { id: 'popular', label: 'Popular' },
  { id: 'all', label: 'All Tools' },
  { id: 'name', label: 'A-Z Name' },
  { id: 'starred', label: 'Starred' },
];

const POPULAR_TAGS = [
  'typing test',
  'unit converter',
  'flashcards',
  'barcode',
  'qr code',
  'json',
  'jwt',
  'cryptography',
  'aes',
  'rsa',
  'sql',
  'diagram',
  'svg',
  'formatter',
  'css',
  'hash',
  'regex',
  'cron',
  'calculator',
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  localOnly,
  onLocalOnlyToggle,
  selectedTag,
  onSelectTag,
  totalToolsCount,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate counts for each category
  const categoryCounts = React.useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      map[cat.id] = TOOLS.filter(
        (t) => t.category === cat.id || t.secondaryCategories?.includes(cat.id)
      ).length;
    });
    return map;
  }, []);

  const currentSortLabel = SORT_OPTIONS.find((s) => s.id === sortBy)?.label || 'Popular';

  const hasActiveFilters = localOnly || selectedTag !== null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-6">
      {/* Main Bar */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 py-2 border-y border-line/60">
        {/* Left Dropdown (Popular ⌄) */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-surface border border-line text-ink hover:border-muted/50 hover:bg-surface-alt transition-all shadow-2xs"
            aria-expanded={dropdownOpen}
          >
            <span>{currentSortLabel}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-44 rounded-xl bg-surface border border-line shadow-xl py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
                Sort Tools By
              </div>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onSortChange(opt.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors text-left ${
                    sortBy === opt.id
                      ? 'text-accent bg-accent-light/50 font-semibold'
                      : 'text-ink hover:bg-surface-alt'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-accent" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center Categories Bar */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {/* Discover / All Button */}
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-surface-alt text-ink shadow-xs border border-line font-bold'
                : 'text-muted hover:text-ink hover:bg-surface-alt/40 font-medium'
            }`}
          >
            Discover <span className="opacity-70 text-[11px] sm:text-xs">({totalToolsCount})</span>
          </button>

          {/* Category Pills with Count in Brackets */}
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isSelected
                    ? 'bg-surface-alt text-ink shadow-xs border border-line font-bold'
                    : 'text-muted hover:text-ink hover:bg-surface-alt/40 font-medium'
                }`}
              >
                <span>{cat.name}</span>{' '}
                <span className={`text-[11px] sm:text-xs ${isSelected ? 'opacity-90 font-bold' : 'opacity-65'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Filters Button */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all shadow-2xs ${
              filtersOpen || hasActiveFilters
                ? 'bg-accent text-white border-accent shadow-xs'
                : 'bg-surface border border-line text-ink hover:border-muted/50 hover:bg-surface-alt'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Filters Drawer */}
      {filtersOpen && (
        <div className="mt-3 p-4 rounded-2xl bg-surface border border-line shadow-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-muted uppercase tracking-wider font-mono mr-1">
                Quick Filters:
              </span>

              {/* Local Only Toggle */}
              <button
                type="button"
                onClick={onLocalOnlyToggle}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  localOnly
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-surface-alt border-line text-muted hover:text-ink'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>100% Local / In-Browser Only</span>
                {localOnly && <Check className="w-3 h-3 text-emerald-500" />}
              </button>

              {/* Starred Sort / Filter */}
              <button
                type="button"
                onClick={() => onSortChange(sortBy === 'starred' ? 'popular' : 'starred')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  sortBy === 'starred'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                    : 'bg-surface-alt border-line text-muted hover:text-ink'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
                <span>Starred First</span>
              </button>

              {/* Popular Filter */}
              <button
                type="button"
                onClick={() => onSortChange(sortBy === 'popular' ? 'all' : 'popular')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  sortBy === 'popular'
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-surface-alt border-line text-muted hover:text-ink'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Popular Only</span>
              </button>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  if (localOnly) onLocalOnlyToggle();
                  onSelectTag(null);
                  onSortChange('popular');
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-accent self-start sm:self-auto"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="mt-3 pt-3 border-t border-line/60 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-muted uppercase font-bold mr-1">
              Filter By Tag:
            </span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  selectedTag === tag
                    ? 'bg-accent text-white font-bold shadow-2xs'
                    : 'bg-surface-alt text-muted hover:text-ink hover:bg-surface border border-line'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
