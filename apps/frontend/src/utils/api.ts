import axios from 'axios';
import { NEXT_API_URL } from '../config/config';

const api = axios.create({
  baseURL: NEXT_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
