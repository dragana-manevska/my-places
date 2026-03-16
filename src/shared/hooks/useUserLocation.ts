import {
  Accuracy,
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  hasServicesEnabledAsync,
  LocationObject,
  PermissionStatus,
  useForegroundPermissions,
} from 'expo-location';

import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

type LocationError = {
  code?: string;
};

export function useUserLocation() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [loading, setLoading] = useState(false);

  const [permissionInfo, requestPermission] = useForegroundPermissions();

  const verifyPermissions = useCallback(async () => {
    if (!permissionInfo) return false;

    if (permissionInfo.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (permissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions',
        'You need to grant location permissions to use this feature.',
      );
      return false;
    }

    return true;
  }, [permissionInfo, requestPermission]);

  const getLocation = useCallback(async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const servicesEnabled = await hasServicesEnabledAsync();

    if (!servicesEnabled) {
      Alert.alert(
        'Location services disabled',
        'Enable Location Services in Settings.',
      );
      return;
    }

    setLoading(true);

    try {
      const lastKnown = await getLastKnownPositionAsync();

      if (lastKnown) {
        setLocation(lastKnown);
      }

      const current = await getCurrentPositionAsync({
        accuracy: Accuracy.Balanced,
      });

      setLocation(current);
    } catch (error) {
      const locationError = error as LocationError;

      if (locationError?.code === 'ERR_LOCATION_UNAVAILABLE') {
        Alert.alert(
          'Location unavailable',
          'GPS position unavailable. Try again or pick on map.',
        );
        return;
      }

      console.error(error);

      Alert.alert(
        'Could not get location',
        'Try again in a few seconds or choose Pick on Map.',
      );
    } finally {
      setLoading(false);
    }
  }, [verifyPermissions]);

  return {
    location,
    loading,
    getLocation,
  };
}
