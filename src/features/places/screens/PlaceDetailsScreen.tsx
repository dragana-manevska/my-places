import IconButton from '@/src/shared/components/IconButton';
import { deletePlace, fetchPlaceById } from '@/src/shared/utils/database';
import { Colors } from '@/src/theme/colors';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Place } from '../types/place.model';

const PlaceDetailsScreen = () => {
  const navigation = useNavigation();
  const parentNavigation = navigation.getParent();
  const { placeId } = useLocalSearchParams<{ placeId: string }>();

  const [place, setPlace] = useState<Place | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadImage() {
      if (!place?.imageAssetId) return;

      try {
        const info = await MediaLibrary.getAssetInfoAsync(place.imageAssetId);

        if (isMounted) {
          setImageUri(info.localUri ?? info.uri ?? null);
        }
      } catch (e) {
        console.error('Failed to load image:', e);
      }
    }

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [place?.imageAssetId]);

  useLayoutEffect(() => {
    if (!placeId) return;

    let isMounted = true;

    async function loadPlace() {
      try {
        const data = await fetchPlaceById(placeId);

        if (data && isMounted) {
          setPlace(data);
          parentNavigation?.setOptions({
            title: data.title,
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPlace();

    return () => {
      isMounted = false;
      parentNavigation?.setOptions({
        title: 'Your Favorite Places',
      });
    };
  }, [placeId]);

  const showOnMapHandler = () => {
    if (!place) return;

    router.push({
      pathname: '/(modals)/map',
      params: {
        lat: place.location.lat.toString(),
        lng: place.location.lng.toString(),
        readonly: 'true',
      },
    });
  };

  const deletePlaceHandler = () => {
    if (!placeId) return;

    Alert.alert('Delete Place', 'Are you sure you want to delete this place?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deletePlace(placeId);
          router.back();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.address}>Loading...</Text>
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.center}>
        <Text style={styles.address}>Place not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {/* Image */}
      <View style={styles.imageWrapper}>
        {imageUri ? (
          <Image
            style={styles.image}
            source={{ uri: imageUri }}
            transition={200}
          />
        ) : (
          <Text style={styles.address}>No image available</Text>
        )}
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <View style={styles.actions}>
            <IconButton
              icon='map'
              size={24}
              color={Colors.primary50}
              onPress={showOnMapHandler}
            />
            <Text style={styles.buttonText}>View on Map</Text>
          </View>

          <View style={[styles.actions, styles.deleteAction]}>
            <IconButton
              icon='trash'
              size={24}
              color={Colors.error500}
              onPress={deletePlaceHandler}
            />
            <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWrapper: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  locationContainer: {
    alignItems: 'center',
  },

  addressContainer: {
    padding: 20,
  },

  address: {
    color: Colors.primary50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },

  actions: {
    alignItems: 'center',
    borderColor: Colors.primary100,
    borderWidth: 1,
    borderRadius: 6,
    padding: 16,
  },

  deleteAction: {
    borderColor: Colors.error500,
  },

  buttonText: {
    color: Colors.primary50,
    fontSize: 14,
  },

  deleteText: {
    color: Colors.error500,
  },
});
