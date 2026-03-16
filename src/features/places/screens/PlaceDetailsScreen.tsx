import { StyleSheet, Text, View } from 'react-native';

const PlaceDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Place Details Screen</Text>
    </View>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
