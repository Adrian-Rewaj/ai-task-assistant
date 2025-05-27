import api from './api';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}

export async function register(email: string, password: string) {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
}

export function logout() {
  localStorage.removeItem('token');
}

export async function fetchCurrentUser(token: string) {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
