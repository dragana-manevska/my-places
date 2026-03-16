import IconButton from '@/src/shared/components/IconButton';
import { useUserLocation } from '@/src/shared/hooks/useUserLocation';
import { Colors } from '@/src/theme/colors';
import { LocationObjectCoords } from 'expo-location';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { useNavigation } from 'expo-router';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type MapClickEvent = {
  coordinates: {
    latitude?: number;
    longitude?: number;
  };
};

const MapScreen = () => {
  const { location, loading, getLocation } = useUserLocation();
  const navigation = useNavigation();

  const [selectedLocation, setSelectedLocation] =
    useState<LocationObjectCoords | null>(null);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const selectLocationHandler = (event: MapClickEvent) => {
    if (
      event.coordinates.latitude == null ||
      event.coordinates.longitude == null
    ) {
      return;
    }

    setSelectedLocation({
      latitude: event.coordinates.latitude,
      longitude: event.coordinates.longitude,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    });
  };

  const mapCoordinates = useMemo(() => {
    if (selectedLocation) return selectedLocation;
    return location?.coords ?? null;
  }, [selectedLocation, location]);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'Please select a location on the map before saving.',
      );
      return;
    }

    const modalNavigation = navigation as any;

    // Prefer popping to the existing add-place route to avoid stacking screens.
    if (typeof modalNavigation.popTo === 'function') {
      modalNavigation.popTo('add-place', {
        pickedLat: selectedLocation.latitude.toString(),
        pickedLng: selectedLocation.longitude.toString(),
      });
      return;
    }

    modalNavigation.navigate('add-place', {
      pickedLat: selectedLocation.latitude.toString(),
      pickedLng: selectedLocation.longitude.toString(),
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={savePickedLocationHandler}
          icon='checkmark'
          size={24}
          color={Colors.gray100}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  if (loading || !mapCoordinates) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' />
        <Text>Loading map...</Text>
      </View>
    );
  }

  const cameraPosition = {
    coordinates: mapCoordinates,
    zoom: 14,
  };

  const markers = selectedLocation ? [{ coordinates: selectedLocation }] : [];

  const MapComponent =
    Platform.OS === 'ios'
      ? AppleMaps.View
      : Platform.OS === 'android'
        ? GoogleMaps.View
        : null;

  if (!MapComponent) {
    return (
      <View style={styles.center}>
        <Text>Maps are only available on Android and iOS</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapComponent
        style={styles.container}
        cameraPosition={cameraPosition}
        markers={markers}
        onMapClick={selectLocationHandler}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
