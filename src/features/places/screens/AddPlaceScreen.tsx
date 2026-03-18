import { insertPlace } from '@/src/shared/utils/database';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import PlaceForm from '../components/PlaceForm';
import { Place } from '../types/place.model';

const AddPlaceScreen = () => {
  const createPlaceHandler = async (place: Place): Promise<void> => {
    await insertPlace(place);
    router.dismiss();
  };

  return (
    <PlaceForm
      onSubmit={createPlaceHandler}
      submitButtonLabel='Add Place'
    />
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
