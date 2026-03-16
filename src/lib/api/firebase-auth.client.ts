import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY as string;

export const firebaseAuthClient = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  params: { key: API_KEY },
});

export const firebaseSecureTokenClient = axios.create({
  baseURL: 'https://securetoken.googleapis.com/v1',
  params: { key: API_KEY },
});
