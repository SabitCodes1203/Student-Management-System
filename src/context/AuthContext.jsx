import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper functions for localStorage user management
const getUsersFromStorage = () => {
  try {
    const users = localStorage.getItem('app_users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users) => {
  try {
    localStorage.setItem('app_users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to storage:', error);
  }
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

  const checkAuth = () => {
    try {
      // Check localStorage for cached user
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        try {
          const parsedUser = JSON.parse(cachedUser);
          setUser(parsedUser);
        } catch (err) {
          // Invalid JSON in localStorage
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      
      // Get existing users
      const users = getUsersFromStorage();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user object
      const newUser = {
        id: Date.now().toString(), // Simple ID generation
        fullName: userData.fullName,
        email: userData.email.toLowerCase(),
        password: userData.password, // In production, you'd hash this
        mobileNumber: userData.mobileNumber || '',
        gender: userData.gender || '',
        dateOfBirth: userData.dateOfBirth || '',
        createdAt: new Date().toISOString(),
      };
      
      // Add user to storage
      users.push(newUser);
      saveUsersToStorage(users);
      
      // Return success response (matching backend format)
      return {
        message: 'Registration successful',
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          mobileNumber: newUser.mobileNumber,
          gender: newUser.gender,
          dateOfBirth: newUser.dateOfBirth,
        },
      };
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      
      // Get users from storage
      const users = getUsersFromStorage();
      
      // Find user by email
      const foundUser = users.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Check password (in production, you'd compare hashed passwords)
      if (foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password
      const userData = {
        id: foundUser.id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        mobileNumber: foundUser.mobileNumber,
        gender: foundUser.gender,
        dateOfBirth: foundUser.dateOfBirth,
      };
      
      // Set user in state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Return success response (matching backend format)
      return {
        message: 'Login successful',
        user: userData,
      };
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Still clear local state even if there's an error
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
