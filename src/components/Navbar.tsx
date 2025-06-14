import React from 'react';
import { User as UserIcon, Trees } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentPage: 'dashboard' | 'profile';
  onNavigate: (page: 'dashboard' | 'profile') => void;
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 text-emerald-800 hover:text-emerald-600 transition-colors"
          >
            <Trees className="h-8 w-8" />
            <span className="text-xl font-bold">DSA Forest</span>
          </button>
          
          <button
            onClick={() => onNavigate('profile')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
              currentPage === 'profile'
                ? 'bg-emerald-100 text-emerald-800'
                : 'text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <UserIcon className="h-5 w-5" />
            <span className="font-medium">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;