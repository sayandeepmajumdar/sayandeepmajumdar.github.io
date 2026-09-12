import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorerPage } from './pages/ExplorerPage';
import { RecipeDetailsPage } from './pages/RecipeDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { PantrySearchModal } from './components/PantrySearchModal';
import { Recipe, Region, FilterState } from './types';
import { getRecipeBySlug, RECIPES } from './data/recipes';

function getPathFromLocation(): string {
  if (typeof window === 'undefined') return '/';

  // Migrate legacy hash URLs (e.g. /rasoi/#/recipe/butter-chicken -> /rasoi/recipe/butter-chicken/)
  if (window.location.hash) {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    if (rawHash) {
      const normalizedPath = rawHash.startsWith('/') ? rawHash : `/${rawHash}`;
      const cleanUrl = `/rasoi${normalizedPath === '/' ? '/' : normalizedPath.endsWith('/') ? normalizedPath : normalizedPath + '/'}${window.location.search || ''}`;
      window.history.replaceState(null, '', cleanUrl);
      const cleanRoute = normalizedPath.endsWith('/') && normalizedPath.length > 1 ? normalizedPath.slice(0, -1) : normalizedPath;
      return cleanRoute;
    }
  }

  // Handle SPA query redirects if served from 404 fallback (e.g. /rasoi/?p=/recipe/butter-chicken)
  const urlParams = new URLSearchParams(window.location.search);
  const redirectedPath = urlParams.get('p');
  if (redirectedPath) {
    const cleanPath = redirectedPath.startsWith('/') ? redirectedPath : `/${redirectedPath}`;
    urlParams.delete('p');
    const remainingSearch = urlParams.toString() ? `?${urlParams.toString()}` : '';
    const cleanUrl = `/rasoi${cleanPath === '/' ? '/' : cleanPath.endsWith('/') ? cleanPath : cleanPath + '/'}${remainingSearch}`;
    window.history.replaceState(null, '', cleanUrl);
    const cleanRoute = cleanPath.endsWith('/') && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath;
    return cleanRoute;
  }

  let pathname = window.location.pathname;
  if (pathname.startsWith('/rasoi')) {
    pathname = pathname.substring('/rasoi'.length);
  }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }
  return pathname || '/';
}

export const App: React.FC = () => {
  // Clean HTML5 path routing: '/', '/explore', '/recipe/:slug', '/favorites', '/about'
  const [currentRoute, setCurrentRoute] = useState<string>(() => getPathFromLocation());

  const [pantryModalOpen, setPantryModalOpen] = useState(false);
  const [explorerFilters, setExplorerFilters] = useState<Partial<FilterState>>({});

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getPathFromLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const destinationUrl = `/rasoi${cleanPath === '/' ? '/' : cleanPath.endsWith('/') ? cleanPath : cleanPath + '/'}`;
    window.history.pushState(null, '', destinationUrl);
    const normalizedRoute = cleanPath.endsWith('/') && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath;
    setCurrentRoute(normalizedRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.slug}`);
  };

  const handleSearchSubmitFromHero = (query: string) => {
    setExplorerFilters({ searchQuery: query });
    navigate('/explore');
  };

  const handleSelectRegion = (region: string) => {
    setExplorerFilters({ region: region as Region });
    navigate('/explore');
  };

  // Route matching logic
  const renderCurrentPage = () => {
    // 1. Recipe Details Route: /recipe/:slug
    if (currentRoute.startsWith('/recipe/')) {
      const slug = currentRoute.replace('/recipe/', '').split('/')[0].split('?')[0];
      const recipe = getRecipeBySlug(slug);

      if (recipe) {
        return (
          <RecipeDetailsPage
            recipe={recipe}
            onBack={() => navigate('/explore')}
            onSelectRecipe={handleSelectRecipe}
          />
        );
      } else {
        // Recipe not found fallback
        return (
          <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <span className="text-4xl">🔍</span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">Recipe Not Found</h2>
            <p className="text-stone-600 text-sm">
              We couldn't find a recipe matching that link in our authentic collection.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="px-6 py-2.5 rounded-full bg-rose-900 text-white font-semibold text-sm hover:bg-rose-950"
            >
              Browse all recipes
            </button>
          </div>
        );
      }
    }

    // 2. Explore Page
    if (currentRoute === '/explore' || currentRoute.startsWith('/explore')) {
      return (
        <ExplorerPage
          onSelectRecipe={handleSelectRecipe}
          initialFilters={explorerFilters}
        />
      );
    }

    // 3. Favorites Page
    if (currentRoute === '/favorites') {
      return <FavoritesPage onSelectRecipe={handleSelectRecipe} onNavigate={navigate} />;
    }

    // 4. About Page
    if (currentRoute === '/about') {
      return <AboutPage onNavigate={navigate} onSelectRegion={handleSelectRegion} />;
    }

    // Default: Home Page
    return (
      <HomePage
        onSelectRecipe={handleSelectRecipe}
        onNavigate={navigate}
        onSearchSubmit={handleSearchSubmitFromHero}
        onSelectRegion={handleSelectRegion}
        onOpenPantryModal={() => setPantryModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-900 font-sans selection:bg-rose-900 selection:text-white">
      {/* Sticky Navbar */}
      <Navbar
        currentPath={currentRoute}
        onNavigate={navigate}
        onOpenPantryModal={() => setPantryModalOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} onSelectRegion={handleSelectRegion} />

      {/* "Cook With What You Have" Pantry Modal */}
      <PantrySearchModal
        isOpen={pantryModalOpen}
        onClose={() => setPantryModalOpen(false)}
        onSelectRecipe={handleSelectRecipe}
      />
    </div>
  );
};
