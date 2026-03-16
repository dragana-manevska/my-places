import { Colors } from '@/src/theme/colors';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  mode?: 'flat';
  style?: any;
};

function Button({ children, onPress, mode, style }: ButtonProps) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flat]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary600,
    borderRadius: 4,
    padding: 10,
    borderColor: Colors.primary200,
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.gray100,
    textAlign: 'center',
  },
  flat: {
    backgroundColor: 'transparent',
    color: Colors.gray100,
    borderWidth: 0,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});
