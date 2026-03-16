import Loader from '@/src/shared/components/Loader';
import { Alert } from 'react-native';
import AuthContent from '../components/AuthContent';
import { useLogin } from '../hooks/useLogin';

const LoginScreen = () => {
  const { isLoading, login } = useLogin();

  const handleSignIn = async (email: string, password: string) => {
    login(email, password).catch((error: any) => {
      Alert.alert(
        'Sign In Failed',
        error.message ||
          'An error occurred while signing in. Please try again.',
        [{ text: 'OK' }],
      );
    });
  };

  if (isLoading) {
    return <Loader message='Signing in...' />;
  }

  return (
    <AuthContent
      onAuthenticate={handleSignIn}
      isLogin
    />
  );
};

export default LoginScreen;
