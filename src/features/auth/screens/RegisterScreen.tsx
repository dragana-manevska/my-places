import AuthContent from '@/src/features/auth/components/AuthContent';
import Loader from '@/src/shared/components/Loader';
import { Alert } from 'react-native';
import { useRegister } from '../hooks/useRegister';

const RegisterScreen = () => {
  const { register, isLoading } = useRegister();

  const handleSignUp = async (email: string, password: string) => {
    try {
      await register(email, password);
    } catch (error: any) {
      Alert.alert(
        'Sign Up Failed',
        error.message ||
          'An error occurred while creating your account. Please try again.',
        [{ text: 'OK' }],
      );
    }
  };

  if (isLoading) {
    return <Loader message='Creating user...' />;
  }

  return (
    <AuthContent
      onAuthenticate={handleSignUp}
      isLogin={false}
    />
  );
};

export default RegisterScreen;
