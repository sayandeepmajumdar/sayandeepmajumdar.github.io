import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

// Support HashRouter for extensions (chrome-extension:, moz-extension:) and static hosting (file:)
const isExtensionOrStatic =
  typeof window !== 'undefined' &&
  (window.location.protocol.startsWith('chrome-extension') ||
    window.location.protocol.startsWith('moz-extension') ||
    window.location.protocol === 'file:');

const RouterComponent = isExtensionOrStatic ? HashRouter : BrowserRouter;

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterComponent>
        <App />
      </RouterComponent>
    </React.StrictMode>
  );
}
