import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Button from '@/src/shared/components/Button';
import Input from '@/src/shared/components/Input';
import { Colors } from '@/src/theme/colors';
import { Place } from '../types/place.model';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

type PlaceFormProps = {
  onCancel: () => void;
  onSubmit: (placeData: Omit<Place, 'id'>) => void;
  submitButtonLabel: string;
  defaultValues?: Place;
};

const PlaceForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}: PlaceFormProps) => {
  const [enteredTitle, setEnteredTitle] = React.useState(
    defaultValues ? defaultValues.title : '',
  );
  const [selectedImage, setSelectedImage] = React.useState(
    defaultValues ? defaultValues.imageUri : undefined,
  );
  const [pickedLocation, setPickedLocation] = React.useState(
    defaultValues ? defaultValues.location : undefined,
  );

  const changeTitleHandler = (inputType: string, enteredValue: string) => {
    switch (inputType) {
      case 'title':
        if (enteredValue.length > 50 || enteredValue.trim().length === 0) {
          Alert.alert(
            'Invalid title',
            'Title must be between 1 and 50 characters long.',
          );
          return;
        }
        setEnteredTitle(enteredValue);
        break;
    }
  };

  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = (location: { lat: number; lng: number }) => {
    setPickedLocation(location);
  };

  const savePlaceHandler = () => {
    if (enteredTitle.trim().length === 0) {
      Alert.alert('Missing title', 'Please enter a title before saving.');
      return;
    }

    if (!selectedImage) {
      Alert.alert('Missing image', 'Please take a picture before saving.');
      return;
    }

    if (!pickedLocation) {
      Alert.alert('Missing location', 'Please pick a location before saving.');
      return;
    }

    const placeData = {
      title: enteredTitle.trim(),
      address: '',
      location: pickedLocation,
      imageUri: selectedImage,
    };
    console.log({ placeData });

    onSubmit(placeData);
  };

  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.title}>Your Favorite Place</Text>
        <Input
          label='Title'
          onUpdateValue={(value) => changeTitleHandler('title', value)}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>{submitButtonLabel}</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.gray100,
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: Colors.error800,
    marginVertical: 8,
  },
});

export default PlaceForm;
