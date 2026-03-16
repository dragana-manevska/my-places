import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/src/shared/components/Button';
import { getFormattedDate } from '@/src/shared/utils/date';
import { Colors } from '@/src/theme/colors';
import { Expense } from '../types/expense.model';
import Input from './ExpenseInput';

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmit: (expenseData: Omit<Expense, 'id'>) => void;
  submitButtonLabel: string;
  defaultValues?: Expense;
};

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}: ExpenseFormProps) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  const inputChangedHandler = (
    inputIdentifier: string,
    enteredValue: string,
  ) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => ({
        amount: { value: currentInputs.amount.value, isValid: amountIsValid },
        date: { value: currentInputs.date.value, isValid: dateIsValid },
        description: {
          value: currentInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          inputConfigProps={{
            keyboardType: 'numeric',
            placeholder: 'Amount',
            placeholderTextColor: Colors.primary200,
            onChangeText: (value) => inputChangedHandler('amount', value),
            value: inputs.amount.value,
          }}
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
        />
        <Input
          label='Date'
          inputConfigProps={{
            placeholder: 'YYYY-MM-DD',
            placeholderTextColor: Colors.primary200,
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler('date', value),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
        />
      </View>
      <Input
        label='Description'
        inputConfigProps={{
          placeholder: 'Description',
          placeholderTextColor: Colors.primary200,
          multiline: true,
          onChangeText: (value) => inputChangedHandler('description', value),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values. Please check your input.
        </Text>
      )}
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode='flat'
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={submitHandler}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 24,
    textAlign: 'center',
    color: Colors.gray100,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: Colors.error800,
    marginVertical: 8,
  },
});

export default ExpenseForm;
