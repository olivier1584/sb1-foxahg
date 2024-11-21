import { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function login(username: string, password: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}