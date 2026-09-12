import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { FavoritesProvider } from './context/FavoritesContext';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </React.StrictMode>
  );
}
