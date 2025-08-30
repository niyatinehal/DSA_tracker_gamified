import { useState, useEffect } from 'react';
import { User } from '../types';
import { mockUser } from '../data/mockData';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('dsa-forest-auth');
    const savedUser = localStorage.getItem('dsa-forest-user');
    
    if (savedAuth === 'true' && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('dsa-forest-auth');
        localStorage.removeItem('dsa-forest-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, validate credentials with backend
    if (email && password) {
      const userData = { ...mockUser, email };
      setUser(userData);
      setIsAuthenticated(true);
      
      // Persist session
      localStorage.setItem('dsa-forest-auth', 'true');
      localStorage.setItem('dsa-forest-user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, create new user account
    if (email && password && name) {
      const userData: User = {
        ...mockUser,
        id: Date.now().toString(),
        name,
        email,
        currentStreak: 0,
        bestStreak: 0,
        treesPlanted: 0,
        totalSolved: 0,
        lastCompletedDate: '',
        joinDate: new Date().toISOString()
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Persist session
      localStorage.setItem('dsa-forest-auth', 'true');
      localStorage.setItem('dsa-forest-user', JSON.stringify(userData));
    } else {
      throw new Error('All fields are required');
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear session
    localStorage.removeItem('dsa-forest-auth');
    localStorage.removeItem('dsa-forest-user');
  };

  return {
    isAuthenticated,
    user,
    login,
    signup,
    logout
  };
};