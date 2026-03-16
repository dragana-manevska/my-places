import { useAuthContext } from '@/src/features/auth/store/auth.store';
import { Colors } from '@/src/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, Stack } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Redirect href='/(tabs)/recent-expenses' />;
  }

  return (
    <LinearGradient
      colors={[Colors.gradient100, Colors.gradient200, Colors.gradient300]}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require('@/assets/images/icon.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.image}
      >
        <Stack
          screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}
        >
          <Stack.Screen
            name='login'
            options={{
              title: 'Sign In',
            }}
          />
          <Stack.Screen
            name='register'
            options={{ title: 'Create Account' }}
          />
        </Stack>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  image: {
    opacity: 0.15,
  },
});
