import { Colors } from '@/src/theme/colors';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type LoaderProps = {
  message?: string;
};

const Loader = ({ message }: LoaderProps) => {
  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <ActivityIndicator
        size='large'
        color={Colors.primary200}
      />
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
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.gray100,
  },
});

export default Loader;
