export type User = { id: string; name: string; email: string };
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'active' | 'completed';
export type Task = {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
};
export type TaskInput = {
  title: string;
  description?: string | null;
  dueDate?: string | null;
  priority: Priority;
  status: Status;
};
export type AuthResult = { token: string; user: User };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const TOKEN_KEY = 'daymark_token';

export const session = {
  get: () => (typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY)),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = session.get();
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      cache: 'no-store',
    });
  } catch {
    throw new Error('Cannot reach the server. Check that the backend is running.');
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.message;
    throw new Error(
      Array.isArray(message)
        ? message.join(' ')
        : message || 'Something went wrong. Please try again.',
    );
  }
  return data as T;
}
