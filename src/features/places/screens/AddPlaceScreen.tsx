import { StyleSheet } from 'react-native';
import PlaceForm from '../components/PlaceForm';

const AddPlaceScreen = () => {
  return (
    <PlaceForm
      onCancel={() => {}}
      onSubmit={(placeData) => {}}
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
