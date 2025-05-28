'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Próba odczytania błędu z odpowiedzi JSON
        let errorMessage = 'Coś poszło nie tak';
        try {
          const errorData = await res.json();
          if (errorData?.message) errorMessage = errorData.message;
        } catch {
          // jeśli nie JSON to ignoruj
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      // Rejestracja się powiodła — przekieruj na login
      router.push('/');
    } catch (err) {
      setError('Błąd sieci');
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Zarejestruj się</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8, fontSize: 16 }}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8, fontSize: 16 }}
          autoComplete="new-password"
          minLength={6} // warto wymusić minimalną długość
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 10, fontSize: 16 }}
        >
          {loading ? 'Rejestracja...' : 'Zarejestruj się'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
    </div>
  );
}
