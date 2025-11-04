import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // First check localStorage for cached user
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        try {
          const parsedUser = JSON.parse(cachedUser);
          setUser(parsedUser);
          // Verify with backend that user is still authenticated
          try {
            const profile = await authAPI.getProfile();
            setUser(profile);
            localStorage.setItem('user', JSON.stringify(profile));
          } catch (err) {
            // If verification fails (401 or network error), clear cached user
            setUser(null);
            localStorage.removeItem('user');
          }
        } catch (err) {
          // Invalid JSON in localStorage
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        // No cached user, try to get profile from backend (in case cookie exists)
        try {
          const profile = await authAPI.getProfile();
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
        } catch (err) {
          // No valid session (401) or backend unavailable - that's ok, user is not authenticated
          // Don't log 401 errors as they're expected for unauthenticated users
          if (err.response?.status !== 401) {
            console.error('Auth check error:', err);
          }
          setUser(null);
        }
      }
    } catch (err) {
      // Catch any unexpected errors
      console.error('Auth check error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authAPI.login({ email, password });
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Still clear local state even if API call fails
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

