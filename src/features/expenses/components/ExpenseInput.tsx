import { Colors } from '@/src/theme/colors';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type InputProps = {
  label: string;
  style?: any;
  invalid?: boolean;
  inputConfigProps: React.ComponentProps<typeof TextInput>;
};

const Input = ({ label, style, invalid, inputConfigProps }: InputProps) => {
  const inputStyles: (typeof styles.input | typeof styles.inputMultiline)[] = [
    styles.input,
  ];

  if (inputConfigProps && inputConfigProps.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[...inputStyles, invalid && styles.invalidInput]}
        {...inputConfigProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: Colors.primary800,
  },
  input: {
    padding: 8,
    borderColor: Colors.primary100,
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: Colors.primary50,
    color: Colors.primary800,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: Colors.error800,
  },
  invalidInput: {
    backgroundColor: Colors.error100,
    color: Colors.error800,
  },
});

export default Input;
