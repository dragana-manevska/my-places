import { refreshSession } from '@/src/features/auth/services/auth.session';
import { storage } from '@/src/lib/storage';
import axios from 'axios';

const DATABASE_URL = process.env.EXPO_PUBLIC_FIREBASE_DB_URL;

export const firebaseDbClient = axios.create({
  baseURL: DATABASE_URL,
});

firebaseDbClient.interceptors.request.use(async (config) => {
  const token = await storage.get('token');

  if (token) {
    config.params = {
      ...config.params,
      auth: token,
    };
  }

  return config;
});

firebaseDbClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isExpired =
      error.response?.data?.error?.message?.includes('TOKEN_EXPIRED');

    if (isExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshSession();

        originalRequest.params = {
          ...originalRequest.params,
          auth: newToken,
        };

        return firebaseDbClient(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
