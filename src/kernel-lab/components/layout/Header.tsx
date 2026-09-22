import React from 'react';
import {
  Cpu,
  Search,
  Keyboard,
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface HeaderProps {
  currentTab: string;
  onNavigateHome: () => void;
  onOpenSearch: () => void;
  onOpenShortcuts: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigateHome,
  onOpenSearch,
  onOpenShortcuts,
  theme,
  onToggleTheme,
  mobileMenuOpen,
  onToggleMobileMenu,
  sidebarCollapsed = false,
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="hidden md:flex p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              title={sidebarCollapsed ? 'Expand Sidebar (Show navigation)' : 'Collapse Sidebar (Full screen lab view)'}
              aria-label="Toggle Sidebar"
            >
              {sidebarCollapsed ? (
                <PanelLeft className="w-4 h-4 text-blue-400" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-slate-400" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[1px] shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-100 text-base tracking-tight group-hover:text-blue-400 transition-colors">
                  Kernel Lab
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 hidden sm:inline-block">
                  v1.0
                </span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:block font-mono">
                Interactive DSA Laboratory
              </span>
            </div>
          </button>
        </div>

        {/* Global Search and Shortcuts Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search / Command palette launcher */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-xs"
            title="Search algorithms (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Quick Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono text-slate-500 bg-slate-800 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Keyboard Shortcuts Dialog */}
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
            title="Keyboard Shortcuts (?)"
            aria-label="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Return to Portfolio Link */}
          <a
            href="/"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <span>Portfolio</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
