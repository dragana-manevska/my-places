import CombinedButton from '@/src/shared/components/CombinedButton';
import { getMapPreview } from '@/src/shared/utils/location';
import { Colors } from '@/src/theme/colors';
import { router, useLocalSearchParams } from 'expo-router';

import { useUserLocation } from '@/src/shared/hooks/useUserLocation';
import { useEffect, useMemo } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

type LocationPickerProps = {
  onPickLocation: (location: { lat: number; lng: number }) => void;
};

const LocationPicker = ({ onPickLocation }: LocationPickerProps) => {
  const { location, loading, getLocation } = useUserLocation();
  const { pickedLat, pickedLng } = useLocalSearchParams<{
    pickedLat?: string | string[];
    pickedLng?: string | string[];
  }>();

  const pickedCoordinates = useMemo(() => {
    const latValue = Array.isArray(pickedLat) ? pickedLat[0] : pickedLat;
    const lngValue = Array.isArray(pickedLng) ? pickedLng[0] : pickedLng;

    const latitude = Number(latValue);
    const longitude = Number(lngValue);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }

    return {
      latitude,
      longitude,
    };
  }, [pickedLat, pickedLng]);

  const pickOnMapHandler = () => {
    router.push('/(modals)/map');
  };

  useEffect(() => {
    if (pickedCoordinates) {
      onPickLocation({
        lat: pickedCoordinates.latitude,
        lng: pickedCoordinates.longitude,
      });
      return;
    }

    if (location) {
      onPickLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    }
  }, [location, onPickLocation, pickedCoordinates]);

  let locationPreview = <Text>No location chosen yet!</Text>;

  if (loading) {
    locationPreview = <ActivityIndicator size='large' />;
  }

  if (pickedCoordinates) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(
            pickedCoordinates.latitude,
            pickedCoordinates.longitude,
          ),
        }}
      />
    );
  } else if (location) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(
            location.coords.latitude,
            location.coords.longitude,
          ),
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.locationPreview}>{locationPreview}</View>

      <View style={styles.actions}>
        <CombinedButton
          icon='location'
          mode='primary'
          size={24}
          onPress={getLocation}
        >
          Locate User
        </CombinedButton>

        <CombinedButton
          icon='map'
          mode='primary'
          size={24}
          onPress={pickOnMapHandler}
        >
          Pick on Map
        </CombinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  locationPreview: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray100,
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
