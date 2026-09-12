import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, MapPin, Compass, X } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';

interface SearchBarProps {
  onSelectDestination: (dest: Destination) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectDestination,
  placeholder = 'Search destinations, states, hills, beaches, heritage...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filter matching destinations
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return DESTINATIONS.filter((d) => {
      return (
        d.name.toLowerCase().includes(q) ||
        (d.city && d.city.toLowerCase().includes(q)) ||
        d.state.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.categories.some((c) => c.toLowerCase().includes(q)) ||
        d.tags.some((t) => t.toLowerCase().includes(q)) ||
        d.travelStyle.some((s) => s.toLowerCase().includes(q))
      );
    }).slice(0, 8);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        handleSelect(selected);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (dest: Destination) => {
    setQuery(dest.name);
    setIsOpen(false);
    onSelectDestination(dest);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center w-full rounded-2xl glass-panel border border-white/15 focus-within:border-amber-500/60 focus-within:ring-2 focus-within:ring-amber-500/20 shadow-2xl transition-all duration-300">
        <div className="pl-4 pr-2 text-stone-400">
          <Search className="w-5 h-5 text-amber-500" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full py-3.5 pr-10 text-sm md:text-base bg-transparent text-white placeholder:text-stone-400 outline-none"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl glass-panel border border-white/15 shadow-2xl overflow-hidden backdrop-blur-2xl animate-fade-in">
          {results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Matching Destinations
              </div>
              {results.map((dest, idx) => {
                const isFocused = idx === selectedIndex;
                return (
                  <button
                    key={dest.id}
                    onClick={() => handleSelect(dest)}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors ${
                      isFocused ? 'bg-amber-500/15 text-white' : 'hover:bg-white/5 text-stone-200'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-stone-800">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate flex items-center gap-2">
                        <span>{dest.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-amber-300 font-normal">
                          {dest.categories[0]}
                        </span>
                      </div>
                      <div className="text-xs text-stone-400 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-500" />
                        <span>{dest.state}</span>
                        <span>•</span>
                        <span>{dest.bestTime}</span>
                      </div>
                    </div>
                    <div className="text-stone-500 text-xs hidden sm:block">
                      <Compass className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-stone-400 text-sm">
              No destinations found for "<span className="text-white">{query}</span>". Try searching for "Jaipur", "Munnar", "Goa", or "Spiti".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
