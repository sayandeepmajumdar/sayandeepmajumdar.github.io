import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { EraTimelinePage } from './pages/EraTimelinePage';
import { ERAS, getEraById } from './data/eras';
import { EraId } from './types';

function getPathFromLocation(): string {
  if (typeof window === 'undefined') return '/';

  // Handle SPA query redirects if served from 404 fallback (e.g. /itihaas/?p=/freedom-struggle)
  const urlParams = new URLSearchParams(window.location.search);
  const redirectedPath = urlParams.get('p');
  if (redirectedPath) {
    const cleanPath = redirectedPath.startsWith('/') ? redirectedPath : `/${redirectedPath}`;
    urlParams.delete('p');
    const remainingSearch = urlParams.toString() ? `?${urlParams.toString()}` : '';
    const cleanUrl = `/itihaas${cleanPath === '/' ? '/' : cleanPath.endsWith('/') ? cleanPath : cleanPath + '/'}${remainingSearch}`;
    window.history.replaceState(null, '', cleanUrl);
    const cleanRoute =
      cleanPath.endsWith('/') && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath;
    return cleanRoute;
  }

  let pathname = window.location.pathname;
  if (pathname.startsWith('/itihaas')) {
    pathname = pathname.substring('/itihaas'.length);
  } else if (pathname.startsWith('/history')) {
    pathname = pathname.substring('/history'.length);
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }
  return pathname || '/';
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => getPathFromLocation());
  const [selectedFigure, setSelectedFigure] = useState<string | null>(null);

  // Listen for browser back / forward navigation
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
    const destinationUrl = `/itihaas${cleanPath === '/' ? '/' : cleanPath.endsWith('/') ? cleanPath : cleanPath + '/'}`;
    window.history.pushState(null, '', destinationUrl);
    const normalizedRoute =
      cleanPath.endsWith('/') && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath;
    setCurrentRoute(normalizedRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEra = (eraId: EraId) => {
    navigate(`/${eraId}`);
  };

  const handleSelectFigure = (figure: string) => {
    setSelectedFigure(figure);
    // If currently on landing page, navigate into freedom-struggle by default
    if (currentRoute === '/' || currentRoute === '') {
      navigate('/freedom-struggle');
    }
  };

  const handleClearFigure = () => {
    setSelectedFigure(null);
  };

  // Determine active era from current route
  const currentSlug = currentRoute.replace(/^\//, '');
  const activeEra = getEraById(currentSlug);

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-stone-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar
        currentPath={currentRoute}
        activeEraId={activeEra?.id}
        activeFigureFilter={selectedFigure}
        onNavigate={navigate}
        onClearFigureFilter={handleClearFigure}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeEra ? (
          <EraTimelinePage
            era={activeEra}
            activeFigureFilter={selectedFigure}
            onSelectEra={handleSelectEra}
            onSelectFigure={handleSelectFigure}
            onClearFigureFilter={handleClearFigure}
          />
        ) : (
          <LandingPage
            onSelectEra={handleSelectEra}
            onSelectFigure={handleSelectFigure}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
};
