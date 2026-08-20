import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ChevronDown,
  SlidersHorizontal,
  Check,
  X,
  Shield,
  Star,
  Sparkles,
  LayoutGrid,
  Search,
} from 'lucide-react';
import { CATEGORIES, CATEGORY_MAP } from '../../data/categories';
import { TOOLS } from '../../data/tools';
import { Category } from '../../types';
import { DynamicIcon } from '../common/DynamicIcon';

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
  'vue',
  'react',
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
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close category modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCategoryModalOpen(false);
      }
    };
    if (categoryModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [categoryModalOpen]);

  // Calculate tool counts for each category
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      map[cat.id] = TOOLS.filter(
        (t) => t.category === cat.id || t.secondaryCategories?.includes(cat.id)
      ).length;
    });
    return map;
  }, []);

  // Filter categories within popup if user searches
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return CATEGORIES;
    const query = categorySearch.toLowerCase();
    return CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query)
    );
  }, [categorySearch]);

  const currentCategoryInfo =
    selectedCategory !== 'all' ? CATEGORY_MAP.get(selectedCategory) : null;
  const currentSortLabel = SORT_OPTIONS.find((s) => s.id === sortBy)?.label || 'Popular';
  const hasActiveFilters = localOnly || selectedTag !== null;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 my-4 sm:my-6">
      {/* Main Controls Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 py-2 border-y border-line/60">
        
        {/* Left Side: Unified Category Button */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setCategorySearch('');
              setCategoryModalOpen(true);
            }}
            className={`inline-flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-2xs w-full sm:w-auto min-w-0 ${
              selectedCategory !== 'all'
                ? 'bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20'
                : 'bg-surface border border-line text-ink hover:border-muted/50 hover:bg-surface-alt'
            }`}
            aria-haspopup="dialog"
            aria-expanded={categoryModalOpen}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 truncate">
              {currentCategoryInfo ? (
                <DynamicIcon name={currentCategoryInfo.icon} className="w-4 h-4 text-accent shrink-0" />
              ) : (
                <LayoutGrid className="w-4 h-4 text-muted shrink-0" />
              )}
              
              <span className="truncate">
                {currentCategoryInfo ? currentCategoryInfo.name : 'All Categories'}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-1">
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-surface-alt/90 border border-line text-[10px] sm:text-[11px] font-mono text-muted">
                {currentCategoryInfo
                  ? categoryCounts[currentCategoryInfo.id] || 0
                  : totalToolsCount}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-muted" />
            </div>
          </button>

          {/* Quick Clear Button if a specific category is active */}
          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className="p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-alt border border-line/60 transition-all text-xs shrink-0"
              title="Reset to All Categories"
              aria-label="Reset to all categories"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Side: Sort & Filter Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Sort Dropdown (Popular ⌄) */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-surface border border-line text-ink hover:border-muted/50 hover:bg-surface-alt transition-all shadow-2xs"
              aria-expanded={dropdownOpen}
            >
              <span className="truncate max-w-[70px] sm:max-w-none">{currentSortLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted transition-transform duration-200 shrink-0 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Sort Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-surface border border-line shadow-xl py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
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

          {/* Filters Toggle Button */}
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all shadow-2xs shrink-0 ${
              filtersOpen || hasActiveFilters
                ? 'bg-accent text-white border-accent shadow-xs'
                : 'bg-surface border border-line text-ink hover:border-muted/50 hover:bg-surface-alt'
            }`}
            aria-label="Toggle filter options"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>

        </div>
      </div>

      {/* CATEGORIES MODAL / POPUP (Mobile Responsive) */}
      {categoryModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCategoryModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="category-modal-title"
        >
          <div className="w-full sm:max-w-3xl h-[88dvh] sm:h-auto sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-surface border-t sm:border border-line shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-line flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold shrink-0">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 id="category-modal-title" className="text-base sm:text-lg font-bold text-ink tracking-tight flex items-center gap-2">
                    <span>Tool Categories</span>
                    <span className="text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-surface-alt border border-line text-muted hidden sm:inline">
                      {CATEGORIES.length} Categories • {totalToolsCount} Tools
                    </span>
                  </h3>
                  <p className="text-xs text-muted truncate">
                    Select a domain to filter developer utilities
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-alt border border-line/60 transition-colors shrink-0"
                aria-label="Close categories popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input inside Modal */}
            <div className="px-4 sm:px-6 pt-3 pb-2 shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Search categories (e.g. Developer, Security, Finance)..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-surface-alt dark:bg-stone-900 border border-line dark:border-stone-700 text-xs sm:text-sm text-ink dark:text-stone-100 placeholder:text-muted dark:placeholder:text-stone-500 focus:outline-none focus:border-accent dark:focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  autoFocus
                />
                {categorySearch && (
                  <button
                    type="button"
                    onClick={() => setCategorySearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs px-1.5 py-0.5 rounded-md hover:bg-surface"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Categories Scrollable List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1 scrollbar-thin">
              
              {/* All Categories Option (Discover) */}
              {!categorySearch && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('all');
                    setCategoryModalOpen(false);
                  }}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    selectedCategory === 'all'
                      ? 'bg-accent/10 border-accent text-accent shadow-xs'
                      : 'bg-surface-alt/50 border-line hover:border-muted/60 hover:bg-surface-alt text-ink'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedCategory === 'all'
                          ? 'bg-accent text-white'
                          : 'bg-surface border border-line text-muted'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
                        <span>All Tools & Categories</span>
                        {selectedCategory === 'all' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-accent text-white font-bold">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-muted truncate mt-0.5">
                        Browse all {totalToolsCount} privacy-first developer tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2.5 py-1 rounded-xl bg-surface border border-line text-[11px] sm:text-xs font-mono font-bold text-ink">
                      {totalToolsCount} tools
                    </span>
                    {selectedCategory === 'all' && <Check className="w-4 h-4 text-accent" />}
                  </div>
                </button>
              )}

              {/* Grid of Individual Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-0.5">
                {filteredCategories.map((cat) => {
                  const count = categoryCounts[cat.id] || 0;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setCategoryModalOpen(false);
                      }}
                      className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-2.5 group active:scale-[0.99] ${
                        isSelected
                          ? 'bg-accent/10 border-accent text-accent shadow-xs'
                          : 'bg-surface-alt/40 border-line hover:border-muted/60 hover:bg-surface-alt text-ink'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                            isSelected
                              ? 'bg-accent text-white'
                              : 'bg-surface border border-line text-muted group-hover:text-accent'
                          }`}
                        >
                          <DynamicIcon name={cat.icon} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs sm:text-sm truncate flex items-center gap-1.5">
                            <span className="truncate">{cat.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                          </div>
                          <p className="text-[11px] text-muted line-clamp-1 sm:line-clamp-2 mt-0.5 leading-snug">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold shrink-0 border mt-0.5 ${
                          isSelected
                            ? 'bg-accent text-white border-accent'
                            : 'bg-surface border-line text-muted'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {filteredCategories.length === 0 && (
                <div className="text-center py-8 text-muted text-xs">
                  No categories matching "{categorySearch}"
                </div>
              )}

            </div>

            {/* Modal Footer (Thumb-friendly on mobile) */}
            <div className="p-3 sm:p-4 border-t border-line bg-surface-alt/30 flex items-center justify-between text-xs text-muted shrink-0">
              <span className="hidden sm:inline">Press Esc to close</span>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  setCategoryModalOpen(false);
                }}
                className="font-semibold text-accent hover:underline text-xs"
              >
                Reset to All Tools ({totalToolsCount})
              </button>
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="sm:hidden px-3.5 py-1.5 rounded-xl bg-surface border border-line text-ink font-semibold text-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Expanded Filters Drawer */}
      {filtersOpen && (
        <div className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-surface border border-line shadow-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] sm:text-xs font-bold text-muted uppercase tracking-wider font-mono mr-1">
                Quick Filters:
              </span>

              {/* Local Only Toggle */}
              <button
                type="button"
                onClick={onLocalOnlyToggle}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  localOnly
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-surface-alt border-line text-muted hover:text-ink'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>100% Local Only</span>
                {localOnly && <Check className="w-3 h-3 text-emerald-500" />}
              </button>

              {/* Starred Sort / Filter */}
              <button
                type="button"
                onClick={() => onSortChange(sortBy === 'starred' ? 'popular' : 'starred')}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  sortBy === 'starred'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                    : 'bg-surface-alt border-line text-muted hover:text-ink'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
                <span>Starred</span>
              </button>

              {/* Popular Filter */}
              <button
                type="button"
                onClick={() => onSortChange(sortBy === 'popular' ? 'all' : 'popular')}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  sortBy === 'popular'
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-surface-alt border-line text-muted hover:text-ink'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Popular</span>
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
              Tags:
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
