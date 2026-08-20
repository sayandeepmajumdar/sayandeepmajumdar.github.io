import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Search, ArrowLeft, Star } from 'lucide-react';
import { getStoredTheme, setStoredTheme, getFavorites, getRecentTools } from '../../lib/storage';
import { ToolzyLogo } from '../common/ToolzyLogo';

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getStoredTheme());
  const [favCount, setFavCount] = useState(getFavorites().length);
  const [recentCount, setRecentCount] = useState(getRecentTools().length);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleFavChange = (e: any) => {
      if (Array.isArray(e.detail)) setFavCount(e.detail.length);
    };
    const handleRecentChange = (e: any) => {
      if (Array.isArray(e.detail)) setRecentCount(e.detail.length);
    };
    const handleThemeChange = (e: any) => {
      if (e.detail === 'light' || e.detail === 'dark') setTheme(e.detail);
    };

    window.addEventListener('toolbox:favorites-updated', handleFavChange);
    window.addEventListener('toolbox:recents-updated', handleRecentChange);
    window.addEventListener('toolbox:theme-updated', handleThemeChange);

    return () => {
      window.removeEventListener('toolbox:favorites-updated', handleFavChange);
      window.removeEventListener('toolbox:recents-updated', handleRecentChange);
      window.removeEventListener('toolbox:theme-updated', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setStoredTheme(next);
  };

  const isHome = location.pathname === '/' || location.pathname === '/tools' || location.pathname === '/tools/';

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-line transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-ink hover:opacity-95 transition-opacity focus:outline-none"
            aria-label="Toolzy Platform"
          >
            <ToolzyLogo size="md" showIcon={true} />
            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-surface-alt border border-line text-muted hidden sm:inline-block">
              v2.0
            </span>
          </Link>
        </div>

        {/* Center Quick Search Trigger (on subpages) */}
        {!isHome && (
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              type="button"
              onClick={() => navigate('/?search=true')}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-surface-alt border border-line text-muted text-xs hover:border-accent/50 hover:text-ink transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-muted" />
                <span>Search 40+ developer tools...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-line text-[10px] font-mono">
                /
              </kbd>
            </button>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Favorites Link */}
          <Link
            to="/?tab=favorites"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted hover:text-ink hover:bg-surface-alt transition-colors"
            title="Favorites"
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span>Starred</span>
            {favCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-surface-alt border border-line text-ink">
                {favCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle (Instant 1-Click Toggle) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-alt border border-line transition-all"
            title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Back to Portfolio */}
          <a
            href="/index.html"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted hover:text-ink hover:bg-surface-alt border border-line transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </a>
        </div>
      </div>
    </header>
  );
};
