// App.js or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ShopProvider } from './Context/ShopContext';
import ErrorBoundary from './Components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopProvider>
      <App />
      <ErrorBoundary/>
    </ShopProvider>
  </React.StrictMode>
);
