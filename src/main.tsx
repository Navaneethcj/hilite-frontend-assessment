import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Dev-only: seed sample visitors on first load
import { seedVisitorsIfEmpty } from './utils/seed';

// Global styles
import './index.css';

// Roboto font (required by MUI)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Run seeder only in development
if (import.meta.env.DEV) {
  try {
    seedVisitorsIfEmpty(30);
  } catch (e) {
    // ignore
  }
}
