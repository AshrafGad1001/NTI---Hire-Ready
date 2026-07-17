import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // required to send and receive httpOnly cookies (refresh token)
});

// Request interceptor to add the access token
api.interceptors.request.use(
  (config) => {
    // In a real app, you might store this in memory or a global state (e.g. Zustand/Context)
    // For simplicity in this demo, we'll store it in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401s and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const res = await axios.post(
          'http://localhost:5000/api/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        
        if (res.data?.data?.accessToken) {
          const newAccessToken = res.data.data.accessToken;
          localStorage.setItem('access_token', newAccessToken);
          
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
