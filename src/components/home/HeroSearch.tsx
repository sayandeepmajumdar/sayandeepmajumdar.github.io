import React, { useRef, useEffect } from 'react';
import { Search, X, ShieldCheck } from 'lucide-react';
import { ToolzyLogo } from '../common/ToolzyLogo';

interface HeroSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  totalToolsCount: number;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  query,
  onQueryChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="text-center pt-10 sm:pt-14 pb-4 max-w-4xl mx-auto px-4">
      {/* Privacy Guarantee Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6 shadow-xs select-none">
        <ShieldCheck className="w-4 h-4" />
        <span>100% Client-Side • Zero Data Leaves Your Browser</span>
      </div>

      <div className="flex justify-center mb-3">
        <ToolzyLogo size="hero" showIcon={false} />
      </div>

      <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
        Fast, free, privacy-first developer tools, formatters, cryptography suites, and converters.
        No tracking, no signups, zero server-side storage.
      </p>

      {/* Big Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by tool name, format, or tag (e.g. 'qr', 'json', 'jwt', 'aes', 'cron', 'sql')..."
          className="w-full pl-11 pr-20 py-3.5 rounded-2xl bg-surface dark:bg-stone-900 border-2 border-line dark:border-stone-700 text-ink dark:text-stone-100 text-sm sm:text-base placeholder:text-muted dark:placeholder:text-stone-500 focus:outline-none focus:border-accent dark:focus:border-accent shadow-md transition-all"
          spellCheck={false}
          autoFocus
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              className="p-1 rounded-lg text-muted hover:text-ink hover:bg-surface-alt transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-surface-alt border border-line text-xs font-mono text-muted select-none">
              /
            </kbd>
          )}
        </div>
      </div>
    </div>
  );
};
