import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <AuthScreen />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;