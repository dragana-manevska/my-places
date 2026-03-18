import { deleteAllPlaces, fetchPlaces } from '@/src/shared/utils/database';
import { Colors } from '@/src/theme/colors';
import { useIsFocused } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import PlacesList from '../components/PlacesList';
import { Place } from '../types/place.model';

const AllPlacesScreen = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Places',
      'Are you sure you want to delete all places? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            await deleteAllPlaces();
            setLoadedPlaces([]);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <PlacesList places={loadedPlaces} />
      {loadedPlaces.length > 0 && (
        <Pressable
          style={styles.clearButton}
          onPress={handleClearAll}
        >
          <Text style={styles.clearButtonText}>Clear All Places</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clearButton: {
    backgroundColor: Colors.error500,
    margin: 24,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AllPlacesScreen;
