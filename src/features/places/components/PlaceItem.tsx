import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface PlaceItemProps {
  title: string;
  imageUri: string;
  address: string;
}

const PlaceItem = ({ title, imageUri, address }: PlaceItemProps) => {
  const onSelectPlace = () => {
    // Handle place selection
  };

  return (
    <Pressable onPress={onSelectPlace}>
      <Image
        source={{ uri: imageUri }}
        style={{ width: 100, height: 100 }}
      />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
