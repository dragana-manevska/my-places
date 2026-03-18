import { Colors } from '@/src/theme/colors';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface PlaceItemProps {
  id?: string | number;
  title: string;
  imageAssetId: string;
  address: string;
  onSelect: (placeId: string) => void;
}

const PlaceItem = ({
  id,
  title,
  imageAssetId,
  address,
  onSelect,
}: PlaceItemProps) => {
  const [imageUri, setImageUri] = useState<string | undefined>();

  useEffect(() => {
    if (imageAssetId) {
      MediaLibrary.getAssetInfoAsync(imageAssetId)
        .then((info) => setImageUri(info.localUri ?? info.uri))
        .catch(() => {});
    }
  }, [imageAssetId]);

  const onSelectPlace = () => {
    if (!id) return;
    onSelect(String(id));
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelectPlace}
    >
      <Image
        source={imageUri ? { uri: imageUri } : undefined}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 8,
    backgroundColor: Colors.primary50,
    elevation: 2,
    shadowColor: Colors.gray100,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary800,
  },
  address: {
    fontSize: 12,
    color: Colors.primary500,
  },
});
