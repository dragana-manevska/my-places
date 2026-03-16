import { Pressable, StyleSheet, View } from 'react-native';
import { IconSymbol } from './icon-symbol';

type IconButtonProps = {
  icon: React.ComponentProps<typeof IconSymbol>['name'];
  size: number;
  color: string;
  onPress?: () => void;
};

function IconButton({ icon, size, color, onPress }: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.container}>
        <IconSymbol
          name={icon}
          size={size}
          color={color}
        />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
