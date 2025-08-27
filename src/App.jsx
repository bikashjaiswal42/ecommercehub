import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;