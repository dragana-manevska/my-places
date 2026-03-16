import { Colors } from '@/src/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

const PlacesLayout = () => {
  return (
    <LinearGradient
      colors={[Colors.gradient200, Colors.gradient200, Colors.gradient250]}
      style={{ flex: 1 }}
    >
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary600,
          },
          headerTintColor: Colors.gray100,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='[placeId]'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </LinearGradient>
  );
};

export default PlacesLayout;
