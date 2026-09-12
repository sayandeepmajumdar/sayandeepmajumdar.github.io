import React from 'react';
import { Heart, Sparkles, ChefHat } from 'lucide-react';
import { REGIONS } from '../data/recipes';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectRegion?: (region: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectRegion }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-700 via-amber-500 to-rose-800" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/rasoi/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-700 to-amber-500 flex items-center justify-center text-xl shadow-md">
                🍛
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                Rasoi
              </span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              "Discover authentic Indian recipes, one delicious dish at a time."
            </p>
            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              From the smoky tandoors of Punjab to the coconut-rich dishes of Kerala, Rasoi brings
              together 50+ time-tested authentic regional dishes with precise measurements and
              realistic culinary techniques.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>100% Client-Side • Privacy First • Zero Ads • No Backend Needed</span>
            </div>
          </div>

          {/* Regional Cuisines */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase font-serif flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-amber-400" />
              Cuisine Regions
            </h3>
            <ul className="space-y-2 text-xs text-stone-400">
              {REGIONS.slice(0, 6).map((region) => (
                <li key={region}>
                  <button
                    onClick={() => {
                      if (onSelectRegion) onSelectRegion(region);
                      onNavigate('/explore');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 hover:translate-x-1 transition-all"
                  >
                    {region} Recipes
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Regions */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase font-serif">
              More Flavors
            </h3>
            <ul className="space-y-2 text-xs text-stone-400">
              {REGIONS.slice(6).map((region) => (
                <li key={region}>
                  <button
                    onClick={() => {
                      if (onSelectRegion) onSelectRegion(region);
                      onNavigate('/explore');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 hover:translate-x-1 transition-all"
                  >
                    {region}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onNavigate('/explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  View All 50 Recipes →
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase font-serif">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a
                  href="/rasoi/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/rasoi/explore/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors block"
                >
                  Recipe Explorer
                </a>
              </li>
              <li>
                <a
                  href="/rasoi/favorites/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/favorites');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors block"
                >
                  My Saved Recipes
                </a>
              </li>
              <li>
                <a
                  href="/rasoi/about/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors block"
                >
                  About Rasoi & Heritage
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Rasoi. Celebrating India's incredible food culture.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for authentic Indian home cooking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
