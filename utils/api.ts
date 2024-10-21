import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = 'https://api.granularx.com';

export const useAuthenticatedFetch = () => {
  const { hashToken } = useAuth();

  return async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = new Headers(options.headers);
    if (hashToken) {
      headers.set('Authorization', `Bearer ${hashToken}`);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };
};
