'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe,
  Map,
  Flag,
  Languages,
  Gamepad2,
  BookOpen,
  Trophy,
  Scale,
  Search,
  Menu,
  X,
  Flame,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { GlobalSearch } from './GlobalSearch';
import { useLearningProgress } from '@/lib/store';

const NAV_ITEMS = [
  { href: '/explore', label: 'Explore', icon: Globe },
  { href: '/continents', label: 'Continents', icon: Map },
  { href: '/flags', label: 'Flags', icon: Flag },
  { href: '/languages', label: 'Languages', icon: Languages },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/compare', label: 'Compare', icon: Scale },
  { href: '/progress', label: 'Progress', icon: Trophy },
];

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useLearningProgress();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOpen = () => setIsSearchOpen(true);
    window.addEventListener('open-search', handleOpen);
    return () => window.removeEventListener('open-search', handleOpen);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-2.5 group focus-visible:rounded-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  WORLD EXPLORER
                </span>
                <span className="hidden sm:block text-[10px] font-medium tracking-wide uppercase text-teal-600 dark:text-teal-400 -mt-1">
                  Learn the World
                </span>
              </div>
            </Link>

            <a
              href="https://sayandeepmajumdar.github.io/"
              className="hidden xl:inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800 transition-colors"
              title="Return to Sayandeep's Portfolio"
            >
              <span>← Portfolio</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Streak Pill */}
            <Link
              href="/progress"
              title="Current Daily Streak"
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 text-xs font-bold hover:scale-105 transition-transform"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{state.currentStreak}</span>
            </Link>

            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search countries, capitals, continents"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">Search</span>
              <kbd className="hidden md:inline-flex px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                {state.learnedCountryIds.length} / 195 Countries Learned
              </span>
              <Link
                href="/daily-challenge"
                className="font-medium text-teal-600 dark:text-teal-400 underline underline-offset-2"
              >
                Today&apos;s Challenge
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
