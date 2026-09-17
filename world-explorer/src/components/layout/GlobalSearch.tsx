'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Globe, MapPin, MessageSquare, Landmark, ArrowRight } from 'lucide-react';
import { searchGlobal, SearchResultItem } from '@/lib/search';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent state or custom event
          const event = new CustomEvent('open-search');
          window.dispatchEvent(event);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const res = searchGlobal(query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: SearchResultItem) => {
    router.push(item.url);
    onClose();
  };

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNavigation}
            placeholder="Search countries, capitals, continents, or languages (e.g., Tokyo, Portugal, Asia)..."
            className="w-full py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex ml-2 px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                Quick Global Navigation
              </p>
              <p>Type a country name, capital, continent, or language to jump directly.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['🇯🇵 Japan', '🇫🇷 France', '🇧🇷 Brazil', 'Tokyo', 'Swahili', 'Asia'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip.replace(/^[^\w\s]+/, '').trim())}
                    className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                No matching results found for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1">
                Try searching for common names like &ldquo;Japan&rdquo;, &ldquo;Africa&rdquo;, or &ldquo;Spanish&rdquo;.
              </p>
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-900 dark:text-teal-200'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <div className="truncate">
                          <p className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="flex items-center text-xs text-slate-400 ml-2 flex-shrink-0">
                        <span className="capitalize px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 mr-2 text-[10px]">
                          {item.type}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
