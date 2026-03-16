import {
  firebaseAuthClient,
  firebaseSecureTokenClient,
} from '@/src/lib/api/firebase-auth.client';

export const signUpApi = async (email: string, password: string) => {
  const response = await firebaseAuthClient.post('/accounts:signUp', {
    email,
    password,
    returnSecureToken: true,
  });

  return {
    token: response.data.idToken,
    user: response.data,
  };
};

export const signInApi = async (email: string, password: string) => {
  const response = await firebaseAuthClient.post(
    '/accounts:signInWithPassword',
    {
      email,
      password,
      returnSecureToken: true,
    },
  );

  return {
    token: response.data.idToken,
    user: response.data,
  };
};

export const refreshAuthTokenApi = async (refreshToken: string) => {
  const response = await firebaseSecureTokenClient.post('/token', {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return response.data;
};
