import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
      config.headers['X-User-Role'] = authStore.user?.role; // Send user role in header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
