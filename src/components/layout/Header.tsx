import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, ArrowLeft, Star, PlusCircle, Sliders } from 'lucide-react';
import { getStoredTheme, setStoredTheme, getFavorites, getRecentTools } from '../../lib/storage';
import { isExtensionEnvironment } from '../../lib/utils';
import { ToolzyLogo } from '../common/ToolzyLogo';
import { HeaderSearch } from './HeaderSearch';
import { ExtensionPreferencesModal } from '../common/ExtensionPreferencesModal';

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getStoredTheme());
  const [favCount, setFavCount] = useState(getFavorites().length);
  const [recentCount, setRecentCount] = useState(getRecentTools().length);
  const [isPrefsOpen, setIsPrefsOpen] = useState(false);
  const location = useLocation();
  const isExt = isExtensionEnvironment();

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
    <>
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-line transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 text-ink hover:opacity-95 transition-opacity focus:outline-none"
              aria-label="Toolzy Platform"
            >
              <ToolzyLogo size="md" showIcon={true} />
              <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-surface-alt border border-line text-muted hidden md:inline-block">
                {isExt ? 'Extension' : 'v2.0'}
              </span>
            </Link>
          </div>

          {/* Center Live Auto-Suggestion Search Bar (on subpages or desktop) */}
          {!isHome && (
            <div className="flex-1 max-w-md mx-1 sm:mx-4">
              <HeaderSearch />
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Request New Tool */}
            <a
              href="mailto:developerslab101@gmail.com?subject=New%20Tool%20Request%20-%20Toolzy&body=Hi%20Toolzy%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20new%20tool%20for%20Toolzy%3A%0A%0A-%20Tool%20Name%3A%20%0A-%20Description%20%26%20Use%20Case%3A%20%0A-%20Key%20Features%3A%20%0A%0AThank%20you!"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-accent hover:text-white hover:bg-accent border border-accent/30 transition-all shadow-2xs"
              title="Request for adding a new tool"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Request Tool</span>
            </a>

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

            {/* Theme Toggle */}
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

            {/* In Extension: Display Mode & Preferences Button */}
            {isExt ? (
              <button
                type="button"
                onClick={() => setIsPrefsOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-accent bg-accent-light hover:bg-accent/20 border border-accent/25 transition-all shadow-2xs"
                title="Extension Display Settings (New Tab, Sidebar, Popup)"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Display Mode</span>
              </button>
            ) : (
              /* On Web: Back to Portfolio */
              <a
                href="/index.html"
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-muted hover:text-ink hover:bg-surface-alt border border-line transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Portfolio</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Extension Preferences Modal */}
      <ExtensionPreferencesModal isOpen={isPrefsOpen} onClose={() => setIsPrefsOpen(false)} />
    </>
  );
};
