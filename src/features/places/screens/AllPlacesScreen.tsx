import { fetchPlaces } from '@/src/shared/utils/database';
import { useIsFocused } from 'expo-router';
import { useEffect, useState } from 'react';
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

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlacesScreen;
