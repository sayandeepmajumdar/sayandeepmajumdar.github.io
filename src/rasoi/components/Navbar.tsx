import React, { useState } from 'react';
import { Search, Heart, Menu, X, Sparkles, Compass, Home, Info, ChefHat } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenPantryModal: () => void;
  onFocusSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenPantryModal,
  onFocusSearch,
}) => {
  const { count: favoritesCount } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Explore Recipes', path: '/explore', icon: Compass },
    { label: 'Favorites', path: '/favorites', icon: Heart, badge: favoritesCount },
    { label: 'About', path: '/about', icon: Info },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf7f2]/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a
            href="/rasoi/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-900 via-rose-800 to-amber-600 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform duration-300">
              🍛
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-rose-950 font-serif flex items-center gap-1.5">
                Rasoi
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              </span>
              <p className="text-[11px] font-medium tracking-wide uppercase text-stone-500 hidden sm:block">
                Authentic Indian Recipes
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? currentPath === '/' || currentPath === ''
                  : currentPath.startsWith(link.path);
              const Icon = link.icon;
              const href = `/rasoi${link.path === '/' ? '/' : link.path + '/'}`;

              return (
                <a
                  key={link.path}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.path);
                  }}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-rose-900 text-white shadow-sm shadow-rose-950/20'
                      : 'text-stone-700 hover:text-rose-900 hover:bg-rose-50/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span
                      className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isActive
                          ? 'bg-amber-400 text-rose-950'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Pantry CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* "Cook With What You Have" Button */}
            <button
              onClick={onOpenPantryModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-orange-900/20 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              title="Cook with what you have in your pantry"
            >
              <ChefHat className="w-4 h-4 text-amber-100" />
              <span className="hidden sm:inline">Pantry Match</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
            </button>

            {/* Quick Search Button */}
            <button
              onClick={() => {
                if (currentPath !== '/explore') {
                  handleNavClick('/explore');
                }
                if (onFocusSearch) {
                  setTimeout(onFocusSearch, 100);
                }
              }}
              className="p-2.5 rounded-full text-stone-700 hover:text-rose-900 hover:bg-rose-50 transition-colors border border-stone-200"
              aria-label="Search recipes"
              title="Search recipes"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Favorites Icon Button (Mobile visible) */}
            <button
              onClick={() => handleNavClick('/favorites')}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-rose-900 hover:bg-rose-50 transition-colors border border-stone-200"
              aria-label="View Favorites"
              title="View Favorites"
            >
              <Heart
                className={`w-4 h-4 ${
                  favoritesCount > 0 ? 'fill-rose-600 text-rose-600' : 'text-stone-600'
                }`}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-700 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-stone-700 hover:text-rose-900 hover:bg-stone-100 transition-colors border border-stone-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf7f2] border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? currentPath === '/' || currentPath === ''
                : currentPath.startsWith(link.path);
            const Icon = link.icon;
            const href = `/rasoi${link.path === '/' ? '/' : link.path + '/'}`;

            return (
              <a
                key={link.path}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.path);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-stone-800 hover:bg-rose-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-amber-400 text-rose-950' : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenPantryModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm shadow-md"
            >
              <ChefHat className="w-4 h-4 text-amber-100" />
              <span>Cook With What You Have</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
