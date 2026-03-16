import Button from '@/src/shared/components/Button';
import { Colors } from '@/src/theme/colors';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AuthForm from './AuthForm';

type AuthContentProps = {
  onAuthenticate: (email: string, password: string) => void;
  isLogin?: boolean;
};

const AuthContent = ({ onAuthenticate, isLogin }: AuthContentProps) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
  });

  const switchAuthModeHandler = () => {
    if (isLogin) {
      router.replace('/(auth)/register');
    } else {
      router.replace('/(auth)/login');
    }
  };

  const submitHandler = (credentials: {
    email: string;
    confirmEmail?: string;
    password: string;
    confirmPassword?: string;
  }) => {
    let { email, confirmEmail, password, confirmPassword } = credentials;
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    onAuthenticate(email, password);
  };

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        credentialsInvalid={credentialsInvalid}
        onSubmit={submitHandler}
      />
      <View style={styles.buttons}>
        <Button
          mode='flat'
          onPress={switchAuthModeHandler}
        >
          <Text style={styles.buttonText}>
            {isLogin ? 'Create a new user' : 'Log in instead'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  buttonText: {
    color: Colors.gray100,
  },
});
