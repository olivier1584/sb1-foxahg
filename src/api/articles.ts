import { Article } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/api/articles`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}