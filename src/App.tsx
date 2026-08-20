import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ToolWrapperPage } from './pages/ToolWrapperPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getStoredTheme, applyTheme } from './lib/storage';

export const App: React.FC = () => {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-accent/20 selection:text-accent font-sans antialiased transition-colors duration-200">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<HomePage />} />
          <Route path="/tools/" element={<HomePage />} />
          <Route path="/tools/:category" element={<CategoryPage />} />
          <Route path="/tools/:category/:slug" element={<ToolWrapperPage />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/:slug" element={<ToolWrapperPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
