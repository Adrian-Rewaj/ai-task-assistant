'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/tasks');
    } catch (err) {
      setError('Nieprawidłowy email lub hasło');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 100 }}>
      <h1>Zaloguj się</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8, fontSize: 16 }}
          autoComplete="email"
        />
        <label>Hasło:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8, fontSize: 16 }}
          autoComplete="current-password"
        />
        <button type="submit" style={{ width: '100%', padding: 10, fontSize: 16 }}>
          Zaloguj
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}

      <p style={{ marginTop: 20, fontSize: 14, textAlign: 'center' }}>
        Nie masz konta?{' '}
        <a href="/register" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          Zarejestruj się
        </a>
      </p>
    </div>
  );
}
