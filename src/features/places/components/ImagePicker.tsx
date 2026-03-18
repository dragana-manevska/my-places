import CombinedButton from '@/src/shared/components/CombinedButton';
import { Colors } from '@/src/theme/colors';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';

type ImagePickerProps = {
  onTakeImage: (assetId: string) => void;
};

const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const [previewUri, setPreviewUri] = useState<string | undefined>();
  const [viewerVisible, setViewerVisible] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const cameraRef = useRef<CameraView>(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const verifyPermissions = async () => {
    if (!cameraPermission) return false;

    if (!cameraPermission.granted) {
      const response = await requestCameraPermission();
      if (!response.granted) return false;
    }

    if (!mediaPermission?.granted) {
      const response = await requestMediaPermission();
      if (!response.granted) {
        Alert.alert(
          'Photo library access required',
          'Please grant access so the image can be saved.',
        );
        return false;
      }
    }

    return true;
  };

  const openCamera = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    setShowCamera(true);
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    const fixedImage = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ rotate: 0 }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
    );

    const asset = await MediaLibrary.createAssetAsync(fixedImage.uri);

    setPreviewUri(fixedImage.uri);
    onTakeImage(asset.id);

    setShowCamera(false);
  };

  if (showCamera) {
    return (
      <View style={styles.container}>
        <View style={styles.imagePreview}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.cameraOverlay}>
            <TouchableOpacity
              onPress={takePhoto}
              style={styles.captureBtn}
            />
            <TouchableOpacity
              onPress={() => setShowCamera(false)}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CombinedButton
          icon='camera'
          mode='primary'
          size={24}
          onPress={openCamera}
        >
          Take a picture
        </CombinedButton>
      </View>
    );
  }

  let imagePreview = <Text style={styles.title}>No image taken yet.</Text>;

  if (previewUri) {
    imagePreview = (
      <Pressable
        onPress={() => setViewerVisible(true)}
        style={{ width: '100%', height: '100%' }}
      >
        <Image
          style={styles.image}
          source={{ uri: previewUri }}
          resizeMode='contain'
        />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <CombinedButton
        icon='camera'
        mode='primary'
        size={24}
        onPress={openCamera}
      >
        Take a picture
      </CombinedButton>

      <ImageViewing
        images={[{ uri: previewUri }]}
        imageIndex={0}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
        presentationStyle='fullScreen'
      />
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

  cameraOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
    gap: 16,
  },
  captureBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  cancelBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
