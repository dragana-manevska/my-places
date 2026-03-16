import { useAuthContext } from '@/src/features/auth/store/auth.store';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Redirect href='/(tabs)/recent-expenses' />
  ) : (
    <Redirect href='/(auth)/login' />
  );
}
