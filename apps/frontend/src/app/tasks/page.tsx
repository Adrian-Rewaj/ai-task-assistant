'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // zmiana na next/navigation
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';

export default function TasksPage() {
  const { user, logout, loading } = useAuth();
  const { tasks, addTask, removeTask } = useTasks();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Redirect jeśli nie ma usera i loading się zakończył
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask(title, description);
    setTitle('');
    setDescription('');
  }

  if (loading || !user) {
    // Możesz tu dodać spinner lub jakiś placeholder
    return <p>Ładowanie...</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', paddingTop: 40 }}>
      <h1>Witaj, {user.email}</h1>
      <button
        onClick={() => {
          logout();
          router.push('/login');
        }}
        style={{ marginBottom: 20, padding: '8px 16px', cursor: 'pointer' }}
      >
        Wyloguj się
      </button>

      <h2>Dodaj nowy task</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 30 }}>
        <input
          placeholder="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8, padding: 8, fontSize: 16 }}
        />
        <textarea
          placeholder="Opis"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', marginBottom: 8, padding: 8, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}>
          Dodaj
        </button>
      </form>

      <h2>Twoje taski</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              marginBottom: 16,
              padding: 12,
              border: '1px solid #ddd',
              borderRadius: 6,
            }}
          >
            <strong>{task.title}</strong>
            <p style={{ margin: '6px 0' }}>{task.description}</p>
            <button
              onClick={() => removeTask(task.id)}
              style={{
                backgroundColor: '#e53e3e',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
