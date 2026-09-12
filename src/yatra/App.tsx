import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { SavedPage } from './pages/SavedPage';
import { Destination, Region } from './types';

function getPathFromLocation(): string {
  if (typeof window === 'undefined') return '/';

  // Handle SPA query redirects if served from 404 fallback (e.g. /yatra/?p=/explore)
  const urlParams = new URLSearchParams(window.location.search);
  const redirectedPath = urlParams.get('p');
  if (redirectedPath) {
    const cleanPath = redirectedPath.startsWith('/') ? redirectedPath : `/${redirectedPath}`;
    urlParams.delete('p');
    const remainingSearch = urlParams.toString() ? `?${urlParams.toString()}` : '';
    const cleanUrl = `/yatra${cleanPath === '/' ? '/' : cleanPath.endsWith('/') ? cleanPath : cleanPath + '/'}${remainingSearch}`;
    window.history.replaceState(null, '', cleanUrl);
    const cleanRoute =
      cleanPath.endsWith('/') && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath;
    return cleanRoute;
  }

  let pathname = window.location.pathname;
  if (pathname.startsWith('/yatra')) {
    pathname = pathname.substring('/yatra'.length);
  }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }
  return pathname || '/';
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => getPathFromLocation());
  const [selectedDestinationIdForHome, setSelectedDestinationIdForHome] = useState<string | null>(null);
  const [exploreTravelStyle, setExploreTravelStyle] = useState<string | undefined>(undefined);

  // Listen for browser back/forward buttons
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
    const destinationUrl = `/yatra${cleanPath === '/' ? '/' : cleanPath.endsWith('/') ? cleanPath : cleanPath + '/'}`;
    window.history.pushState(null, '', destinationUrl);
    const normalizedRoute =
      cleanPath.endsWith('/') && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath;
    setCurrentRoute(normalizedRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When user clicks "Fly on Map" from Explore or Saved, navigate to Home and start the flight
  const handleTravelToDestinationFromElsewhere = (dest: Destination) => {
    setSelectedDestinationIdForHome(dest.id);
    navigate('/');
  };

  const handleNavigateToExploreWithStyle = (style?: string) => {
    setExploreTravelStyle(style);
    navigate('/explore');
  };

  const handleSelectRegionFromFooter = (region: Region) => {
    setExploreTravelStyle(region);
    navigate('/explore');
  };

  // Route rendering
  const renderCurrentPage = () => {
    // 1. Destination deep link: /destination/:id
    if (currentRoute.startsWith('/destination/')) {
      const destId = currentRoute.replace('/destination/', '').split('/')[0];
      return (
        <HomePage
          initialDestinationId={destId}
          onNavigateToExplore={handleNavigateToExploreWithStyle}
        />
      );
    }

    // 2. Explore Page: /explore
    if (currentRoute === '/explore' || currentRoute.startsWith('/explore')) {
      return (
        <ExplorePage
          onTravelToDestination={handleTravelToDestinationFromElsewhere}
          initialTravelStyle={exploreTravelStyle}
        />
      );
    }

    // 3. Saved Bucket List Page: /saved
    if (currentRoute === '/saved' || currentRoute.startsWith('/saved')) {
      return (
        <SavedPage
          onTravelToDestination={handleTravelToDestinationFromElsewhere}
          onNavigateToExplore={() => navigate('/explore')}
        />
      );
    }

    // Default: Home Page
    return (
      <HomePage
        initialDestinationId={selectedDestinationIdForHome}
        onNavigateToExplore={handleNavigateToExploreWithStyle}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0f17] text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar currentPath={currentRoute} onNavigate={navigate} />

      {/* Main Page Area */}
      <main className="flex-1 w-full">{renderCurrentPage()}</main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={navigate}
        onSelectRegion={handleSelectRegionFromFooter}
      />
    </div>
  );
};
