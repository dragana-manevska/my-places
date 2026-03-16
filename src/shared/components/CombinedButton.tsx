import { Colors } from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

type CombinedButtonProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  size: number;
  mode?: 'flat' | 'primary';
  children: React.ReactNode;
  onPress: () => void;
};

function CombinedButton({
  icon,
  size,
  mode = 'flat',
  children,
  onPress,
}: CombinedButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        mode === 'flat' && styles.flat,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons
        name={icon}
        size={size}
        color={Colors.gray100}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default CombinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary600,
    backgroundColor: Colors.primary600,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.gray100,
  },
  flat: {
    backgroundColor: 'transparent',
    color: Colors.gray100,
    borderWidth: 0,
  },
});
