import api from './api';

export async function getTasks() {
  const response = await api.get('/tasks');
  return response.data;
}

export async function createTask(title: string, description: string) {
  const response = await api.post('/tasks', { title, description });
  return response.data;
}

export async function updateTask(id: number, data: { title?: string; description?: string }) {
  const response = await api.patch(`/tasks/${id}`, data);
  return response.data;
}

export async function deleteTask(id: number) {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}
