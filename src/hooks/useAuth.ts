import { useState, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';
import { mockUser } from '../data/mockData';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = apiService.getToken();
      
      if (token) {
        try {
          // Try to get current user from API
          const userData = await apiService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear it and fall back to local storage
          apiService.clearToken();
          
          // Check local storage as fallback
          const savedAuth = localStorage.getItem('dsa-forest-auth');
          const savedUser = localStorage.getItem('dsa-forest-user');
          
          if (savedAuth === 'true' && savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
              setIsAuthenticated(true);
            } catch (error) {
              localStorage.removeItem('dsa-forest-auth');
              localStorage.removeItem('dsa-forest-user');
            }
          }
        }
      } else {
        // No token, check local storage for offline mode
        const savedAuth = localStorage.getItem('dsa-forest-auth');
        const savedUser = localStorage.getItem('dsa-forest-user');
        
        if (savedAuth === 'true' && savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } catch (error) {
            localStorage.removeItem('dsa-forest-auth');
            localStorage.removeItem('dsa-forest-user');
          }
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Try API login first
      const response = await apiService.login(email, password);
      apiService.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      
      // Also save to localStorage as backup
      localStorage.setItem('dsa-forest-auth', 'true');
      localStorage.setItem('dsa-forest-user', JSON.stringify(response.user));
    } catch (error) {
      // Fallback to mock login for demo purposes
      console.warn('API login failed, using mock data:', error);
      
      if (email && password) {
        const userData = { ...mockUser, email };
        setUser(userData);
        setIsAuthenticated(true);
        
        localStorage.setItem('dsa-forest-auth', 'true');
        localStorage.setItem('dsa-forest-user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid credentials');
      }
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<void> => {
    try {
      // Try API signup first
      const response = await apiService.register(email, password, name);
      apiService.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      
      localStorage.setItem('dsa-forest-auth', 'true');
      localStorage.setItem('dsa-forest-user', JSON.stringify(response.user));
    } catch (error) {
      // Fallback to mock signup for demo purposes
      console.warn('API signup failed, using mock data:', error);
      
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
        
        localStorage.setItem('dsa-forest-auth', 'true');
        localStorage.setItem('dsa-forest-user', JSON.stringify(userData));
      } else {
        throw new Error('All fields are required');
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Try API logout
      await apiService.logout();
    } catch (error) {
      console.warn('API logout failed:', error);
    } finally {
      // Always clear local state
      apiService.clearToken();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('dsa-forest-auth');
      localStorage.removeItem('dsa-forest-user');
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!user) return;
    
    try {
      // Try API update first
      const updatedUser = await apiService.updateProfile(userData);
      setUser(updatedUser);
      localStorage.setItem('dsa-forest-user', JSON.stringify(updatedUser));
    } catch (error) {
      // Fallback to local update
      console.warn('API update failed, updating locally:', error);
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('dsa-forest-user', JSON.stringify(updatedUser));
    }
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    signup,
    logout,
    updateUser
  };
};