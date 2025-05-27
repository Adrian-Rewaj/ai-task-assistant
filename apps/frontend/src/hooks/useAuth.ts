import { useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, fetchCurrentUser } from '../services/auth';
import { User } from '../types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sprawdź czy token jest i pobierz usera
  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await fetchCurrentUser(token);
          setUser(userData);
        } catch (e) {
          console.error('Nie udało się pobrać usera', e);
          setUser(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  async function login(email: string, password: string) {
    const data = await apiLogin(email, password);
    localStorage.setItem('token', data.access_token);
    setUser(data.user);
  }

  function logout() {
    apiLogout();
    setUser(null);
    localStorage.removeItem('token');
  }

  return { user, login, logout, loading };
}
