import { storage } from '@/src/lib/storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { signUpApi } from '../api/auth.api';
import { useAuthContext } from '../store/auth.store';

export const useRegister = () => {
  const { setAuth } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const authData = await signUpApi(email, password);

      if (!authData?.token) {
        throw new Error('No authentication token received');
      }

      await storage.set('token', authData.token);
      await storage.set('tokenTimestamp', Date.now().toString());

      const userDataToStore = {
        ...authData.user,
        token: authData.token,
      };
      await storage.set('authUserData', JSON.stringify(userDataToStore));

      setAuth(authData.token, authData.user);

      router.replace('/(tabs)/recent-expenses');
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.message ||
        'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, register };
};
