import { useState, useEffect } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/tasks';
import { Task } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function addTask(title: string, description: string) {
    const newTask = await createTask(title, description);
    setTasks((prev) => [...prev, newTask]);
  }

  async function editTask(
    id: number,
    updates: { title?: string; description?: string },
  ) {
    const updatedTask = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  }

  async function removeTask(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return { tasks, addTask, editTask, removeTask };
}
