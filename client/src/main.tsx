import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={
      <div style={{ padding: 40, color: 'white', background: '#020617', fontFamily: 'sans-serif', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#6366f1' }}>Paramesh Rajuri Portfolio & CMS</h1>
        <p style={{ color: '#94a3b8' }}>Something went wrong. Please refresh the page.</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          Reload Page
        </button>
      </div>
    }>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
