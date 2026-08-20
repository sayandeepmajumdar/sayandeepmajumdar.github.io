import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ShieldCheck, ArrowRight, Sparkles, Clock, ArrowUpRight } from 'lucide-react';
import { TOOLS } from '../../data/tools';
import { searchTools } from '../../lib/search';
import { getRecentTools } from '../../lib/storage';
import { DynamicIcon } from '../common/DynamicIcon';
import { Tool } from '../../types';

interface HeaderSearchProps {
  className?: string;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global '/' or 'Cmd+K' / 'Ctrl+K' shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Suggested tools list
  const suggestedTools: Tool[] = useMemo(() => {
    if (query.trim()) {
      return searchTools(TOOLS, query).slice(0, 8);
    }
    // If query is empty, show recent tools + popular tools
    const recentIds = getRecentTools().slice(0, 4);
    const recentList = recentIds
      .map((id) => TOOLS.find((t) => t.id === id))
      .filter(Boolean) as Tool[];
    
    const popularList = TOOLS.filter(
      (t) => t.popular && !recentIds.includes(t.id)
    ).slice(0, 6);

    return [...recentList, ...popularList].slice(0, 7);
  }, [query]);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestedTools]);

  const handleSelectTool = (tool: Tool) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/tools/${tool.category}/${tool.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestedTools.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestedTools.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestedTools.length) % suggestedTools.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestedTools[selectedIndex]) {
        handleSelectTool(suggestedTools[selectedIndex]);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center w-full">
        <div className="absolute left-3.5 flex items-center pointer-events-none text-muted">
          <Search className="w-3.5 h-3.5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search 40+ developer tools..."
          className="w-full pl-9 pr-14 py-2 rounded-xl bg-surface-alt dark:bg-stone-900 border border-line dark:border-stone-700 text-xs text-ink dark:text-stone-100 placeholder:text-muted dark:placeholder:text-stone-500 focus:outline-none focus:border-accent dark:focus:border-accent focus:bg-surface dark:focus:bg-stone-900 focus:ring-1 focus:ring-accent transition-all"
          spellCheck={false}
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-muted hover:text-ink transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface border border-line text-[10px] font-mono text-muted select-none">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Auto-Suggestions Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 w-full sm:min-w-[420px] max-h-[75vh] bg-surface border border-line rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col">
          
          {/* Header Title */}
          <div className="px-3.5 py-2 border-b border-line bg-surface-alt/40 flex items-center justify-between text-[11px] font-mono text-muted">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              {query.trim() ? (
                <>
                  <Search className="w-3 h-3 text-accent" />
                  <span>Matching Tools ({suggestedTools.length})</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Suggested & Popular Tools</span>
                </>
              )}
            </span>

            <span className="hidden sm:inline text-[10px] text-muted">
              Use ↑↓ to navigate, ↵ to open
            </span>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-1.5 space-y-1 max-h-80 scrollbar-thin">
            {suggestedTools.length > 0 ? (
              suggestedTools.map((tool, idx) => {
                const isSelected = idx === selectedIndex;

                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => handleSelectTool(tool)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-accent-light text-ink border border-accent/30 shadow-2xs'
                        : 'hover:bg-surface-alt text-ink border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                          isSelected
                            ? 'bg-accent text-white scale-105'
                            : 'bg-surface-alt border border-line text-muted'
                        }`}
                      >
                        <DynamicIcon name={tool.icon} className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs truncate">
                            {tool.name}
                          </span>
                          {tool.badge && (
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-accent/10 text-accent border border-accent/20 shrink-0">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted truncate mt-0.5 leading-tight">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-mono text-muted uppercase bg-surface-alt px-1.5 py-0.5 rounded border border-line">
                        {tool.category}
                      </span>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected
                            ? 'text-accent translate-x-0.5 -translate-y-0.5 opacity-100'
                            : 'text-muted opacity-40'
                        }`}
                      />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-8 px-4 text-xs text-muted space-y-2">
                <p>No tools matching "{query}"</p>
                <a
                  href={`mailto:developerslab101@gmail.com?subject=New%20Tool%20Request%20-%20Toolzy&body=Tool%20Request%3A%20${encodeURIComponent(query)}`}
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline text-xs"
                >
                  <span>Request "{query}" Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Footer Quick Tip */}
          <div className="p-2.5 border-t border-line bg-surface-alt/30 flex items-center justify-between text-[11px] text-muted">
            <span>Press <kbd className="px-1 py-0.2 rounded bg-surface border border-line text-[10px] font-mono">Esc</kbd> to close</span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('/');
              }}
              className="text-accent hover:underline font-semibold"
            >
              Browse All Tools Hub →
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
