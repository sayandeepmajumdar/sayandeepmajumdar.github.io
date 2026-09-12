import React, { useState } from 'react';
import { Compass, Map, Heart, Menu, X, ArrowUpRight } from 'lucide-react';
import { useSaved } from '../context/SavedContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { savedCount } = useSaved();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Map Discovery', path: '/', icon: Map },
    { label: 'Explore India', path: '/explore', icon: Compass },
    {
      label: 'Bucket List',
      path: '/saved',
      icon: Heart,
      badge: savedCount > 0 ? savedCount : undefined,
    },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0f17]/85 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo Branding */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 p-[1px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-2xl bg-[#0e1320] flex items-center justify-center">
              <span className="text-xl">✈️</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-display tracking-wider bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                YATRA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                India
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Find your way through India
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(link.path);

            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-sm border border-white/10 font-semibold'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : ''}`} />
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Return to Personal Portfolio / Tools */}
          <a
            href="/tools/"
            className="flex items-center gap-1.5 ml-4 px-3.5 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 border border-white/5 hover:border-white/20 transition-colors"
          >
            <span>Developer Tools</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => handleNavClick('/saved')}
            className="relative p-2 rounded-xl text-stone-300 hover:text-white"
          >
            <Heart className="w-5 h-5 text-rose-400" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0c0f17]/95 backdrop-blur-2xl p-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(link.path);

            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-white font-semibold border border-amber-500/30'
                    : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <a
              href="/"
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1 py-1"
            >
              <span>Main Portfolio</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="/tools/"
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1 py-1"
            >
              <span>Tools</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
