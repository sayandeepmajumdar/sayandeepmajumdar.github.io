import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  Star,
  Clock,
  Grid,
  ShieldCheck,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';
import type { Tool, Category, CategoryInfo } from '../../../types/tools';
import { DynamicIcon } from '../common/DynamicIcon';
import { getFavorites, toggleFavorite, getRecentTools, getStandaloneToolUrl } from '../../../utils/toolsStorage';

interface ToolsExplorerProps {
  initialCategory?: string;
  initialTools: Tool[];
  categories: CategoryInfo[];
}

export const ToolsExplorer: React.FC<ToolsExplorerProps> = ({
  initialCategory = 'all',
  initialTools,
  categories,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'starred'>('popular');
  const [localOnly, setLocalOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'favorites' | 'recent'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sync favorites & recents on client mount
  useEffect(() => {
    setFavorites(getFavorites());
    setRecent(getRecentTools());

    // Check URL parameters on mount
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam === 'favorites' || tabParam === 'recent' || tabParam === 'popular') {
        setActiveTab(tabParam);
      }
      const qParam = params.get('q');
      if (qParam) setQuery(qParam);
      const catParam = params.get('category');
      if (catParam && catParam !== 'all') setSelectedCategory(catParam);
    }

    const handleFavChange = (e: any) => {
      if (Array.isArray(e.detail)) setFavorites(e.detail);
    };
    const handleRecentChange = (e: any) => {
      if (Array.isArray(e.detail)) setRecent(e.detail);
    };

    window.addEventListener('toolbox:favorites-updated', handleFavChange);
    window.addEventListener('toolbox:recents-updated', handleRecentChange);

    return () => {
      window.removeEventListener('toolbox:favorites-updated', handleFavChange);
      window.removeEventListener('toolbox:recents-updated', handleRecentChange);
    };
  }, []);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategory, activeTab, sortBy, localOnly, selectedTag]);

  const handleToggleFav = (e: React.MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(toolId);
  };

  // Filtered tools list
  const filteredTools = useMemo(() => {
    let list = [...initialTools];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter(
        (t) => t.category === selectedCategory || t.secondaryCategories?.includes(selectedCategory as any)
      );
    }

    // Filter by local only
    if (localOnly) {
      list = list.filter((t) => t.localProcessing);
    }

    // Filter by tag
    if (selectedTag) {
      list = list.filter((t) =>
        t.tags.some((tag) => tag.toLowerCase().includes(selectedTag.toLowerCase()))
      );
    }

    // Filter by tab
    if (activeTab === 'popular') {
      list = list.filter((t) => t.popular);
    } else if (activeTab === 'favorites') {
      list = list.filter((t) => favorites.includes(t.id));
    } else if (activeTab === 'recent') {
      list = recent
        .map((id) => list.find((t) => t.id === id))
        .filter(Boolean) as Tool[];
    }

    // Search query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter((t) => {
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.category.toLowerCase().includes(q) ||
          (t.badge && t.badge.toLowerCase().includes(q))
        );
      });
    }

    // Sorting
    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (sortBy === 'starred') {
      list.sort((a, b) => (favorites.includes(b.id) ? 1 : 0) - (favorites.includes(a.id) ? 1 : 0));
    }

    return list;
  }, [initialTools, query, selectedCategory, activeTab, favorites, recent, sortBy, localOnly, selectedTag]);

  // Paginated slice
  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTools.slice(start, start + itemsPerPage);
  }, [filteredTools, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      const topOffset = gridRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const selectedCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="w-full space-y-8">
      {/* Interactive Search Bar & Quick Filters */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-muted pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search across ${initialTools.length} developer tools, formatters, cryptography...`}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-surface border border-line text-sm sm:text-base text-ink placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 shadow-xs transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3.5 p-1 rounded-lg text-muted hover:text-ink transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-surface hover:bg-surface-alt text-muted hover:text-ink border border-line'
            }`}
          >
            <span>All Categories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-surface-alt text-muted'
            }`}>
              {initialTools.length}
            </span>
          </button>

          {categories.map((cat) => {
            const count = initialTools.filter(
              (t) => t.category === cat.id || t.secondaryCategories?.includes(cat.id)
            ).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-accent text-white shadow-xs'
                    : 'bg-surface hover:bg-surface-alt text-muted hover:text-ink border border-line'
                }`}
              >
                <DynamicIcon name={cat.icon} className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-surface-alt text-muted'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Container */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Category Header banner if selected */}
        {selectedCategoryObj && selectedCategory !== 'all' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                <span>{selectedCategoryObj.name}</span>
                <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-surface-alt border border-line text-muted">
                  {filteredTools.length} tool{filteredTools.length === 1 ? '' : 's'}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
                {selectedCategoryObj.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-semibold text-accent hover:underline self-start sm:self-auto shrink-0 cursor-pointer"
            >
              Show all tools →
            </button>
          </div>
        )}

        {/* Toolbar: Quick Tabs + Local Toggle + Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Quick Filter Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-surface border border-line gap-1 overflow-x-auto no-scrollbar shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All ({initialTools.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('popular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'popular'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Popular</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
              <span>Starred ({favorites.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'recent'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink hover:bg-surface-alt'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Recent ({recent.length})</span>
            </button>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Local Only Toggle */}
            <label className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink cursor-pointer select-none">
              <input
                type="checkbox"
                checked={localOnly}
                onChange={(e) => setLocalOnly(e.target.checked)}
                className="w-4 h-4 rounded text-accent focus:ring-accent border-line cursor-pointer"
              />
              <span className="font-medium">100% Local Only</span>
            </label>

            {/* Sort Select */}
            <div className="flex items-center gap-1 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface border border-line rounded-lg px-2.5 py-1.5 text-xs text-ink font-medium focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="name">Name (A–Z)</option>
                <option value="starred">Starred First</option>
              </select>
            </div>

            {/* Total Results Count */}
            <div className="text-xs text-muted font-medium">
              <span>
                Showing <strong>{filteredTools.length}</strong> tools
              </span>
            </div>
          </div>
        </div>

        {/* Selected Tag Indicator */}
        {selectedTag && (
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-light text-accent font-mono text-xs font-semibold">
              #{selectedTag}
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="hover:text-ink font-bold cursor-pointer"
                title="Remove tag filter"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Tools Card Grid */}
        {filteredTools.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedTools.map((tool) => {
                const isFav = favorites.includes(tool.id);
                const toolPageUrl = `/tools/${tool.category}/${tool.slug}/`;
                const standaloneUrl = getStandaloneToolUrl(tool.slug);

                return (
                  <div
                    key={tool.id}
                    className="group relative flex flex-col justify-between p-5 rounded-2xl bg-surface border border-line hover:border-accent/60 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3.5">
                        <div className="w-11 h-11 rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                          <DynamicIcon name={tool.icon} className="w-5 h-5" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          {tool.localProcessing && (
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              title="100% Client-side: zero data leaves your browser"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>Local</span>
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => handleToggleFav(e, tool.id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isFav
                                ? 'text-amber-500 hover:text-amber-600'
                                : 'text-muted/50 hover:text-amber-500 hover:bg-surface-alt'
                            }`}
                            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                            aria-label="Toggle favorite"
                          >
                            <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <a href={toolPageUrl} className="block focus:outline-none">
                        <h3 className="text-base font-bold text-ink group-hover:text-accent transition-colors flex items-center gap-1">
                          <span>{tool.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                        </h3>
                        <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">
                          {tool.description}
                        </p>
                      </a>
                    </div>

                    <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-[11px] uppercase tracking-wider text-muted font-mono">
                        {tool.category}
                      </span>

                      <div className="flex items-center gap-2">
                        {tool.tags && tool.tags.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSelectedTag(tool.tags[0])}
                            className="text-[11px] text-muted hover:text-accent truncate max-w-[110px] cursor-pointer"
                            title={`Filter by tag #${tool.tags[0]}`}
                          >
                            #{tool.tags[0]}
                          </button>
                        )}
                        <a
                          href={standaloneUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-ink p-1 rounded transition-colors"
                          title="Open standalone tool directly"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line/60">
                <div className="text-xs text-muted font-medium">
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredTools.length} total tools)
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 rounded-lg border border-line bg-surface hover:bg-surface-alt text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                    // Show first, last, and pages around current
                    if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePageChange(p)}
                          className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            p === currentPage
                              ? 'bg-accent text-white shadow-2xs'
                              : 'bg-surface hover:bg-surface-alt border border-line text-ink'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    }
                    if (p === currentPage - 2 || p === currentPage + 2) {
                      return (
                        <span key={p} className="text-muted text-xs px-1">
                          …
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 rounded-lg border border-line bg-surface hover:bg-surface-alt text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>Show per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="bg-surface border border-line rounded-lg px-2 py-1 text-xs text-ink font-medium focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-3xl bg-surface border border-line space-y-4 shadow-2xs max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-surface-alt border border-line flex items-center justify-center text-xl mx-auto text-muted">
              🔍
            </div>
            <h3 className="text-lg font-bold text-ink">No tools found</h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              We couldn't find any tools matching your current filters or query. Try resetting your search filters or exploring another category.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                  setSelectedTag(null);
                  setLocalOnly(false);
                  setActiveTab('all');
                  setSortBy('popular');
                }}
                className="px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors shadow-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
