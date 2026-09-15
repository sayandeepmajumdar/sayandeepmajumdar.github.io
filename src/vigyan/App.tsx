import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TimelinePage } from './pages/TimelinePage';

export const App: React.FC = () => {
  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#06080e] text-stone-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar onReset={handleReset} />

      {/* Main Single Continuous Timeline View */}
      <div className="flex-1 w-full">
        <TimelinePage />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
