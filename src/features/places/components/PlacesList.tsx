import { Colors } from '@/src/theme/colors';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Place } from '../types/place.model';
import PlaceItem from './PlaceItem';

interface PlacesListProps {
  places: Place[];
}

const renderPlaceItem = (itemData: any) => {
  return <PlaceItem {...itemData.item} />;
};

const PlacesList = ({ places }: PlacesListProps) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.fallbackText}>
          No places found. Start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      renderItem={renderPlaceItem}
      keyExtractor={(item) => item.id?.toString() ?? ''}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
