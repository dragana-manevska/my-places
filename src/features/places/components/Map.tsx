import React from 'react';
import { Text, View } from 'react-native';

type MapProps = {
  name: string;
};

export const Map = ({ name }: MapProps) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};
