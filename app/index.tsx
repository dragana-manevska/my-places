import { useAuthContext } from '@/src/features/auth/store/auth.store';
import { init } from '@/src/shared/utils/database';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { isAuthenticated } = useAuthContext();
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => {
        console.error('Database initialization failed:', error);
      });
  }, []);

  if (!dbInitialized) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return isAuthenticated ? (
    <Redirect href='/(tabs)/recent-expenses' />
  ) : (
    <Redirect href='/(auth)/login' />
  );
}
