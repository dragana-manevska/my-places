import CombinedButton from '@/src/shared/components/CombinedButton';
import { Colors } from '@/src/theme/colors';
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

type ImagePickerProps = {
  onTakeImage: (imageUri: string) => void;
};

const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (!cameraPermissionInformation) {
      return false;
    }

    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }],
      );
      return false;
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

    if (image && image.assets && image.assets.length > 0) {
      setImageUri(image.assets[0].uri);
      onTakeImage(image.assets[0].uri);
    }
  };

  let imagePreview = <Text style={styles.title}>No image taken yet.</Text>;

  if (imageUri) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: imageUri }}
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
