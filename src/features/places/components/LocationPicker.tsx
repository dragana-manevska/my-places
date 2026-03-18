import CombinedButton from '@/src/shared/components/CombinedButton';
import { getAddress, getMapPreview } from '@/src/shared/utils/location';
import { Colors } from '@/src/theme/colors';
import { router, useLocalSearchParams } from 'expo-router';

import { useUserLocation } from '@/src/shared/hooks/useUserLocation';
import { useEffect, useMemo } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

type LocationPickerProps = {
  onPickLocation: (location: {
    lat: number;
    lng: number;
    address?: string;
  }) => void;
};

const LocationPicker = ({ onPickLocation }: LocationPickerProps) => {
  const { location, loading, getLocation } = useUserLocation();

  const params = useLocalSearchParams<{
    pickedLat?: string | string[];
    pickedLng?: string | string[];
  }>();

  const pickedCoordinates = useMemo(() => {
    const lat = Array.isArray(params.pickedLat)
      ? params.pickedLat[0]
      : params.pickedLat;

    const lng = Array.isArray(params.pickedLng)
      ? params.pickedLng[0]
      : params.pickedLng;

    const latitude = Number(lat);
    const longitude = Number(lng);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }

    return { latitude, longitude };
  }, [params.pickedLat, params.pickedLng]);

  const previewCoords = useMemo(() => {
    if (pickedCoordinates) return pickedCoordinates;

    if (location) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }

    return null;
  }, [pickedCoordinates, location]);

  const locateUserHandler = () => {
    router.setParams({
      pickedLat: undefined,
      pickedLng: undefined,
    });

    getLocation();
  };

  useEffect(() => {
    const sendPickedLocation = async () => {
      if (!previewCoords) return;

      if (pickedCoordinates) {
        const address = await getAddress(
          previewCoords.latitude,
          previewCoords.longitude,
        );

        onPickLocation({
          lat: previewCoords.latitude,
          lng: previewCoords.longitude,
          address,
        });
      } else {
        onPickLocation({
          lat: previewCoords.latitude,
          lng: previewCoords.longitude,
        });
      }
    };

    sendPickedLocation();
  }, [previewCoords, pickedCoordinates, onPickLocation]);

  const pickOnMapHandler = () => {
    router.push('/(modals)/map');
  };

  const renderPreview = () => {
    if (loading) {
      return <ActivityIndicator size='large' />;
    }

    if (!previewCoords) {
      return <Text style={styles.fallbackText}>No location chosen yet!</Text>;
    }

    return (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(previewCoords.latitude, previewCoords.longitude),
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationPreview}>{renderPreview()}</View>

      <View style={styles.actions}>
        <CombinedButton
          icon='location'
          mode='primary'
          size={24}
          onPress={locateUserHandler}
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
  fallbackText: {
    color: Colors.gray100,
  },
});
