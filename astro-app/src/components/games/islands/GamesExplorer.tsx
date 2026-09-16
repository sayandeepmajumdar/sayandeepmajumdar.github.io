import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Game, GameCategory } from '../../../types/games';

interface GamesExplorerProps {
  initialGames: Game[];
  categories: GameCategory[];
  initialCategory?: string;
}

export const GamesExplorer: React.FC<GamesExplorerProps> = ({
  initialGames,
  categories,
  initialCategory = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Check URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        setActiveCategory(catParam);
      }
      const qParam = params.get('q');
      if (qParam) {
        setSearchQuery(qParam);
      }
    }
  }, []);

  // Global '/' keyboard shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered games
  const filteredGames = useMemo(() => {
    let list = [...initialGames];

    // Filter by category
    if (activeCategory !== 'all') {
      list = list.filter((g) => g.categories.includes(activeCategory));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          g.categories.some((cat) => cat.toLowerCase().includes(q))
      );
    }

    return list;
  }, [initialGames, activeCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Engine & Category Filter Bar */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Search Input */}
        <div className="relative flex items-center">
          <div className="absolute left-4 text-muted pointer-events-none flex items-center text-base">
            🔍
          </div>
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search games by title, mechanics, or tags (e.g. Sudoku, Chess, 3D, Reflex)..."
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-surface border border-line text-sm font-medium text-ink placeholder:text-muted focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-xs"
          />
          <div className="absolute right-3.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs px-1.5 py-0.5 rounded-lg bg-surface-alt hover:bg-line text-muted font-mono cursor-pointer transition-colors"
                title="Clear Search"
              >
                ✕
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-muted bg-surface-alt border border-line rounded-lg">
              /
            </kbd>
          </div>
        </div>

        {/* Category Pills & Count */}
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-surface hover:bg-surface-alt text-muted hover:text-ink border border-line'
              }`}
            >
              ⭐ All Games
            </button>

            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = initialGames.filter((g) => g.categories.includes(cat.id)).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'bg-surface hover:bg-surface-alt text-muted hover:text-ink font-semibold border border-line'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-surface-alt text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs text-muted">
            Showing <strong>{filteredGames.length}</strong> game{filteredGames.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Games Card Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGames.map((game) => {
            const gameUrl = `/games/${game.slug}/`;

            return (
              <a
                key={game.id}
                href={gameUrl}
                className="group bg-surface hover:border-indigo-500/60 border border-line rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden focus:outline-none"
              >
                {/* Glow backdrop */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/25 transition-colors"></div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${game.gradient} flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform text-white`}
                    >
                      {game.icon}
                    </span>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {game.badges.map((b, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 font-mono text-[11px] font-bold border border-indigo-500/20"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="font-black text-xl text-ink group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {game.title}
                  </h2>

                  <p className="text-xs text-muted mt-2 leading-relaxed line-clamp-3">
                    {game.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {game.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-surface-alt font-mono text-muted border border-line/50"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs font-bold text-indigo-500 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Play Now</span>
                  <span>→</span>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 space-y-3 bg-surface/50 border border-dashed border-line rounded-3xl p-8 max-w-lg mx-auto shadow-xs">
          <span className="text-4xl block">🔍</span>
          <h3 className="font-black text-xl text-ink">No Games Found</h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            {searchQuery
              ? `No games match your search query "${searchQuery}".`
              : `No games found in the selected category.`}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Search &amp; Filters
          </button>
        </div>
      )}
    </div>
  );
};
