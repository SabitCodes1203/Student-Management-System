import axios from 'axios';

// Base API URL - adjust this to match your backend
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

// Auth API endpoints
export const authAPI = {
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default api;




