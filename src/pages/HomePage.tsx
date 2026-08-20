import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Star, Clock, Grid } from 'lucide-react';
import { HeroSearch } from '../components/home/HeroSearch';
import { CategoryNav } from '../components/home/CategoryNav';
import { ToolCard } from '../components/common/ToolCard';
import { EmptyState } from '../components/common/EmptyState';
import { TOOLS } from '../data/tools';
import { CATEGORY_MAP } from '../data/categories';
import { Category } from '../types';
import { searchTools } from '../lib/search';
import { getFavorites, getRecentTools } from '../lib/storage';

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'all' | 'name' | 'starred'>('popular');
  const [localOnly, setLocalOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'favorites' | 'recent'>('all');
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [recent, setRecent] = useState<string[]>(getRecentTools());

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'favorites' || tabParam === 'recent' || tabParam === 'popular') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
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

  const filteredTools = useMemo(() => {
    let list = [...TOOLS];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter(
        (t) => t.category === selectedCategory || t.secondaryCategories?.includes(selectedCategory)
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
        .filter(Boolean) as typeof TOOLS;
    }

    // Search query
    if (query) {
      list = searchTools(list, query);
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
  }, [query, selectedCategory, activeTab, favorites, recent, sortBy, localOnly, selectedTag]);

  const handleTabChange = (tab: 'all' | 'popular' | 'favorites' | 'recent') => {
    setActiveTab(tab);
    if (tab === 'all') {
      searchParams.delete('tab');
    } else {
      searchParams.set('tab', tab);
    }
    setSearchParams(searchParams);
  };

  const selectedCategoryInfo = selectedCategory !== 'all' ? CATEGORY_MAP.get(selectedCategory) : null;

  return (
    <div className="pb-16">
      {/* Hero Search Section */}
      <HeroSearch
        query={query}
        onQueryChange={setQuery}
        totalToolsCount={TOOLS.length}
      />

      {/* Explore by Category Navigation Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        localOnly={localOnly}
        onLocalOnlyToggle={() => setLocalOnly((prev) => !prev)}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        totalToolsCount={TOOLS.length}
      />

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        {/* Category Header info if specific category is selected */}
        {selectedCategoryInfo && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                <span>{selectedCategoryInfo.name}</span>
                <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-surface-alt border border-line text-muted">
                  {filteredTools.length} tool{filteredTools.length === 1 ? '' : 's'}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
                {selectedCategoryInfo.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-semibold text-accent hover:underline self-start sm:self-auto shrink-0"
            >
              Show all categories →
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Quick Filter Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-surface border border-line gap-1 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => handleTabChange('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All ({TOOLS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('popular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'popular'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Popular</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('favorites')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'favorites'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
              <span>Starred ({favorites.length})</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('recent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'recent'
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Recent ({recent.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted font-medium">
            {selectedTag && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-light text-accent font-mono text-[11px]">
                #{selectedTag}
                <button type="button" onClick={() => setSelectedTag(null)} className="hover:text-ink">
                  ×
                </button>
              </span>
            )}
            <span>
              Showing <strong>{filteredTools.length}</strong> of <strong>{TOOLS.length}</strong> tools
            </span>
          </div>
        </div>

        {/* Tools Grid or Empty State */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              selectedCategoryInfo?.isStub
                ? `${selectedCategoryInfo.name} Tools Coming Soon`
                : activeTab === 'favorites'
                ? 'No starred tools yet'
                : activeTab === 'recent'
                ? 'No recently visited tools'
                : 'No tools found'
            }
            description={
              selectedCategoryInfo?.isStub
                ? `We are currently crafting dedicated client-side tools for ${selectedCategoryInfo.name}. Check back soon!`
                : activeTab === 'favorites'
                ? 'Click the star icon on any tool to pin it here for quick one-click access.'
                : activeTab === 'recent'
                ? 'Tools you open will automatically appear in this section.'
                : `We could not find any tools matching your current filters. Try selecting another category or clearing search filters.`
            }
            actionText={query || selectedCategory !== 'all' || selectedTag ? 'Reset All Filters' : undefined}
            onAction={
              query || selectedCategory !== 'all' || selectedTag
                ? () => {
                    setQuery('');
                    setSelectedCategory('all');
                    setSelectedTag(null);
                    setLocalOnly(false);
                    setSortBy('popular');
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};
