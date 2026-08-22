import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Search,
  ExternalLink,
  Star,
  Clock,
  Sparkles,
  Sun,
  Moon,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Sliders,
} from 'lucide-react';
import { TOOLS } from '../src/data/tools';
import { CATEGORIES } from '../src/data/categories';
import { DynamicIcon } from '../src/components/common/DynamicIcon';
import {
  getFavorites,
  getRecentTools,
  getStoredTheme,
  setStoredTheme,
  applyTheme,
  toggleFavorite,
} from '../src/lib/storage';
import { copyToClipboard } from '../src/lib/utils';
import { ToolzyLogo } from '../src/components/common/ToolzyLogo';
import { ExtensionPreferencesModal } from '../src/components/common/ExtensionPreferencesModal';
import '../src/index.css';

export const PopupApp: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isPrefsOpen, setIsPrefsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Quick action state
  const [quickTimestamp, setQuickTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [quickUuid, setQuickUuid] = useState<string>(() => crypto.randomUUID());

  useEffect(() => {
    const t = getStoredTheme();
    setTheme(t);
    applyTheme(t);
    setFavorites(getFavorites());
    setRecents(getRecentTools());

    // Focus search on open
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    // Update timestamp every second
    const interval = setInterval(() => {
      setQuickTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleThemeMode = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setStoredTheme(next);
  };

  const handleCopy = async (key: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    }
  };

  const regenerateUuid = () => {
    const next = crypto.randomUUID();
    setQuickUuid(next);
    handleCopy('uuid', next);
  };

  const handleOpenTool = (toolSlug: string, category: string) => {
    const url = `newtab.html#/tools/${category}/${toolSlug}`;
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
      chrome.tabs.create({ url: chrome.runtime.getURL(url) });
    } else if (typeof (window as any).browser !== 'undefined' && (window as any).browser?.tabs?.create) {
      (window as any).browser.tabs.create({ url: (window as any).browser.runtime.getURL(url) });
    } else {
      window.open(url, '_blank');
    }
  };

  const handleOpenNewTab = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
      chrome.tabs.create({ url: chrome.runtime.getURL('newtab.html') });
    } else if (typeof (window as any).browser !== 'undefined' && (window as any).browser?.tabs?.create) {
      (window as any).browser.tabs.create({ url: (window as any).browser.runtime.getURL('newtab.html') });
    } else {
      window.open('newtab.html', '_blank');
    }
  };

  const handleToggleFav = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    toggleFavorite(toolId);
    setFavorites(getFavorites());
  };

  // Filtered tools
  const filteredTools = useMemo(() => {
    let list = TOOLS;

    if (selectedCategory === 'favorites') {
      list = list.filter((t) => favorites.includes(t.id));
    } else if (selectedCategory === 'recent') {
      list = list.filter((t) => recents.includes(t.id));
    } else if (selectedCategory !== 'all') {
      list = list.filter((t) => t.category === selectedCategory || t.secondaryCategories?.includes(selectedCategory as any));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return list;
  }, [search, selectedCategory, favorites, recents]);

  return (
    <div className="flex flex-col min-h-full bg-paper text-ink selection:bg-accent/20 selection:text-accent font-sans">
      {/* Top Header */}
      <header className="px-4 py-3 bg-surface border-b border-line flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-2">
          <ToolzyLogo size="sm" showIcon={true} />
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-accent-light text-accent">
            MV3
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsPrefsOpen(true)}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface-alt transition-colors"
            title="Display Settings (New Tab vs Popup)"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleThemeMode}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface-alt transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleOpenNewTab}
            className="p-1.5 rounded-lg text-accent hover:bg-accent-light transition-colors"
            title="Open Full Dashboard in New Tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Extension Preferences Modal */}
      <ExtensionPreferencesModal isOpen={isPrefsOpen} onClose={() => setIsPrefsOpen(false)} />

      {/* Quick Actions Bar */}
      <div className="px-4 py-2.5 bg-surface-alt border-b border-line grid grid-cols-2 gap-2 text-xs">
        {/* Quick UUID */}
        <div
          onClick={regenerateUuid}
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-surface border border-line hover:border-accent/40 cursor-pointer transition-colors group"
          title="Click to generate new UUID and copy to clipboard"
        >
          <div className="flex items-center gap-1.5 truncate">
            <Zap className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="font-mono text-[11px] truncate">{quickUuid.substring(0, 8)}...</span>
          </div>
          {copiedKey === 'uuid' ? (
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted group-hover:text-accent shrink-0" />
          )}
        </div>

        {/* Quick Epoch */}
        <div
          onClick={() => handleCopy('epoch', String(quickTimestamp))}
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-surface border border-line hover:border-accent/40 cursor-pointer transition-colors group"
          title="Click to copy current Unix Epoch timestamp"
        >
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-mono text-[11px] truncate">{quickTimestamp}</span>
          </div>
          {copiedKey === 'epoch' ? (
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted group-hover:text-accent shrink-0" />
          )}
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="p-3 bg-surface border-b border-line space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 40+ offline tools..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-surface-alt border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
        </div>

        {/* Categories Carousel */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-2 py-0.5 rounded-md font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-accent text-white'
                : 'bg-surface-alt text-muted hover:text-ink'
            }`}
          >
            All ({TOOLS.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('favorites')}
            className={`px-2 py-0.5 rounded-md font-semibold whitespace-nowrap flex items-center gap-1 transition-colors ${
              selectedCategory === 'favorites'
                ? 'bg-accent text-white'
                : 'bg-surface-alt text-muted hover:text-ink'
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>Starred ({favorites.length})</span>
          </button>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2 py-0.5 rounded-md font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-accent text-white'
                  : 'bg-surface-alt text-muted hover:text-ink'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tool List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5 max-h-[340px]">
        {filteredTools.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted">
            <p className="font-semibold text-ink">No tools match "{search}"</p>
            <p className="mt-1">Try another keyword or category filter.</p>
          </div>
        ) : (
          filteredTools.map((tool) => {
            const isFav = favorites.includes(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => handleOpenTool(tool.slug, tool.category)}
                className="p-2.5 rounded-xl bg-surface border border-line hover:border-accent/40 hover:bg-surface-alt cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center text-accent shrink-0">
                    <DynamicIcon name={tool.icon} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-ink truncate group-hover:text-accent transition-colors">
                        {tool.name}
                      </h4>
                      {tool.badge && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-surface-alt border border-line text-muted uppercase shrink-0">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted truncate mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggleFav(e, tool.id)}
                    className="p-1 rounded-md text-muted hover:text-amber-400 hover:bg-surface transition-colors"
                    title={isFav ? 'Remove Star' : 'Star Tool'}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <footer className="px-4 py-2 bg-surface-alt border-t border-line flex items-center justify-between text-[11px] text-muted">
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Client-Side Privacy</span>
        </div>

        <button
          type="button"
          onClick={handleOpenNewTab}
          className="font-bold text-accent hover:underline flex items-center gap-1"
        >
          <span>Open Full Toolzy →</span>
        </button>
      </footer>
    </div>
  );
};

const root = document.getElementById('popup-root');
if (root) {
  ReactDOM.createRoot(root).render(<PopupApp />);
}
