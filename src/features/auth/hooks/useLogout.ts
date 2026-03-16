import { storage } from '@/src/lib/storage';
import { router } from 'expo-router';
import { useAuthContext } from '../store/auth.store';

export const useLogout = () => {
  const { clearAuth } = useAuthContext();

  const logout = async () => {
    await storage.remove('token');
    await storage.remove('tokenTimestamp');
    await storage.remove('authUserData');

    clearAuth();

    router.replace('/(auth)/login');
  };

  return { logout };
};
