// main.jsx – Entry point that renders the App component

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Global styles
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* App includes all routes and components */}
    <App />
  </StrictMode>
);
