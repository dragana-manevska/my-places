import { Colors } from '@/src/theme/colors';
import { StyleSheet, Text, View } from 'react-native';

type ErrorOverlayProps = { message: string };

const ErrorOverlay = ({ message }: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error occurred!</Text>
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.primary500,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.primary100,
  },
});

export default ErrorOverlay;
