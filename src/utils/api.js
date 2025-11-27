import axios from 'axios';

// Base API URL - adjust this to match your backend (if you have other API endpoints)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional - for adding tokens if needed)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error codes
      if (error.response.status === 401) {
        // Unauthorized - clear auth state
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints - REMOVED (now handled by AuthContext with localStorage)
// These are kept for reference but not used for authentication
export const authAPI = {
  // Note: Authentication is now handled entirely in AuthContext using localStorage
  // These functions are kept for backward compatibility but won't be called
  register: async (data) => {
    console.warn('authAPI.register is deprecated. Use AuthContext.register instead.');
    throw new Error('Backend authentication is disabled. Use AuthContext.');
  },

  login: async (data) => {
    console.warn('authAPI.login is deprecated. Use AuthContext.login instead.');
    throw new Error('Backend authentication is disabled. Use AuthContext.');
  },

  logout: async () => {
    console.warn('authAPI.logout is deprecated. Use AuthContext.logout instead.');
    throw new Error('Backend authentication is disabled. Use AuthContext.');
  },

  getProfile: async () => {
    console.warn('authAPI.getProfile is deprecated. Use AuthContext.user instead.');
    throw new Error('Backend authentication is disabled. Use AuthContext.');
  },
};

export default api;
