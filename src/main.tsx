import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

// Support both BrowserRouter and HashRouter fallback for static hosting
const isStatic = window.location.protocol === 'file:';
const RouterComponent = isStatic ? HashRouter : BrowserRouter;

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
