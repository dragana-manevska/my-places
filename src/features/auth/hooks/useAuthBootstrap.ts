import { refreshAuthTokenApi } from '@/src/features/auth/api/auth.api';
import { clearSession } from '@/src/features/auth/services/auth.session';
import { useAuthContext } from '@/src/features/auth/store/auth.store';
import { storage } from '@/src/lib/storage';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export const useAuthBootstrap = () => {
  const { setAuth, clearAuth } = useAuthContext();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = await storage.get('token');
        const authUserDataStr = await storage.get('authUserData');
        const tokenTimestampStr = await storage.get('tokenTimestamp');

        if (!storedToken || !authUserDataStr || !tokenTimestampStr) {
          await SplashScreen.hideAsync();
          return;
        }

        const authUserData = JSON.parse(authUserDataStr);
        const refreshToken = authUserData?.refreshToken;
        const expiresIn = parseInt(authUserData?.expiresIn || '0');
        const tokenTimestamp = parseInt(tokenTimestampStr);

        // Check if token is expired
        const isExpired =
          expiresIn > 0 && Date.now() - tokenTimestamp > expiresIn * 1000;

        console.log('Token expired:', isExpired);

        // If token is expired and refresh token exists, refresh it
        if (isExpired && refreshToken) {
          try {
            console.log('Refreshing token...');
            const refreshResponse = await refreshAuthTokenApi(refreshToken);
            const newToken = refreshResponse.access_token;
            const newExpiresIn = parseInt(
              refreshResponse.expires_in || expiresIn.toString(),
            );

            // Update stored data
            await storage.set('token', String(newToken));
            await storage.set('tokenTimestamp', Date.now().toString());

            // Update user data with new expiration
            const updatedUserData = {
              ...authUserData,
              expiresIn: newExpiresIn.toString(),
            };

            await storage.set('authUserData', JSON.stringify(updatedUserData));

            console.log('Token refreshed successfully');
            setAuth(newToken, updatedUserData);
          } catch (error) {
            console.error('Failed to refresh token:', error);
            // If refresh fails, clear auth and storage to prevent retry loops
            await clearSession();
            clearAuth();
          }
        } else {
          // Token is still valid, use it
          console.log('Using stored token');
          setAuth(storedToken, authUserData);
        }
      } catch (error) {
        console.error('Auth bootstrap failed:', error);
        // Hide splash screen even on error
        try {
          await SplashScreen.hideAsync();
        } catch (splashError) {
          console.error('Failed to hide splash screen:', splashError);
        }
      } finally {
        try {
          await SplashScreen.hideAsync();
        } catch (splashError) {
          console.error('Failed to hide splash screen:', splashError);
        }
      }
    };

    bootstrap();
  }, [setAuth, clearAuth]);
};
