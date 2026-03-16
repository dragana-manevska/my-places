import { storage } from '@/src/lib/storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { signInApi } from '../api/auth.api';
import { useAuthContext } from '../store/auth.store';

export const useLogin = () => {
  const { setAuth } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const authData = await signInApi(email, password);

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
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.message ||
        'An error occurred while signing in. Please try again.';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    login,
  };
};
