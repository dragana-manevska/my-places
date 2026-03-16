import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useAuthBootstrap } from '@/src/features/auth/hooks/useAuthBootstrap';
import { AuthContextProvider } from '@/src/features/auth/store/auth.store';
import { ExpensesContextProvider } from '@/src/features/expenses/store/expenses.store';
import { Colors } from '@/src/theme/colors';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Prevent auto-hide only after mount
function useSplashScreenPreventAutoHide() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
}

const AppLayout = ({ colorScheme }: { colorScheme: 'light' | 'dark' }) => {
  useSplashScreenPreventAutoHide();
  useAuthBootstrap();

  return (
    <ExpensesContextProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.primary100,
        }}
      >
        {/* Index */}
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
          }}
        />

        {/* Auth group */}
        <Stack.Screen
          name='(auth)'
          options={{
            headerShown: false,
          }}
        />

        {/* Tabs group */}
        <Stack.Screen
          name='(tabs)'
          options={{
            headerShown: false,
          }}
        />

        {/* Modal */}
        <Stack.Screen
          name='(modals)'
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack>
    </ExpensesContextProvider>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || 'light';

  return (
    <ThemeProvider value={scheme === 'light' ? DefaultTheme : DarkTheme}>
      <StatusBar style='light' />

      <AuthContextProvider>
        <AppLayout colorScheme='light' />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
