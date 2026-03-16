import { storage } from '@/src/lib/storage';
import { refreshAuthTokenApi } from '../api/auth.api';

export const persistSession = async (authData: any) => {
  await storage.set('token', authData.idToken);
  await storage.set('authUserData', JSON.stringify(authData));
  await storage.set('tokenTimestamp', Date.now().toString());
};

export const clearSession = async () => {
  await storage.remove('token');
  await storage.remove('authUserData');
  await storage.remove('tokenTimestamp');
};

export const refreshSession = async () => {
  const authUserDataStr = await storage.get('authUserData');
  if (!authUserDataStr) throw new Error('No session');

  const authUserData = JSON.parse(authUserDataStr);

  const refreshResponse = await refreshAuthTokenApi(authUserData.refreshToken);

  const newToken = refreshResponse.access_token;

  const updatedUser = {
    ...authUserData,
    expiresIn: refreshResponse.expires_in,
  };

  await storage.set('token', newToken);
  await storage.set('authUserData', JSON.stringify(updatedUser));
  await storage.set('tokenTimestamp', Date.now().toString());

  return newToken;
};
