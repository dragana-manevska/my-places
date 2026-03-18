import { Colors } from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { Pressable } from 'react-native';

export default function ModalsLayout() {
  return (
    <LinearGradient
      colors={[Colors.gradient200, Colors.gradient200, Colors.gradient250]}
      style={{ flex: 1 }}
    >
      <Stack
        screenOptions={{
          presentation: 'modal',
          headerStyle: {
            backgroundColor: Colors.primary600,
          },
          headerTintColor: Colors.gray100,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen
          name='manage-expenses'
          options={{
            title: 'Manage Expense',
          }}
        />

        <Stack.Screen
          name='add-place'
          options={{
            title: 'Add a New Place',
            headerRight: () => (
              <Pressable
                onPress={() => router.back()}
                hitSlop={8}
              >
                <Ionicons
                  name='close'
                  size={24}
                  color={Colors.gray100}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name='map'
          options={{
            headerShown: true,
            title: 'Map',
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                hitSlop={8}
              >
                <Ionicons
                  name='chevron-back'
                  size={24}
                  color={Colors.gray100}
                />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </LinearGradient>
  );
}
