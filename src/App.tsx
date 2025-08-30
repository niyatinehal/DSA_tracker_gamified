import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { User } from './types';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, user, login, signup, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile'>('dashboard');

  const updateUserProgress = (newProgress: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...newProgress };
      // Update localStorage to persist changes
      localStorage.setItem('dsa-forest-user', JSON.stringify(updatedUser));
      // Force re-render by updating auth state
      window.location.reload();
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated || !user) {
    return <LoginPage onLogin={login} onSignup={signup} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        user={user}
        onLogout={logout}
      />
      
      <main className="pt-20">
        {currentPage === 'dashboard' ? (
          <Dashboard user={user} onUpdateProgress={updateUserProgress} />
        ) : (
          <Profile user={user} onUpdateUser={(updatedUser) => {
            localStorage.setItem('dsa-forest-user', JSON.stringify(updatedUser));
            window.location.reload();
          }} />
        )}
      </main>
    </div>
  );
}

export default App;