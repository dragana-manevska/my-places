import { useLogout } from '@/src/features/auth/hooks/useLogout';
import { HapticTab } from '@/src/shared/components/haptic-tab';
import { IconSymbol } from '@/src/shared/components/icon-symbol';
import IconButton from '@/src/shared/components/IconButton';
import { Colors } from '@/src/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, router, usePathname } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const { logout } = useLogout();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  const handlePressRight = () => {
    if (pathname === '/recent-expenses' || pathname === '/all-expenses') {
      router.push('/(modals)/manage-expenses');
    } else if (pathname === '/all-places') {
      router.push('/(modals)/add-place');
    }
  };

  return (
    <LinearGradient
      colors={[Colors.gradient200, Colors.gradient200, Colors.gradient250]}
      style={{ flex: 1 }}
    >
      <Tabs
        screenOptions={(navigation) => ({
          headerStyle: {
            backgroundColor: Colors.primary600,
          },
          headerTintColor: Colors.gray100,
          tabBarStyle: {
            backgroundColor: Colors.primary600,
            paddingTop: 8,
          },
          tabBarInactiveTintColor: Colors.primary100,
          tabBarActiveTintColor: Colors.gray100,
          tabBarButton: HapticTab,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='plus'
              size={24}
              color={tintColor ?? Colors.gray100}
              onPress={handlePressRight}
            />
          ),
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon='rectangle.portrait.and.arrow.right'
              size={24}
              color={tintColor ?? Colors.gray100}
              onPress={handleLogout}
            />
          ),
        })}
      >
        <Tabs.Screen
          name='recent-expenses'
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name='hourglass'
                color={color}
              />
            ),
            sceneStyle: { backgroundColor: 'transparent' },
          }}
        />

        <Tabs.Screen
          name='all-expenses'
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name='calendar'
                color={color}
              />
            ),
            sceneStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Tabs.Screen
          name='all-places'
          options={{
            title: 'Your Favorite Places',
            tabBarLabel: 'Favorite Places',
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name='map'
                color={color}
              />
            ),
            sceneStyle: { backgroundColor: 'transparent' },
          }}
        />
      </Tabs>
    </LinearGradient>
  );
}
