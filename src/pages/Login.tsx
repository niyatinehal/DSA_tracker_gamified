// src/pages/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../redux/authenticationSlice';
import LoginPage from '../components/LoginPage';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Login failed');
      }

      const res = await response.json();
      dispatch(setAuth({ token: res.token, user: res.user }));
      navigate('/dashboard');
      return res;

    } catch (error: any) {
      throw new Error(error.message || 'Something went wrong during login');
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Signup failed');
      }

      const res = await response.json();
      dispatch(setAuth({ token: res.token, user: res.user }));
      navigate('/dashboard');
      return res;

    } catch (error: any) {
      throw new Error(error.message || 'Something went wrong during signup');
    }
  };

  return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
};

export default Login;
