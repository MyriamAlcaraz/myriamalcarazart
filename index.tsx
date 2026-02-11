// ARCHIVO: src/index.tsx (CÓDIGO COMPLETO Y FIABLE)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Añadir React.StrictMode es crucial para detectar y prevenir fallos
  <React.StrictMode>
    <App />
  </React.StrictMode>
);