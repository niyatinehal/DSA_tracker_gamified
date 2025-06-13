import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { User } from './types';
import { mockUser } from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile'>('dashboard');
  const [user, setUser] = useState<User>(mockUser);

  const updateUserProgress = (newProgress: Partial<User>) => {
    setUser(prev => ({ ...prev, ...newProgress }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        user={user}
      />
      
      <main className="pt-20">
        {currentPage === 'dashboard' ? (
          <Dashboard user={user} onUpdateProgress={updateUserProgress} />
        ) : (
          <Profile user={user} onUpdateUser={setUser} />
        )}
      </main>
    </div>
  );
}

export default App;