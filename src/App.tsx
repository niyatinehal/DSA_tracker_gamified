import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
// import { User } from './types';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, user, isLoading, login, signup, logout, updateUser } = useAuth();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile'>('dashboard');

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-600 font-medium">Loading your forest...</p>
        </div>
      </div>
    );
  }

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
          <Dashboard user={user} onUpdateProgress={updateUser} />
        ) : (
          <Profile user={user} onUpdateUser={updateUser} />
        )}
      </main>
    </div>
  );
}

export default App;