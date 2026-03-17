import CombinedButton from '@/src/shared/components/CombinedButton';
import { Colors } from '@/src/theme/colors';
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

type ImagePickerProps = {
  onTakeImage: (assetId: string) => void;
};

const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const [previewUri, setPreviewUri] = useState<string | undefined>();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const verifyPermissions = async () => {
    if (!cameraPermission) {
      return false;
    }

    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const response = await requestCameraPermission();
      if (!response.granted) return false;
    } else if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }],
      );
      return false;
    }

    if (!mediaPermission?.granted) {
      const response = await requestMediaPermission();
      if (!response.granted) {
        Alert.alert(
          'Photo library access required',
          'Please grant photo library access so the image can be saved.',
          [{ text: 'Okay' }],
        );
        return false;
      }
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (image?.assets?.[0]) {
      const tempUri = image.assets[0].uri;
      const asset = await MediaLibrary.createAssetAsync(tempUri);
      setPreviewUri(tempUri);
      onTakeImage(asset.id);
    }
  };

  let imagePreview = <Text style={styles.title}>No image taken yet.</Text>;

  if (previewUri) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: previewUri }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <CombinedButton
        icon='camera'
        mode='primary'
        size={24}
        onPress={takeImageHandler}
      >
        Take a picture
      </CombinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 8,
  },
  title: {
    textAlign: 'center',
    color: Colors.gray100,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray100,
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
