import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { CalculatorMeta } from '../../../types/mathlify';

interface Props {
  calculators: CalculatorMeta[];
}

export default function MathlifySearch({ calculators }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtered calculators
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return calculators.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query, calculators]);

  // Keyboard shortcut: '/' focuses search, 'Escape' closes
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        // Only trigger if not already typing in another input
        const tag = (document.activeElement?.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
          e.preventDefault();
          inputRef.current?.focus();
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Arrow key navigation
  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[selectedIndex];
      if (target) {
        window.location.href = `/mathlify/tools/${target.slug}/`;
      }
    }
  }

  return (
    <div className="search-wrap" id="search-wrap" style={{ position: 'relative' }}>
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          ref={inputRef}
          className="search-input"
          type="search"
          id="search-input"
          placeholder="Search 35+ calculators... (Press '/' to focus)"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleInputKeyDown}
          aria-label="Search calculators"
          aria-autocomplete="list"
          aria-expanded={isOpen && results.length > 0}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              fontSize: '1rem',
              padding: '4px 8px'
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div
          ref={dropdownRef}
          className="search-dropdown"
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 100,
            maxHeight: '400px',
            overflowY: 'auto',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-modal)'
          }}
        >
          {results.length === 0 ? (
            <p className="search-no-results" style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No calculators found for "<strong>{query}</strong>"
            </p>
          ) : (
            results.map((c, i) => (
              <a
                key={c.slug}
                className={`search-result ${i === selectedIndex ? 'search-result--active' : ''}`}
                href={`/mathlify/tools/${c.slug}/`}
                role="option"
                aria-selected={i === selectedIndex}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '0.875rem 1.25rem',
                  borderBottom: i < results.length - 1 ? '1px solid var(--color-border)' : 'none',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  backgroundColor: i === selectedIndex ? 'var(--color-accent-light)' : 'transparent',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <span className="search-result__icon" style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                  {c.icon}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <div className="search-result__label" style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    {c.name}
                  </div>
                  <div className="search-result__desc" style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.description}
                  </div>
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'var(--color-surface-2)',
                  color: 'var(--color-text-muted)'
                }}>
                  {c.category}
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
